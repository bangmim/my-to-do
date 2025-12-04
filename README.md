# 📝 Todo Studio

개인 할 일 관리 웹 애플리케이션으로, 사용자 인증, 할 일 CRUD, 대시보드 통계, 캘린더 뷰 등 다양한 기능을 제공하는 풀스택 애플리케이션입니다.
## 🔗 배포
https://my-to-do-gules.vercel.app/signin
## ✨ 주요 기능
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/d42c365c-e321-4a69-a3fb-0aa8417d455d" />
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/74381014-10b7-41c7-b806-2ce68f786215" />
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/846c63a5-b834-489c-95bc-a73aaffb6fd7" />
<br/>
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/a45ac878-c148-4bac-b681-b79112039978" />
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/a22b880f-7e03-4906-8089-5e35de04bc07" />

### 🔐 인증 시스템

-   **회원가입**: 이메일과 비밀번호를 통한 회원가입
-   **로그인/로그아웃**: 안전한 세션 관리
-   **인증 보호**: 로그인하지 않은 사용자는 자동으로 로그인 페이지로 리다이렉트

### 📋 할 일 관리

-   **할 일 추가**: 플로팅 버튼을 통한 직관적인 할 일 추가
-   **할 일 완료 처리**: 체크박스를 통한 완료/미완료 상태 전환
-   **할 일 삭제**: 호버 시 표시되는 삭제 버튼
-   **실시간 동기화**: Supabase를 통한 실시간 데이터 동기화

### 📊 대시보드

-   **통계 카드**: 전체, 완료, 진행 중인 할 일 개수 표시
-   **달성률 차트**: SVG로 구현한 커스텀 도넛 차트
    -   완료율에 따른 동적 색상 변경 (80% 이상: 초록, 50% 이상: 파랑, 미만: 주황)
    -   호버 시 상세 정보 툴팁 표시
-   **월별 통계 테이블**: 월별 할 일 통계를 테이블 형식으로 표시
-   **캘린더 뷰**:
    -   월별 캘린더로 할 일이 있는 날짜 표시
    -   날짜 클릭 시 해당 날짜의 할 일 목록 모달 표시
    -   이전/다음 월 네비게이션 및 오늘 날짜로 이동 기능

### 🎨 사용자 경험

-   **반응형 디자인**: 모바일부터 데스크톱까지 최적화된 UI
-   **모던한 디자인**: Tailwind CSS를 활용한 깔끔하고 세련된 인터페이스
-   **직관적인 네비게이션**: 현재 페이지에 따른 동적 네비게이션 바 스타일링

## 🛠 기술 스택

### Frontend

-   **Next.js 16** (App Router) - React 프레임워크
-   **React 19** - UI 라이브러리
-   **Tailwind CSS 4** - 유틸리티 기반 CSS 프레임워크
-   **PropTypes** - 타입 검증

### Backend & Database

-   **Supabase** - 백엔드 및 데이터베이스
    -   PostgreSQL 데이터베이스
    -   Row Level Security (RLS)를 통한 사용자별 데이터 보호
    -   실시간 인증 및 세션 관리

### 개발 도구

-   **ESLint** - 코드 품질 관리
-   **Babel React Compiler** - React 컴파일러


## 🎯 주요 특징

### 1. 커스텀 SVG 차트 구현
외부 차트 라이브러리 없이 순수 SVG와 React를 사용하여 도넛 차트를 구현했습니다. `strokeDasharray`와 `strokeDashoffset`을 활용하여 동적 프로그레스 애니메이션을 구현했습니다.

### 2. 컴포넌트 기반 아키텍처
재사용 가능한 컴포넌트로 구성되어 있어 유지보수성과 확장성이 뛰어납니다.

### 3. 인증 보호 라우팅
Next.js App Router의 클라이언트 컴포넌트를 활용하여 인증되지 않은 사용자를 자동으로 로그인 페이지로 리다이렉트합니다.

### 4. 실시간 데이터 동기화
Supabase를 통한 실시간 데이터베이스 연동으로 할 일 추가, 수정, 삭제가 즉시 반영됩니다.

### 5. 반응형 디자인
모바일 퍼스트 접근 방식으로 모든 디바이스에서 최적의 사용자 경험을 제공합니다.

**주요 기술**: Next.js, React, Supabase, Tailwind CSS, CursorAI
