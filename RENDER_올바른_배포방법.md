# Render.com ?�바�?무료 배포 방법

## ???�못???�택
- **Static Site** ??Backend???�용?�면 ?�됨!
- Static Site??HTML/CSS/JS 같�? ?�적 ?�일 ?�용

## ???�바�??�택

### Backend??**"New Web Service"** ?�택?�야 ?�니??

### Frontend??**"New Web Service"** ?�는 **"New Static Site"** ????가??- Web Service 추천 (npx serve ?�용)

---

## ?�시 ?�작?�기

### 1?�계: ?�재 ?�면 ?�기
- 좌측 ?�단 X 버튼 ?�릭?�거??- ?�로가�?
### 2?�계: Backend ?�바르게 ?�성

#### ?�?�보?�에??"New +" ?�릭
??**"Web Service"** ?�택 (Static Site ?�님!)

#### GitHub ?�결
- ?�?�소: `playcatkorea/gen-ai-interior-designer`
- "Connect" ?�릭

#### ?�정 ?�력

```
Name: gen-ai-interior-backend
Region: Singapore (?�는 Oregon)
Branch: main
Root Directory: backend
Runtime: Python 3
Build Command: pip install poetry && poetry install
Start Command: poetry run uvicorn main:app --host 0.0.0.0 --port $PORT
Instance Type: Free ??�??�인!
```

#### ?�경 변??추�? (4�?

"Add Environment Variable" ?�릭?�여 ?�래 추�?:

```
GOOGLE_API_KEY = AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU
YOUTUBE_API_KEY = AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A
PYTHON_VERSION = 3.12.0
ALLOWED_ORIGINS = *
```

#### ?�성
"Create Web Service" ?�릭 ??배포 ?�작 (5-10�?

---

### 3?�계: Frontend ?�성

#### ?�시 "New +" ??"Web Service" ?�릭

#### 같�? ?�?�소 ?�택
- `playcatkorea/gen-ai-interior-designer`

#### ?�정 ?�력

```
Name: gen-ai-interior-frontend
Region: Singapore (Backend?� 같�? 지??
Branch: main
Root Directory: frontend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npx serve -s dist -p $PORT
Instance Type: Free ??�??�인!
```

#### ?�경 변??추�? (1�?

Backend 배포 ?�료 ??URL 복사?�서:

```
VITE_API_URL = https://gen-ai-interior-backend.onrender.com
```
(?�제 Backend URL�?교체)

#### ?�성
"Create Web Service" ?�릭

---

## ?�심 ?�약

| 구분 | ?�택 | ?�유 |
|------|------|------|
| Backend | **Web Service** | FastAPI ?�버 ?�행 ?�요 |
| Frontend | **Web Service** | npx serve�??�스??|

**Static Site???�용?��? ?�습?�다!**

---

## 배포 ?�서
1. Backend Web Service ?�성 ??배포 ?�료 ?��?2. Backend URL 복사
3. Frontend Web Service ?�성 (Backend URL???�경변?�에 ?�력)
4. Frontend 배포 ?�료 ?��?5. ?�속 ?�스??
?�요?�간: �?**15-20�?*
