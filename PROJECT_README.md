# 🏡 Gen AI Home Interior Designer

AI 기반 인테리어/익스테리어 디자인 플랫폼

[![Deploy Status](https://img.shields.io/badge/deploy-success-brightgreen)](https://gen-ai-interior-frontend.onrender.com)
[![Backend](https://img.shields.io/badge/backend-FastAPI-009688)](https://gen-ai-interior-backend.onrender.com)
[![Frontend](https://img.shields.io/badge/frontend-React-61DAFB)](https://gen-ai-interior-frontend.onrender.com)
[![AI Model](https://img.shields.io/badge/AI-Google%20Gemini%202.0-4285F4)](https://ai.google.dev/gemini-api)

---

## 🌟 주요 기능

### ✨ **AI 디자인 생성**
- Google Gemini 2.0 Flash 기반 이미지 재디자인
- 실내/실외 공간 자동 인식 및 변환
- 스타일별 맞춤 디자인 (모던, 미니멀, 러스틱 등)

### 🎯 **실시간 추천 시스템**
- **YouTube 튜토리얼**: 스타일별 DIY 영상 자동 추천
- **디자인 팁**: AI 전문가 조언
- **컬러 팔레트**: Primary/Accent 색상 제안

### 📁 **프로젝트 관리** (Supabase)
- 디자인 저장 및 관리
- 검색 및 필터링
- Grid/List 뷰 전환

### 🌐 **다국어 및 테마**
- 한국어/영어 지원
- 다크모드/라이트모드
- 반응형 디자인 (모바일/태블릿/데스크톱)

---

## 🚀 라이브 데모

- **프론트엔드**: https://gen-ai-interior-frontend.onrender.com
- **백엔드 API 문서**: https://gen-ai-interior-backend.onrender.com/docs

---

## 📸 이미지 업로드 가이드

### **지원 형식**
- **JPEG** - `.jpg`, `.jpeg` ✅
- **PNG** - `.png` ✅
- **WebP** - `.webp` ✅
- **HEIC** - `.heic` ✅ (Apple 기기)
- **HEIF** - `.heif` ✅ (Apple 기기)

### **파일 크기**
- **최대**: 10MB
- **권장**: 2-5MB

### **권장 사양**
- **해상도**: 1920×1080px (Full HD) 권장
- **최소**: 800×600px
- **최대**: 4K (3840×2160px)

### **촬영 팁**
1. ✅ **밝은 조명**: 낮 시간 또는 모든 조명 켜기
2. ✅ **전체 공간**: 벽, 천장, 바닥 모두 포함
3. ✅ **수평 구도**: 서 있는 높이에서 촬영
4. ✅ **정리정돈**: 불필요한 물건 치우기
5. ❌ **피할 것**: 흐림, 역광, 극단적 각도, 파노라마

📘 **자세한 가이드**: [IMAGE_UPLOAD_GUIDE.md](IMAGE_UPLOAD_GUIDE.md)

---

## 🛠️ 기술 스택

### **Frontend**
- React 18
- Vite 6
- React Router DOM 7
- Ant Design 5
- Framer Motion 12
- Axios

### **Backend**
- Python 3.12
- FastAPI
- Google Gemini 2.0 Flash
- Supabase (PostgreSQL)
- YouTube Data API v3

### **배포**
- Frontend: Render (Static Site)
- Backend: Render (Web Service)
- Database: Supabase (Cloud PostgreSQL)

---

## 📦 로컬 설치 및 실행

### **1. 사전 요구사항**
- Node.js 18+
- Python 3.12+
- npm 또는 yarn
- pip

### **2. 저장소 클론**
```bash
git clone https://github.com/playcatkorea/gen-ai-interior-designer.git
cd gen-ai-interior-designer
```

### **3. 백엔드 설정**

#### **가상환경 생성 및 활성화**
```bash
cd backend

# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### **의존성 설치**
```bash
pip install -r requirements.txt
```

#### **환경 변수 설정**
`.env` 파일 생성:
```bash
# 필수
GEMINI_API_KEY=your_google_gemini_api_key

# 선택 (YouTube 추천용)
YOUTUBE_API_KEY=your_youtube_api_key

# 선택 (프로젝트 저장용)
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

**API 키 발급**:
- **Gemini API**: https://aistudio.google.com/app/apikey
- **YouTube API**: https://console.cloud.google.com
- **Supabase**: https://supabase.com

#### **백엔드 실행**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

백엔드 실행 확인: http://localhost:8000/docs

### **4. 프론트엔드 설정**

#### **의존성 설치**
```bash
cd ../frontend
npm install
```

#### **환경 변수 설정**
`.env` 파일 생성:
```bash
VITE_API_URL=http://localhost:8000
```

#### **프론트엔드 실행**
```bash
npm run dev
```

프론트엔드 실행 확인: http://localhost:5173

---

## 🎯 사용 방법

### **1. 홈 페이지 - 디자인 생성**
1. **이미지 업로드**
   - 드래그 앤 드롭 또는 클릭하여 선택
   - 지원 형식: JPG, PNG, WebP, HEIC, HEIF
   - 최대 10MB

2. **디자인 옵션 선택**
   - **디자인 타입**: 실내 / 실외
   - **공간 타입**: 거실, 침실, 주방, 욕실, 발코니, 정원
   - **스타일**: 모던, 미니멀, 러스틱, 보헤미안, 클래식
   - **색상**: 배경색, 전경색 (선택사항)
   - **추가 지시사항**: 자유 입력 (선택사항)

3. **디자인 생성** 버튼 클릭
   - AI가 이미지 분석 및 재디자인 (약 10-30초)
   - 결과 이미지 및 설명 표시

4. **추천 정보 확인**
   - **디자인 팁**: 전문가 조언 3가지
   - **컬러 팔레트**: Primary 3색 + Accent 2색
   - **YouTube 튜토리얼**: 관련 영상 3개

5. **저장 또는 다운로드**
   - **저장**: 프로젝트 이름 입력 → 내 프로젝트에 저장
   - **다운로드**: 이미지를 로컬에 저장

### **2. 내 프로젝트 - 관리**
1. 저장된 프로젝트 목록 확인
2. **검색**: 프로젝트 이름으로 검색
3. **필터링**: 디자인 타입, 스타일별 필터
4. **뷰 전환**: Grid (격자) ↔ List (목록)
5. **삭제**: 불필요한 프로젝트 제거

---

## 📚 문서

- **배포 성공 리포트**: [DEPLOYMENT_SUCCESS.md](DEPLOYMENT_SUCCESS.md)
- **기능 완성 문서**: [FEATURE_COMPLETE.md](FEATURE_COMPLETE.md)
- **이미지 업로드 가이드**: [IMAGE_UPLOAD_GUIDE.md](IMAGE_UPLOAD_GUIDE.md)

---

## 🔧 API 엔드포인트

### **디자인 생성**
```http
POST /api/try-on
Content-Type: multipart/form-data

FormData:
- place_image: File
- design_type: string
- room_type: string
- style: string
- background_color: string
- foreground_color: string
- instructions: string (optional)
```

### **YouTube 추천**
```http
GET /api/recommendations/youtube?style={style}&room_type={room_type}&max_results=3
```

### **디자인 팁**
```http
GET /api/recommendations/design-tips?style={style}&room_type={room_type}
```

### **컬러 팔레트**
```http
GET /api/recommendations/color-palette?style={style}
```

### **프로젝트 관리**
```http
GET /api/projects              # 목록 조회
POST /api/projects             # 생성
GET /api/projects/{id}         # 상세 조회
PATCH /api/projects/{id}       # 수정
DELETE /api/projects/{id}      # 삭제
```

**전체 API 문서**: https://gen-ai-interior-backend.onrender.com/docs

---

## 🐛 문제 해결

### **이미지 업로드 오류**
**"이미지만 업로드 가능합니다!"**
- 지원 형식 확인: JPG, PNG, WebP, HEIC, HEIF만 가능
- PDF, 동영상 파일은 불가

**"이미지는 10MB보다 작아야 합니다!"**
- 파일 크기 확인
- 온라인 압축 도구 사용: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)

### **디자인 생성 실패**
- 더 밝고 선명한 사진으로 재촬영
- 전체 공간이 보이는 사진 사용
- 몇 분 후 다시 시도

### **프로젝트 저장 실패**
- **503 오류**: Supabase 키가 설정되지 않음
  - 로컬에서 이미지 다운로드 사용
  - 관리자에게 문의

---

## 🤝 기여

이 프로젝트는 개인 프로젝트이지만 제안 및 피드백을 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스로 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 👤 작성자

**playcatkorea**
- GitHub: [@playcatkorea](https://github.com/playcatkorea)
- 프로젝트 링크: https://github.com/playcatkorea/gen-ai-interior-designer

---

## 🙏 감사의 글

- **Google Gemini**: 강력한 AI 이미지 생성 모델
- **Ant Design**: 아름다운 UI 컴포넌트
- **Framer Motion**: 부드러운 애니메이션
- **Supabase**: 간편한 백엔드 솔루션
- **Render**: 무료 배포 플랫폼

---

**Happy Designing! 🏡✨**
