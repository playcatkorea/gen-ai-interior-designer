# ?? Render.com 배포 ?�전 가?�드 (링크 ?�함)

## ?�� 배포 ?�서

### 1️⃣ Backend ?�비???�성 (먼�?!)

**?�� 배포 링크**: https://dashboard.render.com/create?type=web

#### ???�정 ?�보 (복사?�서 ?�용)

**Repository**:
- GitHub ?�결: `playcatkorea/gen-ai-interior-designer` ?�택
- Branch: `main`

**Basic ?�정**:
```
Name: gen-ai-interior-backend
Root Directory: backend
Environment: Python 3
Region: Singapore (가??가까�?)
Branch: main
```

**Build & Deploy ?�정**:
```
Build Command: pip install poetry && poetry install
Start Command: poetry run uvicorn main:app --host 0.0.0.0 --port $PORT
```

**Instance Type**:
```
�?Free (중요!)
```

**?�경 변??(Advanced ?�릭)**:

| Key | Value (복사) |
|-----|--------------|
| `GOOGLE_API_KEY` | `AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU` |
| `YOUTUBE_API_KEY` | `AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A` |
| `PYTHON_VERSION` | `3.12.0` |
| `ALLOWED_ORIGINS` | `*` |

**"Create Web Service" 버튼 ?�릭!**

?�️ **배포 ?�간: 5-7�?*

---

### 2️⃣ Frontend ?�비???�성 (Backend ?�료 ??

**Backend URL ?�인**:
```
https://gen-ai-interior-backend.onrender.com
```
(Backend 배포 ?�료 ????URL??복사)

**?�� 배포 링크**: https://dashboard.render.com/create?type=web

#### ???�정 ?�보 (복사?�서 ?�용)

**Repository**:
- 같�? ?�포지?�리: `playcatkorea/gen-ai-interior-designer`
- Branch: `main`

**Basic ?�정**:
```
Name: gen-ai-interior-frontend
Root Directory: frontend
Environment: Node
Region: Singapore
Branch: main
```

**Build & Deploy ?�정**:
```
Build Command: npm install && npm run build
Start Command: npx serve -s dist -l $PORT
```

**Instance Type**:
```
�?Free (중요!)
```

**?�경 변??(Advanced ?�릭)**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://gen-ai-interior-backend.onrender.com` |

(?�의 URL?� Backend 배포 ?�료 ???�제 URL�?변�?

**"Create Web Service" 버튼 ?�릭!**

?�️ **배포 ?�간: 3-5�?*

---

## ?�� 배포 ?�료 ??URL

??**Frontend (?�용?�용)**:
```
https://gen-ai-interior-frontend.onrender.com
```

??**Backend API 문서**:
```
https://gen-ai-interior-backend.onrender.com/docs
```

---

## ?�� 비용

- ??**100% 무료**
- ??Free Instance Type ?�택
- ????750?�간 무료 = ?�실??무제??- ???�용카드 불필??
---

## ?�️ 주의?�항

### ?�립 모드
- 15�??�안 ?�청 ?�으�??�동 ?�립
- �??�청 ??30�??��?(깨어??
- ?�후 ?�상 ?�도

### ?�서 중요
1. ??**Backend 먼�?** 배포
2. ??Backend URL ?�인
3. ??**Frontend ?�중??* 배포 (Backend URL ?�용)

---

## ?�� 문제 ?�결

### "Build failed"
??Logs ??��???�러 ?�인

### "?�자???�성 ?�패"
??Backend ?�경 변?�에??`GOOGLE_API_KEY` ?�인

### CORS ?�러
??Backend ?�경 변?�에 `ALLOWED_ORIGINS=*` ?�는지 ?�인

### "결제 ?�요" 메시지
??Instance Type??**Free**�??�택?�는지 ?�인

---

## ?�� ?��?�?
- **Render.com 문서**: https://render.com/docs
- **Discord 커�??�티**: https://discord.gg/render
- **GitHub ?�포지?�리**: https://github.com/playcatkorea/gen-ai-interior-designer

---

## ?�� ?�료 체크리스??
- [ ] Backend ?�비???�성 ?�료
- [ ] Backend 배포 ?�료 (5-7�?
- [ ] Backend URL ?�인
- [ ] Frontend ?�비???�성 ?�료
- [ ] Frontend 배포 ?�료 (3-5�?
- [ ] Frontend URL�??�속 ?�스??- [ ] ?��?지 ?�로??& AI ?�자???�성 ?�스??- [ ] 친구?�에�?URL 공유! ??

