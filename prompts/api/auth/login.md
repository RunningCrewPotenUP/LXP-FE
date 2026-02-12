# 로그인 API (Login)

- 참고 Swagger: http://localhost:8080/swagger-ui/index.html#/Auth/login
- 엔드포인트: `POST /auth/login`
- 요청 본문: `email`, `password`
- 성공 응답: `200` (Set-Cookie 헤더에 JWT 토큰 포함)
- 실패 응답: `400`(유효성 검증 실패), `401`(인증 실패)

## 구현 방식

쿠키(`Set-Cookie`)를 브라우저에 확실히 반영하기 위해 로그인은 Route Handler 프록시 방식으로 구현한다.

- 클라이언트: 폼 상태 관리 + 제출 이벤트 처리
- Route Handler: 백엔드 `/auth/login` 호출 후 `set-cookie` 헤더를 브라우저 응답에 전달
- 성공 시 이동 경로: `/main`
- 요청 옵션: `credentials: "include"`, `cache: "no-store"`

## Step 1) Route Handler 추가

대상 파일:

- `src/app/api/auth/login/route.ts`

구성 요소:

- `API_BASE_URL` 해석:
  - 우선 `process.env.API_BASE_URL`
  - 없으면 `process.env.NEXT_PUBLIC_API_BASE_URL`
- `buildLoginUrl()`:
  - base URL 끝의 `/` 제거 후 `/auth/login` 결합
- `POST(request)`:
  - URL 없으면 `500` + 오류 메시지 반환
  - 요청 body를 백엔드로 전달
  - 백엔드 응답 status/body/content-type 전달
  - 백엔드 `set-cookie` 헤더를 클라이언트 응답에 복사

## Step 2) 로그인 페이지 폼 연결

대상 파일:

- `src/app/(auth)/login/page.tsx`

적용 내용:

- `useState`로 `email`, `password`, `isSubmitting`, `submitError` 관리
- `InputField`에 `name`, `value`, `onChange` 연결
- `<form onSubmit={handleSubmit}>` 구성
- `handleSubmit`에서 `fetch("/api/auth/login")` 호출
- 성공 시 `router.push(APP_ROUTES.MAIN)`
- 실패 시 `submitError` 표시
- 중복 제출 방지(`isSubmitting` 체크)

## Step 3) 버튼 동작 정리

대상 파일:

- `src/app/(auth)/login/page.tsx`
- `src/shared/constants/routes.ts`

규칙:

- 로그인 버튼: `type="submit"`
- 이전/회원가입 버튼: `type="button"`
- 회원가입 버튼 클릭 시 `APP_ROUTES.REGISTER` 이동

## 검증 체크리스트

- 린트: `npm run lint`
- 정상 계정:
  - 로그인 성공
  - 쿠키 설정
  - `/main` 이동
- 비정상 계정:
  - `400`/`401` 메시지 출력
  - 페이지 이동 없음
- 네트워크 탭:
  - 요청에 `credentials: include` 적용 확인
