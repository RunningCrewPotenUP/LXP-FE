# 설명

이 파일은 [회원가입]에 대한 페이지야.

# 목적

이 파일을 fsd 아키텍처를 사용해서 이 프로젝트의 컨벤션에 맞게 만들어줘.

# 컨벤션

- 최소단위의 컴포넌트는 'entities' 폴더에 정의
- 회원가입 폼의 경우 'widgets' 폴더에 정의
- 스타일에 관한 정의는 'style.ts'에 clsx를 이용해 스타일에 따라 분류
- props의 경우 'model' 폴더에 정의
- [TAG_DATA]의 경우 더미데이터로, 'shared/constants/mocks' 폴더에 저장
- 아이콘의 경우 'lucide-react'를 이용
- 컴포넌트를 만들기 전, 'entities' 폴더 혹은 'widgets' 폴더에 존재하는지 확인 후 없다면 새로 만든다

# 코드 작성 이후

- playwright mcp를 이용하여 각 컴포넌트가 정상 작동 하는지 확인
