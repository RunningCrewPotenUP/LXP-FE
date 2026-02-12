# GET Courses API 구현 계획

`searchCourses` 스펙(`GET /courses/search`)을 기준으로, Next Route Handler를 BFF처럼 두고 메인 화면이 이 라우트를 통해 강의 목록을 받도록 구성한다.

## 결정사항

- 범위: API 라우트 + 메인 페이지 연동
- 인증: `/courses/search` 호출 시 쿠키 포워딩 안 함
- 응답: 업스트림 패스스루가 아닌 프론트 전용 재가공
- 기본값: Swagger 기본 쿼리값 사용
  - `page=0`
  - `size=10`
  - `sort=createdAt,DESC`

## 구현 방향

기존 인증 라우트 패턴(`src/app/api/auth/login/route.ts`)의 환경변수/URL 구성 컨벤션을 따르되, 반환 형태는 카드 렌더링에 맞춘 목록 DTO로 단순화한다.

카드 구조(`src/entities/Card/CourseCard/model/props.type.ts`)와 컨테이너 입력(`src/widgets/CardContainer/model/props.type.ts`)에 맞춰 매핑 규칙을 고정한다.

## 작업 단계

1. `src/app/api/courses/search/route.ts` 생성
   - `GET` 핸들러 구현
   - 쿼리(`page`, `size`, `sort`, `keyword`) 파싱
   - 기본값 적용 후 업스트림 `/courses/search` 호출

2. API 응답 정규화
   - 업스트림 `data.content[]`를 카드 친화형으로 매핑
     - `id`
     - `title`
     - `description`
     - `badgeOptions.label`
     - `tagOptions[]`
   - 페이지 메타 포함
     - `totalElements`
     - `totalPages`
     - `number`
     - `size`

3. 오류 처리 정책 적용
   - 업스트림 실패 시 상태코드는 유지
   - 본문은 일관된 `{ message }` 또는 `{ error }` 구조로 축약

4. `src/app/(web)/main/page.tsx` 연동
   - 하드코딩 `cardOptions` 제거
   - 서버 컴포넌트에서 `/api/courses/search` 호출
   - `CardContainer`에 결과 주입

5. 매핑 폴백 정책 적용
   - `badgeOptions`는 `level.value` 우선, 없으면 미표시
   - `tagOptions`는 `tags[].content` 기준으로 최대 N개 전달

6. 필요 시 타입 분리
   - 목록 응답/카드 매핑 타입을 페이지 인근 또는 공용 타입 파일로 분리

## 검증

- 정적 점검
  - `npm run lint`

- 수동 확인
  - `/main` 진입 시 네트워크에서 `/api/courses/search` 200 확인
  - 쿼리 미지정 시 기본값 적용 확인(`page=0,size=10,sort=createdAt,DESC`)
  - `keyword` 적용 시 카드 목록 필터링 반영 확인
  - 업스트림 오류 시(예: API 서버 중지) 메인 페이지 빈 목록/오류 처리 확인
