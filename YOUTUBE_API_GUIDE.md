# YouTube Data API v3 키 발급 가이드

## 1. Google Cloud Console 접속

YouTube Data API를 사용하려면 먼저 Google Cloud Platform에서 API 키를 발급받아야 합니다.

**접속 URL**: https://console.cloud.google.com

## 2. 프로젝트 생성 (신규 사용자)

### 2-1. 프로젝트 선택 드롭다운 클릭
- Console 상단의 프로젝트 이름을 클릭합니다
- "새 프로젝트" 버튼을 클릭합니다

### 2-2. 프로젝트 정보 입력
```
프로젝트 이름: Gen-AI-Home-Designer (또는 원하는 이름)
위치: 조직 없음 (개인 프로젝트인 경우)
```

### 2-3. "만들기" 버튼 클릭
- 프로젝트 생성 완료까지 약 10초 소요됩니다

## 3. YouTube Data API v3 활성화

### 3-1. API 및 서비스 메뉴로 이동
- 좌측 메뉴에서 "API 및 서비스" → "라이브러리" 클릭

### 3-2. YouTube Data API v3 검색
```
검색창에 "YouTube Data API v3" 입력
```

### 3-3. API 활성화
- YouTube Data API v3 클릭
- **"사용 설정"** 버튼 클릭

## 4. API 키 생성

### 4-1. 사용자 인증 정보 생성
- 좌측 메뉴에서 "API 및 서비스" → "사용자 인증 정보" 클릭
- 상단의 **"+ 사용자 인증 정보 만들기"** 버튼 클릭
- **"API 키"** 선택

### 4-2. API 키 생성 완료
- API 키가 자동으로 생성됩니다
- 생성된 키를 복사합니다

```
예시: AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A
```

### 4-3. API 키 제한 설정 (권장)
보안을 위해 API 키를 제한하는 것이 좋습니다.

#### 애플리케이션 제한 설정
```
- HTTP 리퍼러 (웹사이트): 웹 앱용
- IP 주소: 서버 앱용
- Android 앱
- iOS 앱
```

#### API 제한 설정
```
API 제한사항: YouTube Data API v3만 선택
```

## 5. 프로젝트에 API 키 적용

### 5-1. .env 파일에 API 키 추가
```bash
# backend/.env 파일 열기
YOUTUBE_API_KEY=발급받은_API_키_입력
```

예시:
```bash
YOUTUBE_API_KEY=AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A
```

### 5-2. 백엔드 서버 재시작
```bash
cd backend
poetry run uvicorn main:app --reload
```

## 6. API 사용량 확인

### YouTube Data API v3 할당량
- **무료 할당량**: 10,000 단위/일
- **검색 요청 비용**: 100 단위/요청
- 즉, 하루에 최대 **100회 검색 가능**

### 할당량 확인 방법
1. Google Cloud Console 접속
2. "API 및 서비스" → "대시보드" 클릭
3. "YouTube Data API v3" 클릭
4. "할당량" 탭에서 사용량 확인

## 7. 테스트

### 터미널에서 API 테스트
```bash
curl "http://localhost:8000/api/recommendations/youtube?style=modern&room_type=living&design_type=interior&max_results=3"
```

### 예상 응답
```json
{
  "success": true,
  "query": "modern living interior design tutorial korean",
  "videos": [
    {
      "video_id": "...",
      "title": "...",
      "description": "...",
      "thumbnail": "...",
      "channel": "...",
      "url": "https://www.youtube.com/watch?v=..."
    }
  ],
  "count": 3
}
```

## 8. 주의사항

### 보안
- ⚠️ **API 키를 GitHub에 커밋하지 마세요!**
- `.env` 파일은 `.gitignore`에 포함되어야 합니다
- 공개 저장소에 API 키가 노출되면 즉시 키를 삭제하고 재발급하세요

### 비용
- 무료 할당량을 초과하면 자동으로 과금됩니다
- Google Cloud Billing 계정을 연결하지 않으면 할당량 초과 시 API 호출이 차단됩니다

### 할당량 관리
```
검색 1회 = 100 단위
일일 할당량 = 10,000 단위
→ 최대 100회 검색 가능
```

프로젝트에서 `max_results=5`로 설정하면, 하루에 최대 100회의 검색 요청을 할 수 있습니다.

## 9. 문제 해결

### "API key not valid" 오류
```
원인: API 키가 잘못되었거나 YouTube Data API v3가 활성화되지 않음
해결: API 키 재확인 및 API 활성화 상태 확인
```

### "Quota exceeded" 오류
```
원인: 일일 할당량 10,000 단위 초과
해결: 다음 날까지 대기 또는 Google Cloud Billing 연결하여 할당량 증가
```

### 한국어 검색 결과가 나오지 않음
```
현재 설정: relevanceLanguage=ko
확인: backend/routers/recommendations.py의 params 설정 확인
```

## 10. 참고 자료

- **YouTube Data API 공식 문서**: https://developers.google.com/youtube/v3
- **API 키 관리**: https://console.cloud.google.com/apis/credentials
- **할당량 정책**: https://developers.google.com/youtube/v3/getting-started#quota
- **API Explorer**: https://developers.google.com/youtube/v3/docs/search/list

---

## 현재 프로젝트 설정 상태

✅ **이미 설정된 API 키**: `AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A`

이 키로 정상 작동 중입니다! 추가 설정이 필요하지 않습니다.
