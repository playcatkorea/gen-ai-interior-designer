# 🚀 Render.com 최종 배포 가이드 (3분 완성!)

## ✅ 현재 완료된 것들
- [x] GitHub 레포지토리: https://github.com/playcatkorea/gen-ai-interior-designer
- [x] render.yaml 설정 완료
- [x] API 키 준비 완료
- [x] 로컬 서버 실행 중

## 📋 이제 할 일 (3단계만!)

### 1️⃣ Blueprints 페이지 열기
**링크**: https://dashboard.render.com/blueprints

**"New Blueprint Instance"** 버튼 클릭

---

### 2️⃣ GitHub 레포지토리 연결
1. **"Connect a repository"** 클릭
2. 레포지토리 검색: `gen-ai-interior-designer`
3. **"Connect"** 버튼 클릭

---

### 3️⃣ 환경 변수 입력 & 배포

#### Backend 서비스 환경 변수:

**GOOGLE_API_KEY** (복사):
```
AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU
```

**YOUTUBE_API_KEY** (복사, 선택사항):
```
AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A
```

#### "Apply" 버튼 클릭!

---

## ⏱️ 배포 진행 시간

- Backend 빌드: 약 3-5분
- Frontend 빌드: 약 2-3분
- **총 소요 시간: 5-10분**

---

## 📱 배포 완료 후 URL

**프론트엔드**:
```
https://gen-ai-interior-frontend.onrender.com
```

**백엔드 API**:
```
https://gen-ai-interior-backend.onrender.com/docs
```

---

## 💰 비용

- ✅ **100% 무료**
- ✅ 신용카드 불필요
- ✅ 월 500분 빌드 시간 무료 포함

---

## ⚠️ 첫 방문 시 주의

- 15분 동안 방문자가 없으면 **슬립 모드**
- 첫 요청 시 **30초 대기** (슬립 모드 해제)
- 이후 정상 속도로 작동

---

## 🎉 완료!

배포가 완료되면:
1. Frontend URL 접속
2. 이미지 업로드
3. AI 디자인 생성 테스트
4. 친구들에게 URL 공유! 🚀

---

## 🔧 문제 발생 시

### "Build failed"
→ Logs 탭에서 에러 확인

### "디자인 생성 실패"
→ GOOGLE_API_KEY 재확인

### CORS 에러
→ ALLOWED_ORIGINS=* 환경 변수 추가

---

**도움말**: https://render.com/docs
**Discord**: https://discord.gg/render

