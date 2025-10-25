# Render.com 무료 배포 가?�드 (?�동)

**중요**: Render API?� Blueprint??무료 ?�어�?지?�하지 ?�습?�다.  
무료�?배포?�려�??�?�보?�에???�동?�로 ?�성?�야 ?�니??

---

## 1?�계: Render ?�?�보???�속

**URL**: https://dashboard.render.com/

로그??계정: `playcatkr@gmail.com`

---

## 2?�계: Backend ?�비???�성

### 2-1. New Web Service ?�릭
1. ?�?�보???�측 ?�단 **"New +"** 버튼 ?�릭
2. **"Web Service"** ?�택

### 2-2. GitHub ?�결
1. **"Connect account"** ?�릭?�여 GitHub ?�결
2. ?�?�소 ?�택: `playcatkorea/gen-ai-interior-designer`
3. **"Connect"** ?�릭

### 2-3. Backend ?�정 ?�력

```
Name: gen-ai-interior-backend
Region: Singapore (가??가까운 지??
Branch: main
Root Directory: backend
Runtime: Python 3
Build Command: pip install poetry && poetry install
Start Command: poetry run uvicorn main:app --host 0.0.0.0 --port $PORT
Instance Type: Free (?�택!)
```

### 2-4. ?�경 변??추�?

**"Environment"** ?�션?�서 **"Add Environment Variable"** ?�릭 ???�래 4�?추�?:

| Key | Value |
|-----|-------|
| `GOOGLE_API_KEY` | `AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU` |
| `YOUTUBE_API_KEY` | `AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A` |
| `PYTHON_VERSION` | `3.12.0` |
| `ALLOWED_ORIGINS` | `*` |

### 2-5. ?�성 ?�료
1. **"Create Web Service"** ?�릭
2. 배포 ?�작 (??5-10�??�요)
3. **Backend URL 복사** (?? `https://gen-ai-interior-backend.onrender.com`)

---

## 3?�계: Frontend ?�비???�성

### 3-1. New Web Service ?�릭
1. ?�?�보?�로 ?�아가??**"New +"** ??**"Web Service"** ?�릭

### 3-2. 같�? GitHub ?�?�소 ?�택
1. ?�?�소: `playcatkorea/gen-ai-interior-designer`
2. **"Connect"** ?�릭

### 3-3. Frontend ?�정 ?�력

```
Name: gen-ai-interior-frontend
Region: Singapore
Branch: main
Root Directory: frontend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npx serve -s dist -p $PORT
Instance Type: Free (?�택!)
```

### 3-4. ?�경 변??추�?

**"Environment"** ?�션?�서 ?�경 변??1�?추�?:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://gen-ai-interior-backend.onrender.com` (2-5?�서 복사??Backend URL) |

### 3-5. ?�성 ?�료
1. **"Create Web Service"** ?�릭
2. 배포 ?�작 (??3-5�??�요)
3. **Frontend URL 복사** (?? `https://gen-ai-interior-frontend.onrender.com`)

---

## 4?�계: 배포 ?�료 ?�인

### Backend ?�인
```bash
curl https://gen-ai-interior-backend.onrender.com/
```

**?�상 ?�답**:
```json
{
  "status": "running",
  "message": "Gen AI Home Interior Designer API",
  "version": "1.0.0",
  "docs": "/docs"
}
```

### Frontend ?�인
브라?��??�서 ?�속:
```
https://gen-ai-interior-frontend.onrender.com
```

---

## 주의?�항

### 무료 ?�어 ?�약?�항
- **15�?비활?????�동 ?�립 모드**
- �??�청 ???�시??(??30�?1�??�요)
- ??750?�간 무료 ?�공 (????= 720?�간?��?�?충분??
- 빌드 ?�간 ?�한: 90�?(?�재 ?�로?�트??문제 ?�음)

### CORS ?�정
Backend??`ALLOWED_ORIGINS=*`??개발?�입?�다.  
?�로?�션?�서???�음�?같이 변경하?�요:

```
ALLOWED_ORIGINS=https://gen-ai-interior-frontend.onrender.com
```

### 배포 로그 ?�인
- ?�?�보?????�비???�릭 ??**"Logs"** ??- ?�류 발생 ???�기???�인 가??
---

## 배포 링크 (배포 ???�데?�트)

**Frontend**: https://gen-ai-interior-frontend.onrender.com  
**Backend**: https://gen-ai-interior-backend.onrender.com  
**API 문서**: https://gen-ai-interior-backend.onrender.com/docs

---

## GitHub ?�?�소

https://github.com/playcatkorea/gen-ai-interior-designer

---

**배포 ?�료까�? ??10-15�??�요?�니??**  
**모든 ?�경 변?��? ?�동?�로 ?�력?�어 ?�으므�?복사-붙여?�기�??�면 ?�니??**
