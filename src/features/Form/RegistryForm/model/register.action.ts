"use server";

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
  role: string;
  level: string;
  tagIds: number[];
};

export type RegisterResult = {
  ok: boolean;
  message: string;
};

const API_BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

const buildRegisterUrl = () => {
  if (!API_BASE_URL) {
    return null;
  }

  const normalizedBaseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  return `${normalizedBaseUrl}/auth/register`;
};

const getErrorMessage = async (response: Response) => {
  const rawText = await response.text();

  if (!rawText) {
    return "회원가입에 실패했습니다.";
  }

  try {
    const data = JSON.parse(rawText);
    if (data?.message && typeof data.message === "string") {
      return data.message;
    }
  } catch {
    return rawText;
  }

  return "회원가입에 실패했습니다.";
};

export async function registerAction(
  payload: RegisterPayload,
): Promise<RegisterResult> {
  const registerUrl = buildRegisterUrl();

  if (!registerUrl) {
    return {
      ok: false,
      message: "API 주소가 설정되지 않았습니다. 환경변수를 확인해주세요.",
    };
  }

  const response = await fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      ok: false,
      message: await getErrorMessage(response),
    };
  }

  return {
    ok: true,
    message: "회원가입이 완료되었습니다.",
  };
}
