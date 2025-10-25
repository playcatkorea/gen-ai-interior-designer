# Render.com 실제 화면 기반 배포 가이드

## 📌 현재 화면 상황
- ✅ "New web service" 화면 열림 (올바름!)
- ✅ GitHub 저장소 연결됨: `playcatkorea/gen-ai-interior-designer`
- ❌ Language가 "Python 3"로 선택됨 (Frontend는 Node여야 함!)

---

## 🔧 Frontend 올바른 설정 (현재 화면용)

### 1. Language 변경 ⚠️
현재: `Python 3` ← **잘못됨!**
변경: **`Node`** 선택 ✅

### 2. 나머지 설정 입력

| 항목 | 입력 값 |
|------|---------|
| **Name** | `gen-ai-interior-frontend` |
| **Branch** | `main` |
| **Region** | `Singapore (Southeast Asia)` ← 이미 Backend가 여기 있음 |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm run preview -- --port $PORT --host 0.0.0.0` |
| **Instance Type** | **Free** ✅ |

### 3. Environment Variables 추가

**"Add Environment Variable"** 버튼 클릭 후:

```
NAME_OF_VARIABLE: VITE_API_URL
value: https://gen-ai-interior-backend.onrender.com
```

⚠️ **주의**: Backend URL은 Backend 배포 완료 후 실제 URL로 교체하세요!

### 4. 배포 시작

**"Deploy web service"** 버튼 클릭 → 배포 시작 (약 5-7분)

---

## 🔧 Backend 설정 (아직 안 만들었다면)

Backend부터 먼저 만들어야 Frontend 환경변수에 URL을 입력할 수 있습니다!

### Backend 생성 순서

1. **대시보드로 돌아가기** (좌측 상단 "My Workspace" 클릭)
2. **"New +" → "Web Service"** 클릭
3. **같은 저장소 선택**: `playcatkorea/gen-ai-interior-designer`

### Backend 설정

| 항목 | 입력 값 |
|------|---------|
| **Name** | `gen-ai-interior-backend` |
| **Language** | `Python 3` ✅ |
| **Branch** | `main` |
| **Region** | `Singapore (Southeast Asia)` |
| **Root Directory** | `backend` |
| **Build Command** | `pip install poetry && poetry install` |
| **Start Command** | `poetry run uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Instance Type** | **Free** ✅ |

### Backend Environment Variables (4개)

**"Add Environment Variable"** 버튼을 4번 클릭하여 추가:

```
1. NAME: GOOGLE_API_KEY
   VALUE: AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU

2. NAME: YOUTUBE_API_KEY
   VALUE: AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A

3. NAME: PYTHON_VERSION
   VALUE: 3.12.0

4. NAME: ALLOWED_ORIGINS
   VALUE: *
```

### Backend 배포

**"Deploy web service"** 클릭 → 배포 시작 (약 8-12분)

---

## 📝 배포 순서 요약

### 방법 1: Backend 먼저 (권장) ✅

```
1. Backend Web Service 생성 및 배포
   ↓ (배포 완료 대기: 8-12분)
2. Backend URL 복사
   (예: https://gen-ai-interior-backend.onrender.com)
   ↓
3. Frontend Web Service 생성
   - Language를 "Node"로 변경!
   - VITE_API_URL에 Backend URL 입력
   ↓ (배포 완료 대기: 5-7분)
4. 완료!
```

### 방법 2: Frontend만 먼저 만들기 (수정 필요)

현재 화면에서 바로 배포하면:
- Frontend가 먼저 배포됨
- Backend URL을 모르므로 VITE_API_URL을 임시로 입력
- Backend 배포 완료 후 Frontend 환경변수 수정 필요

---

## ⚠️ 현재 화면에서 수정해야 할 것

### ❌ 잘못된 설정
```
Language: Python 3  ← Frontend는 Node여야 함!
```

### ✅ 올바른 설정
```
Language: Node
Build Command: npm install && npm run build
Start Command: npm run preview -- --port $PORT --host 0.0.0.0
```

---

## 🚀 권장 방법

### 지금 화면을 닫고 Backend부터 만드세요!

1. 현재 화면 닫기 (X 버튼 또는 뒤로가기)
2. Backend 먼저 생성 및 배포 (8-12분)
3. Backend URL 복사
4. Frontend 생성 시 올바른 Backend URL 입력
5. 완료!

**총 소요시간**: 약 15-20분

---

## 🔍 배포 후 확인 방법

### Backend 테스트
```bash
curl https://gen-ai-interior-backend.onrender.com/
```

**예상 응답**:
```json
{
  "status": "running",
  "message": "Gen AI Home Interior Designer API",
  "version": "1.0.0"
}
```

### Frontend 테스트
브라우저에서 접속:
```
https://gen-ai-interior-frontend.onrender.com
```

---

## 📌 중요 정보

### Render 무료 티어 제약
- 15분 비활성 시 슬립 모드 (첫 요청 시 30초-1분 소요)
- 월 750시간 무료 (충분함)
- 빌드 시간 제한: 90초 (이 프로젝트는 문제 없음)

### GitHub 저장소
https://github.com/playcatkorea/gen-ai-interior-designer

### Render 대시보드
https://dashboard.render.com/
