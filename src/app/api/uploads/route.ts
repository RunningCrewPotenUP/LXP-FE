import { createHash, createHmac } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_BASE_URL = process.env.R2_PUBLIC_BASE_URL;
const R2_PRESIGNED_EXPIRES_SECONDS = Number(
  process.env.R2_PRESIGNED_EXPIRES_SECONDS ?? "900",
);

type UploadResource = "video" | "image";

const normalizeBaseUrl = (value: string) =>
  value.endsWith("/") ? value.slice(0, -1) : value;

const encodeRfc3986 = (value: string) =>
  encodeURIComponent(value).replace(
    /[!'()*]/g,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );

const encodePath = (value: string) =>
  value
    .split("/")
    .map((segment) => encodeRfc3986(segment))
    .join("/");

const sha256Hex = (value: string) =>
  createHash("sha256").update(value, "utf8").digest("hex");

const hmac = (key: Buffer | string, value: string) =>
  createHmac("sha256", key).update(value, "utf8").digest();

const hmacHex = (key: Buffer | string, value: string) =>
  createHmac("sha256", key).update(value, "utf8").digest("hex");

const getNowStrings = () => {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hour = String(date.getUTCHours()).padStart(2, "0");
  const minute = String(date.getUTCMinutes()).padStart(2, "0");
  const second = String(date.getUTCSeconds()).padStart(2, "0");

  const dateStamp = `${year}${month}${day}`;
  const amzDate = `${dateStamp}T${hour}${minute}${second}Z`;

  return { dateStamp, amzDate };
};

const isMissingRequiredEnvs = () =>
  !R2_ACCOUNT_ID ||
  !R2_ACCESS_KEY_ID ||
  !R2_SECRET_ACCESS_KEY ||
  !R2_BUCKET_NAME;

const sanitizeFileName = (fileName: string) => {
  const baseName = fileName.trim();
  const safeName =
    baseName.length > 0
      ? baseName.replace(/[^a-zA-Z0-9._-]/g, "-")
      : "upload.bin";

  return safeName.slice(0, 120);
};

const validateContentType = (resource: UploadResource, contentType: string) => {
  if (resource === "image") {
    return contentType.startsWith("image/");
  }

  return contentType.startsWith("video/");
};

const buildUploadTarget = (fileName: string, resource: UploadResource) => {
  const { dateStamp, amzDate } = getNowStrings();
  const credentialScope = `${dateStamp}/auto/s3/aws4_request`;
  const host = `${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

  const extensionIndex = fileName.lastIndexOf(".");
  const extension = extensionIndex >= 0 ? fileName.slice(extensionIndex) : "";
  const baseName = extensionIndex >= 0 ? fileName.slice(0, extensionIndex) : fileName;
  const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const key = `courses/${resource}s/${baseName}-${uniqueSuffix}${extension}`;
  const canonicalUri = `/${encodePath(R2_BUCKET_NAME as string)}/${encodePath(key)}`;

  const queryParams: Record<string, string> = {
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": `${R2_ACCESS_KEY_ID}/${credentialScope}`,
    "X-Amz-Date": amzDate,
    "X-Amz-Expires": String(
      Math.min(3600, Math.max(60, R2_PRESIGNED_EXPIRES_SECONDS)),
    ),
    "X-Amz-SignedHeaders": "host",
  };

  const canonicalQuery = Object.keys(queryParams)
    .sort()
    .map(
      (queryKey) =>
        `${encodeRfc3986(queryKey)}=${encodeRfc3986(queryParams[queryKey])}`,
    )
    .join("&");

  const canonicalRequest = [
    "PUT",
    canonicalUri,
    canonicalQuery,
    `host:${host}\n`,
    "host",
    "UNSIGNED-PAYLOAD",
  ].join("\n");

  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join("\n");

  const kDate = hmac(`AWS4${R2_SECRET_ACCESS_KEY}`, dateStamp);
  const kRegion = hmac(kDate, "auto");
  const kService = hmac(kRegion, "s3");
  const kSigning = hmac(kService, "aws4_request");
  const signature = hmacHex(kSigning, stringToSign);

  const uploadUrl = `https://${host}${canonicalUri}?${canonicalQuery}&X-Amz-Signature=${signature}`;

  const fileUrl = R2_PUBLIC_BASE_URL
    ? `${normalizeBaseUrl(R2_PUBLIC_BASE_URL)}/${encodePath(key)}`
    : `https://${host}/${encodePath(R2_BUCKET_NAME as string)}/${encodePath(key)}`;

  return {
    key,
    uploadUrl,
    fileUrl,
  };
};

const extractXmlTag = (xml: string, tagName: string) => {
  const expression = new RegExp(`<${tagName}>([^<]+)</${tagName}>`);
  const matched = xml.match(expression);
  return matched?.[1]?.trim() || "";
};

const buildUploadFailureHint = (status: number, code: string) => {
  if (status === 403 && code === "AccessDenied") {
    return "R2 Access Key 권한(Object Write) 또는 버킷 접근 권한을 확인해주세요.";
  }

  if (status === 403 && code === "SignatureDoesNotMatch") {
    return "R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY / R2_BUCKET_NAME 조합이 올바른지 확인해주세요.";
  }

  if (status === 404 && code === "NoSuchBucket") {
    return "R2_BUCKET_NAME 값을 확인해주세요.";
  }

  return "R2 설정값과 권한을 확인해주세요.";
};

export async function POST(request: Request) {
  if (isMissingRequiredEnvs()) {
    return NextResponse.json(
      {
        error: {
          message:
            "R2 환경변수가 설정되지 않았습니다. R2_ACCOUNT_ID/R2_ACCESS_KEY_ID/R2_SECRET_ACCESS_KEY/R2_BUCKET_NAME 값을 확인해주세요.",
        },
      },
      { status: 500 },
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "멀티파트 폼 데이터를 읽을 수 없습니다.",
        },
      },
      { status: 400 },
    );
  }

  const resourceValue = formData.get("resource");
  const resource: UploadResource =
    resourceValue === "image" || resourceValue === "video"
      ? resourceValue
      : "video";

  const fileCandidate = formData.get("file");

  if (!(fileCandidate instanceof File)) {
    return NextResponse.json(
      {
        error: {
          message: "업로드할 파일이 필요합니다.",
        },
      },
      { status: 400 },
    );
  }

  const fileName = sanitizeFileName(fileCandidate.name ?? "upload.bin");
  const contentType = (fileCandidate.type || "application/octet-stream").toLowerCase();

  if (!validateContentType(resource, contentType)) {
    return NextResponse.json(
      {
        error: {
          message:
            resource === "image"
              ? "이미지 파일만 업로드할 수 있습니다."
              : "동영상 파일만 업로드할 수 있습니다.",
        },
      },
      { status: 400 },
    );
  }

  const uploadTarget = buildUploadTarget(fileName, resource);
  const fileBuffer = Buffer.from(await fileCandidate.arrayBuffer());

  const uploadResponse = await fetch(uploadTarget.uploadUrl, {
    method: "PUT",
    body: fileBuffer,
    cache: "no-store",
  });

  if (!uploadResponse.ok) {
    const rawError = await uploadResponse.text();

    const safeDetail = rawError ? rawError.slice(0, 1000) : undefined;
    const r2ErrorCode = rawError ? extractXmlTag(rawError, "Code") : "";
    const r2ErrorMessage = rawError ? extractXmlTag(rawError, "Message") : "";
    const hint = buildUploadFailureHint(uploadResponse.status, r2ErrorCode);

    return NextResponse.json(
      {
        error: {
          message: `R2 업로드에 실패했습니다. (status: ${uploadResponse.status})`,
          code: r2ErrorCode || undefined,
          upstreamMessage: r2ErrorMessage || undefined,
          hint,
          detail: safeDetail,
        },
      },
      { status: uploadResponse.status },
    );
  }

  return NextResponse.json({
    data: {
      key: uploadTarget.key,
      fileUrl: uploadTarget.fileUrl,
    },
    error: null,
  });
}
