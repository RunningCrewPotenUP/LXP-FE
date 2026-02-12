## Plan: 강좌 상세 조회 API 추가

목표는 Swagger의 `GET /courses/{courseId}`를 기준으로 Next BFF 라우트 기반 상세 조회를 추가하고, 응답은 UI 전용 DTO로 정규화하는 것입니다. 이미 존재하는 목록 조회 패턴(`src/app/api/courses/search/route.ts`)을 재사용해 일관된 에러 처리/환경변수 처리 방식을 유지합니다. 인증은 공개 API 가정으로 쿠키 포워딩 없이 진행하며, 상세 페이지(`src/app/(web)/course/[courseId]/page.tsx`)에서 새 BFF를 호출하도록 연결합니다. 스웨거 예시 응답의 `data/error` 래퍼와 200/404 분기를 그대로 반영하되, 화면에 필요한 필드만 안전하게 매핑합니다.

### Steps

1. `src/app/api/courses/search/route.ts`의 `build*Url`/`parseResponseAsJson`/`GET` 패턴을 기준으로 새 라우트 `src/app/api/courses/[courseId]/route.ts` 설계를 확정한다 (`GET`, `courseId` 검증, 업스트림 호출 URL 조합).
2. 새 라우트에서 업스트림 `GET /courses/{courseId}` 응답을 파싱하고, `data`를 상세 UI DTO로 정규화하는 매핑 로직을 정의한다 (`null`/누락 필드 방어 포함).
3. 에러 처리는 기존 컨벤션대로 통일한다: 환경변수 누락 500, 업스트림 실패 시 status 유지(특히 404), 메시지 폴백 규칙 적용.
4. 상세 페이지 데이터 페칭을 `src/app/(web)/course/[courseId]/page.tsx`에 연결하고, 실패 시 기본 UI 분기(예: not found 또는 안내 문구) 기준을 반영한다.
5. 라우트/페이지 간 타입을 로컬 타입으로 정리하고, 필요 시 기존 상수 경로 참조 위치(`src/shared/constants/routes.ts`)와 충돌 없는지 점검한다.
6. API 명세 문서 자산 업데이트가 필요하면 `prompts/api/course/get-courses.md`와 동일한 형식으로 상세 조회 프롬프트 문서 추가 범위를 정의한다.

### Verification

- 단위 확인: `GET /api/courses/{courseId}`에 대해 정상 ID(200), 없는 ID(404), 잘못된 ID(400), 환경변수 미설정(500) 응답 확인.
- 화면 확인: `src/app/(web)/course/[courseId]/page.tsx`에서 API 연동 후 상세 데이터 렌더링/실패 분기 동작 확인.
- 회귀 확인: 기존 목록 API `src/app/api/courses/search/route.ts` 동작 영향 없음 확인.

### Decisions

- 구현 위치: Next BFF 라우트 방식 채택 (`/api/courses/[courseId]`).
- 인증 정책: 공개 API 가정으로 쿠키 포워딩 미적용.
- 응답 전략: 백엔드 원본 보존보다 UI 전용 DTO 정규화를 우선.
