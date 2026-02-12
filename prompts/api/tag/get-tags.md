# 회원가입 Step2 태그 API 전환 및 컴포넌트 분리 계획

## 목표
`GET /tags`를 비인증으로 사용하고, 선택 상태를 `tagId` 기준으로 전환하며, 선택 규칙을 최소 3/최대 5로 맞춘다. 또한 Step2의 태그 선택 UI를 별도 컴포넌트로 분리하고, `RegistryForm`의 Context/타입까지 정리한다.

핵심 원칙은 **표시용 데이터(name/category)** 와 **제출용 식별자(tagId)** 를 분리하는 것이다. 기존 mock 기반 로직(`src/shared/constants/mocks/tags.ts`)을 API 기반으로 교체하고, Step2는 프레젠테이션 중심으로 단순화한다.

## 구현 단계
1. **태그 도메인 계약 정리**
   - `src/features/Form/RegistryForm/model/types.ts`
   - `src/features/Form/RegistryForm/model/context.ts`
   - `interests: string[]` 중심 구조를 `selectedTagIds: number[]` 중심으로 재설계
   - UI 렌더용 `TagItem` 타입(`tagId`, `name`, `category`, `subCategory`, `status`) 명시

2. **태그 조회 경로 추가**
   - `src/app/api` 하위에 비인증 `GET /tags` 프록시 라우트 추가
   - `src/app/api/courses/search/route.ts` 패턴을 따라 응답 매핑

3. **RegistryForm 상태 로직 전환**
   - `src/features/Form/RegistryForm/index.tsx`
   - `TAG_DATA` mock 의존 제거
   - 태그 목록 fetch, 카테고리/검색/선택 토글을 `tagId` 기반으로 교체
   - 검증을 최소 3/최대 5로 업데이트

4. **태그 선택 컴포넌트 분리**
   - `src/features/Form/RegistryForm/ui/SecondStep` 하위에 선택 UI 전용 컴포넌트(`TagSelector`) 분리
   - `src/features/Form/RegistryForm/ui/SecondStep/index.tsx`는 스텝 레이아웃/제출 제어만 담당

5. **선택 표시 컴포넌트 정합성 보강**
   - `src/features/Form/RegistryForm/ui/SecondStep/SelectedTag.tsx`
   - 제거 핸들러를 `tagId` 기준으로 변경
   - 표시 라벨은 조회 데이터의 `name` 사용

6. **제출 페이로드 정리**
   - `src/features/Form/RegistryForm/model/register.action.ts` 호출부에서 `tagIds`를 직접 전달
   - name→id 변환 단계 제거

7. **문서 동기화**
   - 필요 시 `prompts/api/auth/register.md`와 실제 계약 차이를 정리해 유지보수 혼선 감소

## 검증 항목
- `npm run lint`로 타입/ESLint 회귀 확인
- 수동 검증
  - Step2 진입 시 태그 목록 로드 성공
  - 검색/카테고리 필터 정상 동작
  - 3개 미만 선택 시 진행 차단
  - 5개 초과 선택 차단
  - 선택/해제 시 UI 라벨(name)과 내부 값(tagId) 일치
  - 회원가입 요청 payload의 `tagIds`가 숫자 배열로 전송
- 가능하면 E2E에 최소/최대 선택 경계 케이스 추가

## 확정된 결정사항
- 태그 조회: 비인증 호출
- 선택 상태 저장 기준: `tagId`
- 선택 개수 규칙: 최소 3, 최대 5
- 분리 범위: Step2 UI 분리 + Context/타입 정리 포함
