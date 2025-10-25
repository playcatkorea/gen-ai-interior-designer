# MCP 통합 가이드 - Gen AI Home Interior Designer

## 🎯 프로젝트 개요
Gen AI Home Interior Designer는 Google Gemini API를 사용하여 실제 공간 사진을 AI로 재디자인하는 서비스입니다.

---

## 🛠️ 활용 가능한 MCP 서버 (15개)

### 1️⃣ **핵심 개발 도구**
- ✅ **OpenAI MCP** - GPT-4o를 활용한 디자인 제안 보강
- ✅ **Sequential Thinking** - 복잡한 디자인 결정 논리 구현
- ✅ **Git MCP Server** - 버전 관리

### 2️⃣ **데이터 저장 및 관리**
- ✅ **Supabase** - 사용자 프로젝트, 디자인 히스토리 저장
- ✅ **PostgREST** - REST API를 통한 데이터베이스 접근
- ✅ **Notion** - 프로젝트 문서화, 디자인 아이디어 관리

### 3️⃣ **디자인 리소스**
- ✅ **Figma Developer MCP** - 디자인 템플릿 가져오기
- ✅ **Filesystem MCP** - 로컬 이미지 관리

### 4️⃣ **리서치 및 콘텐츠**
- ✅ **Google Search MCP** - 인테리어 트렌드 검색
- ✅ **YouTube MCP** - 인테리어 튜토리얼 영상 정보
- ✅ **Playwright Stealth** - 인테리어 사이트 스크래핑

### 5️⃣ **자동화**
- ✅ **n8n MCP** - 워크플로우 자동화
- ✅ **Text Editor MCP** - 파일 편집

### 6️⃣ **문서 및 지식**
- ✅ **Context7** - 최신 라이브러리 문서
- ✅ **Everything Search** - MCP 프로토콜 테스트

---

## 🚀 MCP 통합 전략

### **Phase 1: 기본 기능 강화**

#### 1.1 Supabase 데이터베이스 설계
```sql
-- 사용자 테이블
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 프로젝트 테이블
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  original_image_url TEXT,
  redesigned_image_url TEXT,
  design_type TEXT, -- interior/exterior
  room_type TEXT,
  style TEXT,
  background_color TEXT,
  foreground_color TEXT,
  ai_description TEXT,
  cost_estimate TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 디자인 히스토리
CREATE TABLE design_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  iteration_number INT,
  image_url TEXT,
  prompt_used TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 1.2 OpenAI 통합 - 디자인 제안 보강
- Gemini의 결과를 OpenAI로 보완
- 더 상세한 디자인 설명 생성
- 비용 추정 로직 개선

#### 1.3 Notion 통합 - 프로젝트 문서화
- 각 프로젝트를 Notion 페이지로 자동 생성
- 디자인 히스토리 추적
- 클라이언트 피드백 관리

---

### **Phase 2: 고급 기능**

#### 2.1 YouTube MCP - 인테리어 튜토리얼 큐레이션
- 선택한 스타일에 맞는 YouTube 영상 추천
- 자동 자막 추출로 디자인 팁 제공

#### 2.2 Figma MCP - 디자인 템플릿 연동
- Figma에서 인테리어 템플릿 가져오기
- SVG/PNG 다운로드 자동화

#### 2.3 Playwright - 웹 스크래핑
- Pinterest, Houzz 등에서 영감 수집
- 가구 가격 비교

---

### **Phase 3: 자동화**

#### 3.1 n8n 워크플로우
- 프로젝트 완료 시 이메일 발송
- Notion 자동 업데이트
- 주간 리포트 생성

#### 3.2 Google Search - 트렌드 분석
- 실시간 인테리어 트렌드 검색
- 디자인 제안에 트렌드 반영

---

## 📋 구현 우선순위

### **High Priority (즉시 구현)**
1. ✅ Supabase 데이터베이스 설정
2. ✅ 환경 변수 설정 (Gemini API)
3. ✅ 기본 CRUD 기능

### **Medium Priority (1-2주 내)**
1. OpenAI 통합 (디자인 설명 보강)
2. Notion 통합 (프로젝트 관리)
3. YouTube 추천 기능

### **Low Priority (향후)**
1. Figma 템플릿 연동
2. Playwright 스크래핑
3. n8n 자동화

---

## 🔐 필수 API 키

다음 서비스의 API 키가 필요합니다:

### 1. Google Gemini API
- 발급: https://aistudio.google.com/app/apikey
- 환경 변수: `GEMINI_API_KEY`

### 2. Supabase (선택)
- 프로젝트 생성: https://supabase.com
- 이미 설정됨: `qqxlyjdeksbwfsjubmco`

### 3. OpenAI (선택)
- 발급: https://platform.openai.com/api-keys
- 환경 변수: `OPENAI_API_KEY`

### 4. YouTube Data API (선택)
- 발급: https://console.cloud.google.com
- 환경 변수: `YOUTUBE_API_KEY`

### 5. Figma (선택)
- 발급: https://www.figma.com/developers/api#access-tokens
- 환경 변수: `FIGMA_ACCESS_TOKEN`
- 형식: `figd_XXXXXXXXXXXXXXXXXXXX` (본인의 토큰 발급 필요)

### 6. Notion (선택)
- 통합 생성: https://www.notion.so/my-integrations
- 환경 변수: `NOTION_API_KEY`

---

## 💡 사용 예시

### **Supabase로 프로젝트 저장**
```python
# backend/routers/tryon.py에 추가
from supabase import create_client

supabase = create_client(
    "https://qqxlyjdeksbwfsjubmco.supabase.co",
    os.getenv("SUPABASE_KEY")
)

# 프로젝트 저장
data = supabase.table("projects").insert({
    "user_id": user_id,
    "original_image_url": original_url,
    "redesigned_image_url": redesigned_url,
    "design_type": design_type,
    "style": style
}).execute()
```

### **OpenAI로 디자인 설명 보강**
```python
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": f"Enhance this interior design description: {gemini_output}"
    }]
)
```

### **YouTube로 튜토리얼 추천**
Claude Code에서 직접 호출:
```python
# YouTube MCP 사용
videos = mcp_youtube.search_videos(
    query=f"{style} interior design tutorial",
    maxResults=5
)
```

---

## 📊 다음 단계

1. **Gemini API 키 발급 및 설정**
2. **Supabase 데이터베이스 스키마 생성**
3. **Backend에 Supabase 연동 코드 추가**
4. **Frontend에 프로젝트 저장/불러오기 기능 추가**
5. **OpenAI 통합으로 디자인 설명 품질 향상**

---

**작성일**: 2025-10-25
**Claude Code 환경**: Windows 네이티브 + WSL
