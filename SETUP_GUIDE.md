# 🏡 Gen AI Home Interior Designer - 설정 가이드

## 📋 프로젝트 정보
AI 기반 인테리어/익스테리어 디자인 자동 생성 도구
- **Frontend**: React.js + Vite + Ant Design
- **Backend**: FastAPI + Python 3.12 + Poetry
- **AI**: Google Gemini (Multimodal Generative AI)

---

## ✅ 설치 완료 항목

### 1️⃣ **개발 환경**
- ✅ Python 3.12.3
- ✅ Node.js v22.18.0
- ✅ npm 10.9.3
- ✅ Poetry 2.2.1

### 2️⃣ **의존성 설치**
- ✅ Backend 패키지 (FastAPI, Google Gemini, Uvicorn 등)
- ✅ Frontend 패키지 (React, Ant Design, Axios 등)

### 3️⃣ **설정 파일**
- ✅ Claude Code YOLO 모드 ([.claude/config.json](.claude/config.json))
- ✅ Backend 환경 변수 템플릿 ([backend/.env](backend/.env))

---

## 🚀 실행 방법

### **Step 1: Google Gemini API 키 발급**

1. https://aistudio.google.com/app/apikey 접속
2. "Create API Key" 클릭
3. API 키 복사

### **Step 2: 환경 변수 설정**

[backend/.env](backend/.env) 파일을 열어 API 키를 입력하세요:

```bash
GEMINI_API_KEY=실제_API_키를_여기에_붙여넣기
```

### **Step 3: Backend 실행**

```bash
# backend 디렉토리로 이동
cd backend

# Poetry 가상환경 활성화
poetry shell

# 서버 실행
uvicorn main:app --reload
```

서버 실행 확인: http://localhost:8000

### **Step 4: Frontend 실행**

**새 터미널 창을 열고:**

```bash
# frontend 디렉토리로 이동
cd frontend

# 개발 서버 실행
npm run dev
```

프론트엔드 접속: http://localhost:5173

---

## 🎨 사용 방법

1. **이미지 업로드**: 재디자인할 공간 사진 선택
2. **옵션 선택**:
   - Design Type: Interior / Exterior
   - Room Type: Living Room, Bedroom, Kitchen 등
   - Style: Modern, Rustic, Boho 등
   - Colors: 배경색, 전경색 선택
3. **Generate** 버튼 클릭
4. **결과 확인**: AI가 생성한 재디자인 이미지 + 설명

---

## 🛠️ 활용 가능한 MCP 서버

### **현재 사용 가능** (Claude Code에서 바로 호출)

1. **Supabase** - 프로젝트 데이터 저장
   - 프로젝트 ID: `qqxlyjdeksbwfsjubmco`
   - Read-only 모드 설정됨

2. **OpenAI MCP** - 디자인 설명 보강
   - GPT-4o, o1-preview, o1-mini 사용 가능

3. **Figma Developer** - 디자인 템플릿
   - API 키 설정됨

4. **YouTube Data** - 인테리어 튜토리얼 추천

5. **Google Search** - 트렌드 검색

6. **Notion** - 프로젝트 문서화

7. **Playwright Stealth** - 웹 스크래핑

8. **n8n** - 워크플로우 자동화

자세한 MCP 통합 가이드: [MCP_INTEGRATION_GUIDE.md](MCP_INTEGRATION_GUIDE.md)

---

## 📊 프로젝트 구조

```
Gen-AI_Home_Interior_Designer/
├── backend/                    # FastAPI 백엔드
│   ├── main.py                # 메인 애플리케이션
│   ├── routers/               # API 라우터
│   ├── pyproject.toml         # Poetry 의존성
│   ├── .env                   # 환경 변수 (API 키)
│   └── README.md
├── frontend/                   # React 프론트엔드
│   ├── src/
│   │   ├── App.jsx           # 메인 컴포넌트
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── examples/                   # 샘플 이미지
├── screenshots/               # 프로젝트 스크린샷
├── .claude/                   # Claude Code 설정
│   └── config.json           # YOLO 모드 활성화
├── MCP_INTEGRATION_GUIDE.md  # MCP 통합 가이드
└── SETUP_GUIDE.md            # 이 파일
```

---

## 🔧 문제 해결

### **Backend 실행 오류**

#### 1. Poetry가 인식되지 않을 때
```bash
# Poetry 재설치
pip install poetry

# PATH 확인
where poetry
```

#### 2. 가상환경 문제
```bash
# 가상환경 삭제 후 재설치
poetry env remove python
poetry install
```

### **Frontend 실행 오류**

#### 1. npm 패키지 문제
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
```

#### 2. 보안 취약점 경고
```bash
# 자동 수정
npm audit fix
```

### **API 호출 실패**

#### 1. CORS 오류
- Backend의 CORS 설정 확인 ([backend/main.py:8-14](backend/main.py#L8-L14))
- Frontend URL이 허용 목록에 있는지 확인

#### 2. Gemini API 오류
- `.env` 파일의 API 키 확인
- API 할당량 확인: https://aistudio.google.com/

---

## 🎯 다음 단계 (구현 제안)

### **Phase 1: 데이터 영속성**
- [ ] Supabase 데이터베이스 스키마 생성
- [ ] Backend에 Supabase 클라이언트 추가
- [ ] 프로젝트 저장/불러오기 API 구현
- [ ] Frontend에 저장 기능 추가

### **Phase 2: 디자인 품질 향상**
- [ ] OpenAI로 디자인 설명 보강
- [ ] 여러 디자인 옵션 생성 (반복 디자인)
- [ ] Before/After 비교 뷰

### **Phase 3: 콘텐츠 큐레이션**
- [ ] YouTube 튜토리얼 추천 기능
- [ ] Pinterest/Houzz 영감 스크래핑
- [ ] 가구 가격 비교

### **Phase 4: 협업 및 자동화**
- [ ] Notion 프로젝트 관리
- [ ] n8n 워크플로우 (이메일 알림 등)
- [ ] 클라이언트 피드백 시스템

---

## 📞 지원 및 문서

- **원본 GitHub**: https://github.com/narender-rk10/Gen-AI-Home-Interior-Designer
- **Google Gemini API**: https://ai.google.dev/docs
- **FastAPI 문서**: https://fastapi.tiangolo.com
- **React 문서**: https://react.dev

---

## 🎉 설정 완료!

이제 다음을 실행할 수 있습니다:

1. ✅ **Backend**: `cd backend && poetry shell && uvicorn main:app --reload`
2. ✅ **Frontend**: `cd frontend && npm run dev`
3. ✅ **Claude Code MCP**: 15개 서버 활성화

**Happy Designing! 🏡✨**

---

**작성일**: 2025-10-25
**환경**: Windows 네이티브 + WSL
**Claude Code**: YOLO 모드 활성화
