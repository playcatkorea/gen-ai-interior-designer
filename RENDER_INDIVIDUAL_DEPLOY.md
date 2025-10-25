# ?? Render.com ê°œë³„ ?œë¹„??ë°°í¬ (ë¬´ë£Œ)

## ?’¡ ?„ëµ

Blueprint ?€??**ê°œë³„ Web Service**ë¡?ë°°í¬?˜ë©´ ë¬´ë£Œ ?°ì–´ë¥??¬ìš©?????ˆìŠµ?ˆë‹¤!

---

## ?“‹ ë°°í¬ ?¨ê³„

### 1?¨ê³„: Backend ?œë¹„???ì„±

**?˜ì´ì§€**: https://dashboard.render.com/create?type=web

#### Backend ?¤ì •:

| ??ª© | ê°?|
|------|-----|
| **Name** | `gen-ai-interior-backend` |
| **Root Directory** | `backend` |
| **Environment** | `Python 3` |
| **Build Command** | `pip install poetry && poetry install` |
| **Start Command** | `poetry run uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Instance Type** | â­?**Free** |

#### Backend ?˜ê²½ ë³€??

| Key | Value |
|-----|-------|
| `GOOGLE_API_KEY` | `AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU` |
| `YOUTUBE_API_KEY` | `AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A` |
| `PYTHON_VERSION` | `3.12.0` |
| `ALLOWED_ORIGINS` | `*` |

**"Create Web Service" ?´ë¦­!**

---

### 2?¨ê³„: Frontend ?œë¹„???ì„±

**Backend ë°°í¬ê°€ ?„ë£Œ?˜ë©´** Frontendë¥??ì„±?©ë‹ˆ??

**?˜ì´ì§€**: https://dashboard.render.com/create?type=web

#### Frontend ?¤ì •:

| ??ª© | ê°?|
|------|-----|
| **Name** | `gen-ai-interior-frontend` |
| **Root Directory** | `frontend` |
| **Environment** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npx serve -s dist -l $PORT` |
| **Instance Type** | â­?**Free** |

#### Frontend ?˜ê²½ ë³€??

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://gen-ai-interior-backend.onrender.com` |

**"Create Web Service" ?´ë¦­!**

---

## ?±ï¸ ë°°í¬ ?œê°„

- Backend: 5-7ë¶?- Frontend: 3-5ë¶?- **ì´??Œìš”: 10-12ë¶?*

---

## ?“± ë°°í¬ ?„ë£Œ ??URL

- **Frontend**: `https://gen-ai-interior-frontend.onrender.com`
- **Backend API**: `https://gen-ai-interior-backend.onrender.com/docs`

---

## ?’° ë¹„ìš©

- ??**100% ë¬´ë£Œ**
- ??Free Instance Type ? íƒ
- ????750?œê°„ = ?¬ì‹¤??ë¬´ì œ??
---

## ? ï¸ ì£¼ì˜?¬í•­

1. **?¬ë¦½ ëª¨ë“œ**: 15ë¶??™ì•ˆ ?”ì²­ ?†ìœ¼ë©??¬ë¦½
2. **ì½œë“œ ?¤í???*: ì²??”ì²­ ??30ì´??€ê¸?3. **Backend ë¨¼ì? ë°°í¬**: Frontendê°€ Backend URL ?„ìš”

---

## ?‰ ?„ë£Œ!

ê°œë³„ ?œë¹„?¤ë¡œ ë°°í¬?˜ë©´ ê²°ì œ ?•ë³´ ?†ì´ ë¬´ë£Œë¡??¬ìš© ê°€??

