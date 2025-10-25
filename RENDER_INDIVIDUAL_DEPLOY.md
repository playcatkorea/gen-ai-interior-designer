# ?? Render.com 개별 ?�비??배포 (무료)

## ?�� ?�략

Blueprint ?�??**개별 Web Service**�?배포?�면 무료 ?�어�??�용?????�습?�다!

---

## ?�� 배포 ?�계

### 1?�계: Backend ?�비???�성

**?�이지**: https://dashboard.render.com/create?type=web

#### Backend ?�정:

| ??�� | �?|
|------|-----|
| **Name** | `gen-ai-interior-backend` |
| **Root Directory** | `backend` |
| **Environment** | `Python 3` |
| **Build Command** | `pip install poetry && poetry install` |
| **Start Command** | `poetry run uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Instance Type** | �?**Free** |

#### Backend ?�경 변??

| Key | Value |
|-----|-------|
| `GOOGLE_API_KEY` | `AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU` |
| `YOUTUBE_API_KEY` | `AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A` |
| `PYTHON_VERSION` | `3.12.0` |
| `ALLOWED_ORIGINS` | `*` |

**"Create Web Service" ?�릭!**

---

### 2?�계: Frontend ?�비???�성

**Backend 배포가 ?�료?�면** Frontend�??�성?�니??

**?�이지**: https://dashboard.render.com/create?type=web

#### Frontend ?�정:

| ??�� | �?|
|------|-----|
| **Name** | `gen-ai-interior-frontend` |
| **Root Directory** | `frontend` |
| **Environment** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npx serve -s dist -l $PORT` |
| **Instance Type** | �?**Free** |

#### Frontend ?�경 변??

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://gen-ai-interior-backend.onrender.com` |

**"Create Web Service" ?�릭!**

---

## ?�️ 배포 ?�간

- Backend: 5-7�?- Frontend: 3-5�?- **�??�요: 10-12�?*

---

## ?�� 배포 ?�료 ??URL

- **Frontend**: `https://gen-ai-interior-frontend.onrender.com`
- **Backend API**: `https://gen-ai-interior-backend.onrender.com/docs`

---

## ?�� 비용

- ??**100% 무료**
- ??Free Instance Type ?�택
- ????750?�간 = ?�실??무제??
---

## ?�️ 주의?�항

1. **?�립 모드**: 15�??�안 ?�청 ?�으�??�립
2. **콜드 ?��???*: �??�청 ??30�??��?3. **Backend 먼�? 배포**: Frontend가 Backend URL ?�요

---

## ?�� ?�료!

개별 ?�비?�로 배포?�면 결제 ?�보 ?�이 무료�??�용 가??

