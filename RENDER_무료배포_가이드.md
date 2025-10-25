# Render.com ë¬´ë£Œ ë°°í¬ ê°€?´ë“œ (?˜ë™)

**ì¤‘ìš”**: Render API?€ Blueprint??ë¬´ë£Œ ?°ì–´ë¥?ì§€?í•˜ì§€ ?ŠìŠµ?ˆë‹¤.  
ë¬´ë£Œë¡?ë°°í¬?˜ë ¤ë©??€?œë³´?œì—???˜ë™?¼ë¡œ ?ì„±?´ì•¼ ?©ë‹ˆ??

---

## 1?¨ê³„: Render ?€?œë³´???‘ì†

**URL**: https://dashboard.render.com/

ë¡œê·¸??ê³„ì •: `playcatkr@gmail.com`

---

## 2?¨ê³„: Backend ?œë¹„???ì„±

### 2-1. New Web Service ?´ë¦­
1. ?€?œë³´???°ì¸¡ ?ë‹¨ **"New +"** ë²„íŠ¼ ?´ë¦­
2. **"Web Service"** ? íƒ

### 2-2. GitHub ?°ê²°
1. **"Connect account"** ?´ë¦­?˜ì—¬ GitHub ?°ê²°
2. ?€?¥ì†Œ ? íƒ: `playcatkorea/gen-ai-interior-designer`
3. **"Connect"** ?´ë¦­

### 2-3. Backend ?¤ì • ?…ë ¥

```
Name: gen-ai-interior-backend
Region: Singapore (ê°€??ê°€ê¹Œìš´ ì§€??
Branch: main
Root Directory: backend
Runtime: Python 3
Build Command: pip install poetry && poetry install
Start Command: poetry run uvicorn main:app --host 0.0.0.0 --port $PORT
Instance Type: Free (? íƒ!)
```

### 2-4. ?˜ê²½ ë³€??ì¶”ê?

**"Environment"** ?¹ì…˜?ì„œ **"Add Environment Variable"** ?´ë¦­ ???„ë˜ 4ê°?ì¶”ê?:

| Key | Value |
|-----|-------|
| `GOOGLE_API_KEY` | `AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU` |
| `YOUTUBE_API_KEY` | `AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A` |
| `PYTHON_VERSION` | `3.12.0` |
| `ALLOWED_ORIGINS` | `*` |

### 2-5. ?ì„± ?„ë£Œ
1. **"Create Web Service"** ?´ë¦­
2. ë°°í¬ ?œì‘ (??5-10ë¶??Œìš”)
3. **Backend URL ë³µì‚¬** (?? `https://gen-ai-interior-backend.onrender.com`)

---

## 3?¨ê³„: Frontend ?œë¹„???ì„±

### 3-1. New Web Service ?´ë¦­
1. ?€?œë³´?œë¡œ ?Œì•„ê°€??**"New +"** ??**"Web Service"** ?´ë¦­

### 3-2. ê°™ì? GitHub ?€?¥ì†Œ ? íƒ
1. ?€?¥ì†Œ: `playcatkorea/gen-ai-interior-designer`
2. **"Connect"** ?´ë¦­

### 3-3. Frontend ?¤ì • ?…ë ¥

```
Name: gen-ai-interior-frontend
Region: Singapore
Branch: main
Root Directory: frontend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npx serve -s dist -p $PORT
Instance Type: Free (? íƒ!)
```

### 3-4. ?˜ê²½ ë³€??ì¶”ê?

**"Environment"** ?¹ì…˜?ì„œ ?˜ê²½ ë³€??1ê°?ì¶”ê?:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://gen-ai-interior-backend.onrender.com` (2-5?ì„œ ë³µì‚¬??Backend URL) |

### 3-5. ?ì„± ?„ë£Œ
1. **"Create Web Service"** ?´ë¦­
2. ë°°í¬ ?œì‘ (??3-5ë¶??Œìš”)
3. **Frontend URL ë³µì‚¬** (?? `https://gen-ai-interior-frontend.onrender.com`)

---

## 4?¨ê³„: ë°°í¬ ?„ë£Œ ?•ì¸

### Backend ?•ì¸
```bash
curl https://gen-ai-interior-backend.onrender.com/
```

**?ˆìƒ ?‘ë‹µ**:
```json
{
  "status": "running",
  "message": "Gen AI Home Interior Designer API",
  "version": "1.0.0",
  "docs": "/docs"
}
```

### Frontend ?•ì¸
ë¸Œë¼?°ì??ì„œ ?‘ì†:
```
https://gen-ai-interior-frontend.onrender.com
```

---

## ì£¼ì˜?¬í•­

### ë¬´ë£Œ ?°ì–´ ?œì•½?¬í•­
- **15ë¶?ë¹„í™œ?????ë™ ?¬ë¦½ ëª¨ë“œ**
- ì²??”ì²­ ???¬ì‹œ??(??30ì´?1ë¶??Œìš”)
- ??750?œê°„ ë¬´ë£Œ ?œê³µ (????= 720?œê°„?´ë?ë¡?ì¶©ë¶„??
- ë¹Œë“œ ?œê°„ ?œí•œ: 90ì´?(?„ì¬ ?„ë¡œ?íŠ¸??ë¬¸ì œ ?†ìŒ)

### CORS ?¤ì •
Backend??`ALLOWED_ORIGINS=*`??ê°œë°œ?©ì…?ˆë‹¤.  
?„ë¡œ?•ì…˜?ì„œ???¤ìŒê³?ê°™ì´ ë³€ê²½í•˜?¸ìš”:

```
ALLOWED_ORIGINS=https://gen-ai-interior-frontend.onrender.com
```

### ë°°í¬ ë¡œê·¸ ?•ì¸
- ?€?œë³´?????œë¹„???´ë¦­ ??**"Logs"** ??- ?¤ë¥˜ ë°œìƒ ???¬ê¸°???•ì¸ ê°€??
---

## ë°°í¬ ë§í¬ (ë°°í¬ ???…ë°?´íŠ¸)

**Frontend**: https://gen-ai-interior-frontend.onrender.com  
**Backend**: https://gen-ai-interior-backend.onrender.com  
**API ë¬¸ì„œ**: https://gen-ai-interior-backend.onrender.com/docs

---

## GitHub ?€?¥ì†Œ

https://github.com/playcatkorea/gen-ai-interior-designer

---

**ë°°í¬ ?„ë£Œê¹Œì? ??10-15ë¶??Œìš”?©ë‹ˆ??**  
**ëª¨ë“  ?˜ê²½ ë³€?˜ê? ?ë™?¼ë¡œ ?…ë ¥?˜ì–´ ?ˆìœ¼ë¯€ë¡?ë³µì‚¬-ë¶™ì—¬?£ê¸°ë§??˜ë©´ ?©ë‹ˆ??**
