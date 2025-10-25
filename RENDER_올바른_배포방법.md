# Render.com ?¬ë°”ë¥?ë¬´ë£Œ ë°°í¬ ë°©ë²•

## ???˜ëª»??? íƒ
- **Static Site** ??Backend???¬ìš©?˜ë©´ ?ˆë¨!
- Static Site??HTML/CSS/JS ê°™ì? ?•ì  ?Œì¼ ?„ìš©

## ???¬ë°”ë¥?? íƒ

### Backend??**"New Web Service"** ? íƒ?´ì•¼ ?©ë‹ˆ??

### Frontend??**"New Web Service"** ?ëŠ” **"New Static Site"** ????ê°€??- Web Service ì¶”ì²œ (npx serve ?¬ìš©)

---

## ?¤ì‹œ ?œì‘?˜ê¸°

### 1?¨ê³„: ?„ì¬ ?”ë©´ ?«ê¸°
- ì¢Œì¸¡ ?ë‹¨ X ë²„íŠ¼ ?´ë¦­?˜ê±°??- ?¤ë¡œê°€ê¸?
### 2?¨ê³„: Backend ?¬ë°”ë¥´ê²Œ ?ì„±

#### ?€?œë³´?œì—??"New +" ?´ë¦­
??**"Web Service"** ? íƒ (Static Site ?„ë‹˜!)

#### GitHub ?°ê²°
- ?€?¥ì†Œ: `playcatkorea/gen-ai-interior-designer`
- "Connect" ?´ë¦­

#### ?¤ì • ?…ë ¥

```
Name: gen-ai-interior-backend
Region: Singapore (?ëŠ” Oregon)
Branch: main
Root Directory: backend
Runtime: Python 3
Build Command: pip install poetry && poetry install
Start Command: poetry run uvicorn main:app --host 0.0.0.0 --port $PORT
Instance Type: Free ??ê¼??•ì¸!
```

#### ?˜ê²½ ë³€??ì¶”ê? (4ê°?

"Add Environment Variable" ?´ë¦­?˜ì—¬ ?„ë˜ ì¶”ê?:

```
GOOGLE_API_KEY = AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU
YOUTUBE_API_KEY = AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A
PYTHON_VERSION = 3.12.0
ALLOWED_ORIGINS = *
```

#### ?ì„±
"Create Web Service" ?´ë¦­ ??ë°°í¬ ?œì‘ (5-10ë¶?

---

### 3?¨ê³„: Frontend ?ì„±

#### ?¤ì‹œ "New +" ??"Web Service" ?´ë¦­

#### ê°™ì? ?€?¥ì†Œ ? íƒ
- `playcatkorea/gen-ai-interior-designer`

#### ?¤ì • ?…ë ¥

```
Name: gen-ai-interior-frontend
Region: Singapore (Backend?€ ê°™ì? ì§€??
Branch: main
Root Directory: frontend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npx serve -s dist -p $PORT
Instance Type: Free ??ê¼??•ì¸!
```

#### ?˜ê²½ ë³€??ì¶”ê? (1ê°?

Backend ë°°í¬ ?„ë£Œ ??URL ë³µì‚¬?´ì„œ:

```
VITE_API_URL = https://gen-ai-interior-backend.onrender.com
```
(?¤ì œ Backend URLë¡?êµì²´)

#### ?ì„±
"Create Web Service" ?´ë¦­

---

## ?µì‹¬ ?”ì•½

| êµ¬ë¶„ | ? íƒ | ?´ìœ  |
|------|------|------|
| Backend | **Web Service** | FastAPI ?œë²„ ?¤í–‰ ?„ìš” |
| Frontend | **Web Service** | npx serveë¡??¸ìŠ¤??|

**Static Site???¬ìš©?˜ì? ?ŠìŠµ?ˆë‹¤!**

---

## ë°°í¬ ?œì„œ
1. Backend Web Service ?ì„± ??ë°°í¬ ?„ë£Œ ?€ê¸?2. Backend URL ë³µì‚¬
3. Frontend Web Service ?ì„± (Backend URL???˜ê²½ë³€?˜ì— ?…ë ¥)
4. Frontend ë°°í¬ ?„ë£Œ ?€ê¸?5. ?‘ì† ?ŒìŠ¤??
?Œìš”?œê°„: ì´?**15-20ë¶?*
