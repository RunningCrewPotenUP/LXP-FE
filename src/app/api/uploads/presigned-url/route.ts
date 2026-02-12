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

type PresignedRequestBody = {
  fileName?: string;
  contentType?: string;
  resource?: UploadResource;
};

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

  let body: PresignedRequestBody;

  try {
    body = (await request.json()) as PresignedRequestBody;
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "요청 본문(JSON) 형식이 올바르지 않습니다.",
        },
      },
      { status: 400 },
    );
  }

  const fileName = sanitizeFileName(body.fileName ?? "");
  const contentType = (body.contentType ?? "application/octet-stream").toLowerCase();
  const resource = body.resource ?? "video";

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

  return NextResponse.json({
    data: {
      key,
      uploadUrl,
      fileUrl,
    },
    error: null,
  });
}
