# ?? Render.com ë°°í¬ ?„ì „ ê°€?´ë“œ (ë§í¬ ?¬í•¨)

## ?“‹ ë°°í¬ ?œì„œ

### 1ï¸âƒ£ Backend ?œë¹„???ì„± (ë¨¼ì?!)

**?”— ë°°í¬ ë§í¬**: https://dashboard.render.com/create?type=web

#### ???¤ì • ?•ë³´ (ë³µì‚¬?´ì„œ ?¬ìš©)

**Repository**:
- GitHub ?°ê²°: `playcatkorea/gen-ai-interior-designer` ? íƒ
- Branch: `main`

**Basic ?¤ì •**:
```
Name: gen-ai-interior-backend
Root Directory: backend
Environment: Python 3
Region: Singapore (ê°€??ê°€ê¹Œì?)
Branch: main
```

**Build & Deploy ?¤ì •**:
```
Build Command: pip install poetry && poetry install
Start Command: poetry run uvicorn main:app --host 0.0.0.0 --port $PORT
```

**Instance Type**:
```
â­?Free (ì¤‘ìš”!)
```

**?˜ê²½ ë³€??(Advanced ?´ë¦­)**:

| Key | Value (ë³µì‚¬) |
|-----|--------------|
| `GOOGLE_API_KEY` | `AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU` |
| `YOUTUBE_API_KEY` | `AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A` |
| `PYTHON_VERSION` | `3.12.0` |
| `ALLOWED_ORIGINS` | `*` |

**"Create Web Service" ë²„íŠ¼ ?´ë¦­!**

?±ï¸ **ë°°í¬ ?œê°„: 5-7ë¶?*

---

### 2ï¸âƒ£ Frontend ?œë¹„???ì„± (Backend ?„ë£Œ ??

**Backend URL ?•ì¸**:
```
https://gen-ai-interior-backend.onrender.com
```
(Backend ë°°í¬ ?„ë£Œ ????URL??ë³µì‚¬)

**?”— ë°°í¬ ë§í¬**: https://dashboard.render.com/create?type=web

#### ???¤ì • ?•ë³´ (ë³µì‚¬?´ì„œ ?¬ìš©)

**Repository**:
- ê°™ì? ?ˆí¬ì§€? ë¦¬: `playcatkorea/gen-ai-interior-designer`
- Branch: `main`

**Basic ?¤ì •**:
```
Name: gen-ai-interior-frontend
Root Directory: frontend
Environment: Node
Region: Singapore
Branch: main
```

**Build & Deploy ?¤ì •**:
```
Build Command: npm install && npm run build
Start Command: npx serve -s dist -l $PORT
```

**Instance Type**:
```
â­?Free (ì¤‘ìš”!)
```

**?˜ê²½ ë³€??(Advanced ?´ë¦­)**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://gen-ai-interior-backend.onrender.com` |

(?„ì˜ URL?€ Backend ë°°í¬ ?„ë£Œ ???¤ì œ URLë¡?ë³€ê²?

**"Create Web Service" ë²„íŠ¼ ?´ë¦­!**

?±ï¸ **ë°°í¬ ?œê°„: 3-5ë¶?*

---

## ?“± ë°°í¬ ?„ë£Œ ??URL

??**Frontend (?¬ìš©?ìš©)**:
```
https://gen-ai-interior-frontend.onrender.com
```

??**Backend API ë¬¸ì„œ**:
```
https://gen-ai-interior-backend.onrender.com/docs
```

---

## ?’° ë¹„ìš©

- ??**100% ë¬´ë£Œ**
- ??Free Instance Type ? íƒ
- ????750?œê°„ ë¬´ë£Œ = ?¬ì‹¤??ë¬´ì œ??- ??? ìš©ì¹´ë“œ ë¶ˆí•„??
---

## ? ï¸ ì£¼ì˜?¬í•­

### ?¬ë¦½ ëª¨ë“œ
- 15ë¶??™ì•ˆ ?”ì²­ ?†ìœ¼ë©??ë™ ?¬ë¦½
- ì²??”ì²­ ??30ì´??€ê¸?(ê¹¨ì–´??
- ?´í›„ ?•ìƒ ?ë„

### ?œì„œ ì¤‘ìš”
1. ??**Backend ë¨¼ì?** ë°°í¬
2. ??Backend URL ?•ì¸
3. ??**Frontend ?˜ì¤‘??* ë°°í¬ (Backend URL ?¬ìš©)

---

## ?”§ ë¬¸ì œ ?´ê²°

### "Build failed"
??Logs ??—???ëŸ¬ ?•ì¸

### "?”ì???ì„± ?¤íŒ¨"
??Backend ?˜ê²½ ë³€?˜ì—??`GOOGLE_API_KEY` ?•ì¸

### CORS ?ëŸ¬
??Backend ?˜ê²½ ë³€?˜ì— `ALLOWED_ORIGINS=*` ?ˆëŠ”ì§€ ?•ì¸

### "ê²°ì œ ?„ìš”" ë©”ì‹œì§€
??Instance Type??**Free**ë¡?? íƒ?ˆëŠ”ì§€ ?•ì¸

---

## ?“ ?„ì?ë§?
- **Render.com ë¬¸ì„œ**: https://render.com/docs
- **Discord ì»¤ë??ˆí‹°**: https://discord.gg/render
- **GitHub ?ˆí¬ì§€? ë¦¬**: https://github.com/playcatkorea/gen-ai-interior-designer

---

## ?‰ ?„ë£Œ ì²´í¬ë¦¬ìŠ¤??
- [ ] Backend ?œë¹„???ì„± ?„ë£Œ
- [ ] Backend ë°°í¬ ?„ë£Œ (5-7ë¶?
- [ ] Backend URL ?•ì¸
- [ ] Frontend ?œë¹„???ì„± ?„ë£Œ
- [ ] Frontend ë°°í¬ ?„ë£Œ (3-5ë¶?
- [ ] Frontend URLë¡??‘ì† ?ŒìŠ¤??- [ ] ?´ë?ì§€ ?…ë¡œ??& AI ?”ì???ì„± ?ŒìŠ¤??- [ ] ì¹œêµ¬?¤ì—ê²?URL ê³µìœ ! ??

