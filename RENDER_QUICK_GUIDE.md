# 🚀 Render.com 빠른 배포 가이드

## 📋 준비된 정보

### ✅ GitHub 레포지토리
```
https://github.com/playcatkorea/gen-ai-interior-designer
```

### 🔑 필요한 API 키 (복사해서 사용하세요)

**GOOGLE_API_KEY** (필수):
```
AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU
```

**YOUTUBE_API_KEY** (선택사항):
```
AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A
```

---

## 🎯 Render.com 배포 단계

### Step 1: Blueprints 페이지로 이동
1. 왼쪽 메뉴에서 **"Blueprints"** 클릭
2. **"New Blueprint Instance"** 버튼 클릭

### Step 2: GitHub 레포지토리 연결
1. **"Connect a repository"** 클릭
2. `playcatkorea/gen-ai-interior-designer` 선택
3. **"Connect"** 버튼 클릭

### Step 3: Blueprint 확인
Render가 `render.yaml` 파일을 자동으로 읽어 2개의 서비스를 생성합니다:

```
✅ gen-ai-interior-backend (Python, Free Plan)
✅ gen-ai-interior-frontend (Static Site, Free Plan)
```

### Step 4: 환경 변수 설정

#### Backend 서비스 환경 변수:

| Key | Value | 비고 |
|-----|-------|------|
| `GOOGLE_API_KEY` | `AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU` | 필수 |
| `YOUTUBE_API_KEY` | `AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A` | 선택 |
| `ALLOWED_ORIGINS` | `*` | 자동 설정됨 |

#### Frontend 서비스 환경 변수:
- `VITE_API_URL`: 자동으로 Backend URL로 설정됨 ✅

### Step 5: 배포 시작
1. 모든 환경 변수 입력 확인
2. **"Apply"** 또는 **"Create Blueprint"** 버튼 클릭
3. 배포 시작 (약 5-10분 소요)

---

## ✅ 배포 완료 후

### 서비스 URL 확인
배포가 완료되면 다음 URL을 받게 됩니다:

- **Frontend**: `https://gen-ai-interior-frontend.onrender.com`
- **Backend API**: `https://gen-ai-interior-backend.onrender.com/docs`

### 첫 방문 시 주의사항
- ⏱️ 15분 동안 요청이 없으면 슬립 모드 진입
- 🐌 첫 요청 시 30초 정도 깨어나는 시간 필요
- ✅ 이후 정상 속도로 작동

---

## 🔧 문제 해결

### "Build failed" 에러
- **Logs** 탭에서 에러 메시지 확인
- Python/Node.js 버전 문제일 가능성

### "디자인 생성 실패"
- Backend 서비스의 **Environment** 탭 확인
- `GOOGLE_API_KEY`가 제대로 입력되었는지 확인
- **Manual Deploy** → **Deploy latest commit** 클릭하여 재배포

### CORS 에러
- `ALLOWED_ORIGINS`가 `*`로 설정되어 있는지 확인
- 필요시 실제 Frontend URL로 변경

---

## 💰 비용 확인

### 무료 티어 (Hobby Plan)
- ✅ **완전 무료**
- ✅ **500분 무료 빌드 시간** (월별)
- ✅ **신용카드 불필요**

### Build Pipeline 사용량
- **Starter Tier**: 500분 무료 포함
- **초과 시**: $5 / 1,000분
- **월별 초기화**: 매월 1일

---

## 🎉 배포 성공!

배포가 완료되면:

1. **Frontend URL 접속**하여 테스트
2. 이미지 업로드 및 디자인 생성 확인
3. 친구들에게 URL 공유 🚀

---

## 📞 도움말

- **Render.com 문서**: https://render.com/docs
- **Discord 커뮤니티**: https://discord.gg/render
- **GitHub Issues**: https://github.com/playcatkorea/gen-ai-interior-designer/issues
