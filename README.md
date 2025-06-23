# ZipCheck Frontend

> 전세사기 예방을 위한 안전한 부동산 검증 서비스

## 📖 프로젝트 소개

ZipCheck는 전세사기를 예방하고 안전한 부동산 거래를 돕는 웹 서비스입니다. 실시간 등기부등본 조회, AI 기반 위험도 분석, 전문가 검토 서비스를 통해 부동산 거래의 안전성을 높입니다.

## 🚀 주요 기능

- **부동산 등기 확인**: 실시간 등기부등본 조회로 정확한 소유권 정보 확인
- **사기 위험도 분석**: AI 기반 위험도 분석으로 전세사기 가능성 사전 감지
- **안전한 계약**: 전문가 검토와 안전 체크리스트로 안심 계약 지원

## 🛠 기술 스택

### Frontend

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + Shadcn UI
- **State Management**: React Hooks (+ Context API 예정)
- **HTTP Client**: Fetch API (사용자 정의 API 서비스)

### Development Tools

- **Linting**: ESLint v9
- **Formatting**: Prettier
- **Package Manager**: npm

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   └── ui/             # Shadcn UI 컴포넌트
├── pages/              # 페이지 컴포넌트
├── hooks/              # 커스텀 React 훅
├── types/              # TypeScript 타입 정의
├── services/           # API 서비스 및 외부 서비스
├── constants/          # 애플리케이션 상수
├── assets/             # 정적 자산 (이미지, 아이콘 등)
└── lib/                # 유틸리티 함수
```

## 🔧 설치 및 실행

### 1. 저장소 클론

```bash
git clone https://github.com/ssngza/zipchcek_front.git
cd zipcheck_front
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 실행되면 [http://localhost:5173](http://localhost:5173)에서 애플리케이션을 확인할 수 있습니다.

## 📝 사용 가능한 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# ESLint 검사
npm run lint

# ESLint 자동 수정
npm run lint:fix

# Prettier 포맷팅
npm run format

# Prettier 포맷 검사
npm run format:check
```

## 🏗 개발 환경 설정

### ESLint + Prettier 설정

이 프로젝트는 ESLint v9와 Prettier가 설정되어 있습니다:

- **자동 포맷팅**: VS Code에서 파일 저장 시 자동으로 Prettier 포맷팅과 ESLint 수정 실행
- **일관된 코드 스타일**: 팀 전체가 동일한 코드 스타일을 유지

### VS Code 확장 프로그램 권장 사항

- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- TypeScript Importer

## 🌍 환경 변수

프로젝트에서 사용하는 환경 변수:

```bash
# API 기본 URL (선택사항, 기본값: /api)
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🚦 배포

### 프로덕션 빌드 생성

```bash
npm run build
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

### 정적 파일 서버에 배포

빌드된 `dist/` 폴더를 정적 파일 서버 (Nginx, Apache, Vercel, Netlify 등)에 업로드하여 배포할 수 있습니다.

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 ISC 라이선스 하에 배포됩니다.

## 📞 연락처

프로젝트에 대한 문의사항이 있으시면 [Issues](https://github.com/ssngza/zipchcek_front/issues)를 통해 연락해 주세요.

---

**ZipCheck** - 안전한 부동산 거래를 위한 첫 걸음 🏠✨
