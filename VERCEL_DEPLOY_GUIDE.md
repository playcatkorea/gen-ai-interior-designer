# 🚀 Vercel 무료 배포 가이드 (진짜 무료!)

## ✅ 왜 Vercel인가?

- ✅ **100% 무료** (신용카드 불필요)
- ✅ **결제 정보 요구 안 함**
- ✅ **자동 HTTPS**
- ✅ **GitHub 자동 배포**
- ✅ **무제한 대역폭**

---

## 📋 배포 단계 (2단계만!)

### 1단계: Vercel에 가입
**링크**: https://vercel.com/signup

- **GitHub 계정으로 로그인** (추천)
- 권한 승인

### 2단계: 프로젝트 배포
**링크**: https://vercel.com/new

1. **Import Git Repository** 클릭
2. GitHub 레포지토리 선택: `playcatkorea/gen-ai-interior-designer`
3. **환경 변수 입력**:

| Name | Value |
|------|-------|
| `GOOGLE_API_KEY` | `AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU` |
| `YOUTUBE_API_KEY` | `AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A` |

4. **Deploy** 버튼 클릭!

---

## ⏱️ 배포 시간

- **Frontend 빌드**: 1-2분
- **Backend 빌드**: 2-3분
- **총 소요 시간**: 3-5분

---

## 📱 배포 완료 후

배포가 완료되면 URL을 받게 됩니다:

```
https://gen-ai-interior-designer.vercel.app
```

또는

```
https://your-project-name.vercel.app
```

---

## 🎉 완료!

- ✅ 자동 HTTPS
- ✅ 무제한 대역폭
- ✅ GitHub 푸시 시 자동 재배포
- ✅ 완전 무료

---

## 🔧 문제 발생 시

### "Build failed"
→ Vercel 대시보드에서 Logs 확인

### "Function execution timeout"
→ Gemini API 호출이 10초 초과할 수 있음
→ 이 경우 Pro 플랜 필요 (월 $20)

---

## 💡 대안 (백엔드만 별도 배포)

Vercel에서 타임아웃이 발생하면:

1. **Frontend만 Vercel**에 배포
2. **Backend는 무료 Python 호스팅**:
   - Railway.app ($5 크레딧/월)
   - Fly.io (무료 티어)
   - PythonAnywhere (무료 티어)

---

**Vercel 문서**: https://vercel.com/docs
**지원**: https://vercel.com/support

