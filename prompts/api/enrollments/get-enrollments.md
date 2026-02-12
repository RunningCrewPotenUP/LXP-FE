# GET /enrollments 연동 플랜

## 목표

- Swagger 기준 `GET /enrollments`(내 수강 목록 조회)를 프론트 BFF에 추가한다.
- `/me` 페이지의 `참여 중인 크루` 영역이 실제 API 데이터로 렌더링되도록 한다.
- 에러/빈 상태를 사용자에게 명확히 보여준다.

## 범위

1. `src/app/api/enrollments/route.ts`
   - 기존 `POST /api/enrollments` 유지
   - `GET /api/enrollments` 추가
   - 인증 쿠키를 업스트림으로 전달
   - `cache: "no-store"` 적용
   - 응답 형태를 `{ data, error }`로 통일
2. `src/app/(web)/me/page.tsx`
   - 하드코딩된 `EnrollmentCard` 목록 제거
   - 서버 컴포넌트에서 `/api/enrollments` 호출
   - API 응답을 `EnrollmentCard` props(`thumbnail`, `title`, `progress`)로 매핑
   - 에러/빈 상태 UI 추가
3. API 문서
   - 본 문서(`prompts/api/enrollments/get-enrollments.md`) 추가

## 구현 상세

### 1) BFF API 추가 (`GET /api/enrollments`)

- 업스트림 URL: `${API_BASE_URL}/enrollments`
- 요청 헤더: 현재 요청의 `cookie` 전달
- 실패 시:
  - 상태 코드는 업스트림 상태 코드 유지
  - `{ data: [], error: { message, code } }` 반환
- 성공 시:
  - `{ data: [...], error: null }` 반환

### 2) `/me` 페이지 연동

- `headers()` 기반으로 현재 origin을 계산해 `/api/enrollments` 호출
- `cookies()` 값을 API 호출 헤더에 전달하여 인증 유지
- 매핑 우선순위(필드 불확실성 대응):
  - 제목: `course.title` → `courseTitle` → `title` → fallback
  - 썸네일: `course.thumbnailUrl`/`course.imageUrl` → `thumbnailUrl`/`imageUrl`/`thumbnail` → 기본 이미지
  - 진행률: `progress` 또는 `completionRate`를 0~100 정수로 정규화

## 검증

1. 로그인 상태에서 `GET /api/enrollments` 호출 시 목록 반환 확인
2. 비로그인 상태에서 `/me` 접근 시 에러 메시지 노출 확인
3. 목록이 비어있을 때 빈 상태 문구 노출 확인
4. 기존 `POST /api/enrollments?courseId=...` 동작 회귀 확인

## 리스크 및 대응

- 백엔드 응답 필드명이 다를 수 있음
  - 페이지 매핑에서 다중 필드 fallback으로 대응
- 이미지 URL이 누락될 수 있음
  - 기본 썸네일 이미지 사용
- 인증 쿠키 누락 시 401 발생 가능
  - 에러 메시지 UI로 명시
