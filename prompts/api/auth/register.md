# 회원가입 API (Register)

- 참고 Swagger: `http://localhost:8080/swagger-ui/index.html#/Auth/register`
- 회원가입은 2단계로 진행한다.
  1.  계정 정보 입력
  2.  태그 정보 입력

## 1) 계정 정보 단계

- `email`: 아이디로 사용 (이메일 형식)
- `password`: 아래 규칙을 모두 만족해야 함
  - 최소 8자 이상
  - 대문자 1개 이상
  - 소문자 1개 이상
  - 숫자 1개 이상
  - 특수문자 1개 이상
- `name`: 이름
- `role`: 역할
- `level`: 레벨

비밀번호 정규식 예시:

```ts
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
```

## 2) 태그 정보 단계

- `tagIds`: 선택한 태그 ID 배열 (`number[]`)

## 요청 스키마

```json
{
  "email": "user@example.com",
  "password": "P@ssword1",
  "name": "홍길동",
  "role": "CREW",
  "level": "BEGINNER",
  "tagIds": [1, 2, 3]
}
```

## Server Action 예시 (Next.js)

```ts
"use server";

type RegisterPayload = {
  email: string;
  password: string;
  name: string;
  role: string;
  level: string;
  tagIds: number[];
};

type RegisterResult = {
  ok: boolean;
  message: string;
};

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export async function registerAction(
  payload: RegisterPayload,
): Promise<RegisterResult> {
  if (!payload.email || !payload.password || !payload.name) {
    return { ok: false, message: "필수값이 누락되었습니다." };
  }

  if (!PASSWORD_REGEX.test(payload.password)) {
    return {
      ok: false,
      message:
        "비밀번호는 8자 이상, 대/소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    return { ok: false, message: errorText || "회원가입에 실패했습니다." };
  }

  return { ok: true, message: "회원가입이 완료되었습니다." };
}
```

## 클라이언트 단계별 제출 규칙

- Step 1에서 계정 정보 유효성 검증을 통과하면 Step 2로 이동
- Step 2에서 태그 선택 후 `registerAction` 호출
- 성공 시 로그인 페이지로 이동 (`/login`)
