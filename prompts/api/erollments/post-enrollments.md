# POST /enrollments API 추가 계획 (DRAFT)

Swagger 기준으로 `POST /enrollments`(query: `courseId`, 응답: `201/400/401/409`, 인증: `cookieAuth`)를 Next BFF 라우트로 먼저 구현하는 계획입니다. 현재 코드베이스는 API 라우트별 로컬 타입 선언, `API_BASE_URL` 기반 URL 빌드, `cache: "no-store"` fetch, 업스트림 상태코드/메시지 전달 패턴을 사용하므로 동일한 방식으로 맞춥니다. 사용자 요청이 “API 만들기”이므로 1차 범위는 서버 API 라우트 생성과 최소 검증이며, 수강 버튼 클릭 연동(UI)은 후속 단계로 분리합니다(원하면 같은 패턴으로 즉시 확장 가능).

## Steps

1. 기존 API 패턴 기준점 확정
   - [src/app/api/auth/login/route.ts](src/app/api/auth/login/route.ts)
   - [src/app/api/courses/search/route.ts](src/app/api/courses/search/route.ts)
   - [src/app/api/courses/[courseId]/route.ts](src/app/api/courses/[courseId]/route.ts)
   - `build*Url`, `POST`, 에러 전달 규칙을 기준으로 `enroll` 라우트 스켈레톤 정의.

2. 신규 라우트 추가
   - [src/app/api/enrollments/route.ts](src/app/api/enrollments/route.ts)에 `POST` 핸들러 구현.
   - `courseId` 쿼리 파싱/검증(`parseCourseId` 유사 함수) 및 업스트림 `POST /enrollments?courseId=` 프록시 처리.

3. 인증 쿠키 전달 처리
   - 요청의 `cookie` 헤더를 업스트림으로 포워딩(필수).
   - 응답은 업스트림 status/content-type/body를 그대로 전달해 `401/409` 도메인 오류 보존.

4. 응답 정규화 최소 적용
   - 성공 시 업스트림 JSON 그대로 반환.
   - 환경변수 누락/잘못된 `courseId`에 대한 일관된 `400/500` 메시지 포맷 유지.

5. 문서/사용 예시 반영
   - 연결 포인트 참고 파일:
     - [src/features/Form/EnrollmentForm/ui/EnrollmentSubmitForm/index.tsx](src/features/Form/EnrollmentForm/ui/EnrollmentSubmitForm/index.tsx)
     - [src/app/(web)/course/[courseId]/page.tsx](<src/app/(web)/course/[courseId]/page.tsx>)
   - 코드 연결은 후속으로 두고, 사용 예시 문서화 우선.

## Verification

- 로컬 서버 실행 후 수동 호출:
  - 로그인 후 `POST /api/enrollments?courseId={id}` 호출 시 `201` 확인
  - 누락/비정상 `courseId`로 `400` 확인
  - 비로그인 상태에서 `401` 확인
  - 동일 강좌 재등록 시 `409` 확인
- 기본 정적 점검: `npm run lint`로 신규 라우트 타입/규칙 확인.

## Decisions

- 1차 범위는 “API 라우트 생성”으로 제한하고 UI 이벤트 연결은 제외(요청 문구의 최소 해석).
- Swagger 원문에 맞춰 요청 바디 없이 query `courseId`만 사용.
- 인증은 기존 프로젝트 방식과 일치하게 쿠키 기반(`cookieAuth`)으로 처리.
