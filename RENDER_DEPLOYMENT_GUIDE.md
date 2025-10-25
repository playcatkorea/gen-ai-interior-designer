# 🚀 Render.com 무료 배포 가이드

## 📋 준비 사항 체크리스트

### ✅ 이미 완료된 것들
- [x] Git 레포지토리 초기화 완료
- [x] 코드 커밋 완료
- [x] `render.yaml` 배포 설정 파일 생성 완료
- [x] 프론트엔드 API URL 환경 변수 설정 완료
- [x] 백엔드 CORS 설정 완료

### 📝 사용자가 준비해야 할 정보

#### 1. GitHub 계정
- **필요한 것**: GitHub 계정 (없으면 https://github.com 에서 가입)
- **이메일**: GitHub에 등록된 이메일
- **사용자명**: GitHub 사용자명

#### 2. Google Gemini API 키
- **현재 `.env` 파일에 있는 API 키 확인 필요**
- **경로**: `backend/.env` 파일의 `GOOGLE_API_KEY`
- **형식**: `AIza...` 로 시작하는 키

#### 3. YouTube API 키 (선택사항)
- **경로**: `backend/.env` 파일의 `YOUTUBE_API_KEY`
- **없어도 배포 가능** (추천 기능만 비활성화)

---

## 🎯 배포 단계별 가이드

### Step 1: GitHub에 코드 업로드

1. **GitHub에 로그인**
   - https://github.com 접속
   - 로그인

2. **새 레포지토리 생성**
   - 우측 상단 `+` 버튼 클릭
   - `New repository` 선택
   - **Repository name**: `gen-ai-interior-designer` (원하는 이름 가능)
   - **Visibility**: `Public` 또는 `Private` 선택 (무료는 Public 권장)
   - **❌ Initialize this repository with README 체크 해제**
   - `Create repository` 버튼 클릭

3. **로컬 코드를 GitHub에 푸시**
   - GitHub에서 생성된 레포지토리 페이지의 명령어를 복사
   - 아래 명령어 실행:

```bash
# GitHub 레포지토리 연결 (본인의 URL로 변경)
git remote add origin https://github.com/YOUR_USERNAME/gen-ai-interior-designer.git

# 코드 푸시
git branch -M main
git push -u origin main
```

**예시**:
```bash
git remote add origin https://github.com/johndoe/gen-ai-interior-designer.git
git branch -M main
git push -u origin main
```

---

### Step 2: Render.com 가입 및 배포

1. **Render.com 가입**
   - https://render.com 접속
   - `Get Started` 또는 `Sign Up` 클릭
   - **GitHub 계정으로 가입** (권장)
   - GitHub 연동 승인

2. **새 프로젝트 생성**
   - 대시보드에서 `New +` 버튼 클릭
   - `Blueprint` 선택

3. **GitHub 레포지토리 연결**
   - `Connect a repository` 클릭
   - 방금 만든 레포지토리 선택: `gen-ai-interior-designer`
   - `Connect` 버튼 클릭

4. **Blueprint 감지**
   - Render가 자동으로 `render.yaml` 파일을 감지
   - 2개의 서비스가 표시됨:
     - ✅ `gen-ai-interior-backend` (Python)
     - ✅ `gen-ai-interior-frontend` (Node.js)

5. **환경 변수 설정 (중요!)**

   **Backend 서비스 설정**:
   - `gen-ai-interior-backend` 클릭
   - `Environment` 탭 선택
   - 다음 환경 변수 추가:

   | Key | Value | 설명 |
   |-----|-------|------|
   | `GOOGLE_API_KEY` | `AIza...` | Gemini API 키 (backend/.env에서 복사) |
   | `YOUTUBE_API_KEY` | `AIza...` | YouTube API 키 (선택사항) |
   | `ALLOWED_ORIGINS` | `*` | CORS 설정 (나중에 프론트엔드 URL로 변경) |

   **Frontend 서비스 설정**:
   - `gen-ai-interior-frontend` 클릭
   - `Environment` 탭 선택
   - `VITE_API_URL`은 자동으로 설정됨 (render.yaml에서)

6. **배포 시작**
   - `Apply` 버튼 클릭
   - 배포 시작 (약 5-10분 소요)

---

### Step 3: 배포 완료 및 확인

1. **배포 로그 확인**
   - `Logs` 탭에서 실시간 배포 로그 확인
   - 에러 발생 시 로그 확인

2. **서비스 URL 확인**
   - Backend URL: `https://gen-ai-interior-backend.onrender.com`
   - Frontend URL: `https://gen-ai-interior-frontend.onrender.com`
   - (실제 URL은 다를 수 있음)

3. **프론트엔드 접속 테스트**
   - Frontend URL로 접속
   - 페이지가 정상적으로 로드되는지 확인
   - 이미지 업로드 및 디자인 생성 테스트

4. **CORS 설정 최종 업데이트** (선택사항)
   - Backend 서비스의 `Environment` 탭
   - `ALLOWED_ORIGINS` 값을 실제 프론트엔드 URL로 변경
   - 예: `https://gen-ai-interior-frontend.onrender.com`
   - `Save Changes` 클릭

---

## ⚠️ 중요 사항

### 무료 티어 제한사항
- ✅ **완전 무료** (신용카드 불필요)
- ⏱️ **15분 슬립 모드**: 요청 없으면 자동으로 슬립
- 🐌 **콜드 스타트**: 첫 요청 시 30초 정도 깨어나는 시간 필요
- 📊 **750시간/월** = 사실상 무제한

### API 키 보안
- ❌ **절대로 GitHub에 `.env` 파일 푸시 금지**
- ✅ `.gitignore`에 `.env` 포함 확인됨
- ✅ Render.com 환경 변수로 안전하게 관리

### 자동 배포
- GitHub에 코드 푸시하면 **자동으로 재배포**
- `main` 브랜치에 푸시할 때마다 자동 업데이트

---

## 🔧 문제 해결

### 1. "Build failed" 에러
- **원인**: Python/Node.js 버전 불일치
- **해결**: `render.yaml`의 `PYTHON_VERSION` 확인
- **로그 확인**: Logs 탭에서 에러 메시지 확인

### 2. "ERR_CONNECTION_REFUSED"
- **원인**: 백엔드 서비스가 아직 시작 중
- **해결**: 1-2분 대기 후 재시도
- **확인**: Backend 서비스의 Logs 탭에서 "Application startup complete" 메시지 확인

### 3. "디자인 생성 실패"
- **원인**: `GOOGLE_API_KEY` 환경 변수 미설정
- **해결**: Backend 서비스의 Environment 탭에서 API 키 추가
- **재배포**: `Manual Deploy` → `Deploy latest commit` 클릭

### 4. CORS 에러
- **원인**: `ALLOWED_ORIGINS` 설정 오류
- **해결**: Backend 환경 변수에서 `ALLOWED_ORIGINS` 값 확인
- **임시**: `*`로 설정 (모든 origin 허용)
- **권장**: 실제 프론트엔드 URL로 설정

---

## 📝 배포 후 해야 할 일

### 1. GitHub README 업데이트
```markdown
# Gen AI Home Interior Designer

🌐 **Live Demo**: https://gen-ai-interior-frontend.onrender.com

AI-powered interior/exterior design generation with Google Gemini 2.0
```

### 2. 프론트엔드 URL 공유
- Frontend URL을 친구들에게 공유
- 첫 방문자는 30초 정도 기다려야 함 (슬립 모드 해제)

### 3. 모니터링
- Render.com 대시보드에서 사용량 확인
- 무료 티어 750시간/월 내에서 사용

---

## 🎉 완료!

이제 완전 무료로 AI 인테리어 디자이너가 배포되었습니다!

**Frontend URL**: `https://gen-ai-interior-frontend.onrender.com`
**Backend API**: `https://gen-ai-interior-backend.onrender.com/docs`

---

## 📞 도움이 필요하면

- Render.com 문서: https://render.com/docs
- Discord 커뮤니티: https://discord.gg/render
- GitHub Issues: 레포지토리의 Issues 탭 사용
