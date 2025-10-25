"""
Render.com 자동 배포 스크립트
환경 변수를 포함한 Backend/Frontend 서비스 자동 생성
"""

import requests
import json
import sys

# Render API 설정
RENDER_API_KEY = "rnd_y1TpnHtypwIgKWtARAmaqmHD5UhY"
WORKSPACE_ID = "tea-d3u92bqli9vc73btqsig"
HEADERS = {
    "Authorization": f"Bearer {RENDER_API_KEY}",
    "Content-Type": "application/json"
}
BASE_URL = "https://api.render.com/v1"

# GitHub 저장소
REPO_URL = "https://github.com/playcatkorea/gen-ai-interior-designer"

print("=" * 60)
print("Render.com 자동 배포 시작")
print("=" * 60)

# 1. Backend 서비스 생성
print("\n[1/2] Backend 서비스 생성 중...")

backend_config = {
    "type": "web_service",
    "name": "gen-ai-interior-backend",
    "ownerId": WORKSPACE_ID,
    "repo": REPO_URL,
    "autoDeploy": "yes",
    "branch": "main",
    "rootDir": "backend",
    "runtime": "python",
    "buildCommand": "pip install poetry && poetry install",
    "startCommand": "poetry run uvicorn main:app --host 0.0.0.0 --port $PORT",
    "envVars": [
        {
            "key": "GOOGLE_API_KEY",
            "value": "AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU"
        },
        {
            "key": "YOUTUBE_API_KEY",
            "value": "AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A"
        },
        {
            "key": "PYTHON_VERSION",
            "value": "3.11.0"
        },
        {
            "key": "ALLOWED_ORIGINS",
            "value": "*"
        }
    ]
}

response = requests.post(
    f"{BASE_URL}/services",
    headers=HEADERS,
    json=backend_config
)

if response.status_code == 201:
    backend_data = response.json()
    backend_url = backend_data.get("service", {}).get("serviceDetails", {}).get("url", "")
    print(f"성공! Backend URL: https://{backend_url}")
    print(f"서비스 ID: {backend_data.get('service', {}).get('id', '')}")
else:
    print(f"오류 발생: {response.status_code}")
    print(f"응답: {response.text}")
    sys.exit(1)

# 2. Frontend 서비스 생성
print("\n[2/2] Frontend 서비스 생성 중...")

frontend_config = {
    "type": "web_service",
    "name": "gen-ai-interior-frontend",
    "ownerId": WORKSPACE_ID,
    "repo": REPO_URL,
    "autoDeploy": "yes",
    "branch": "main",
    "rootDir": "frontend",
    "runtime": "node",
    "buildCommand": "npm install && npm run build",
    "startCommand": "npx serve -s dist -p $PORT",
    "envVars": [
        {
            "key": "VITE_API_URL",
            "value": f"https://{backend_url}"
        }
    ]
}

response = requests.post(
    f"{BASE_URL}/services",
    headers=HEADERS,
    json=frontend_config
)

if response.status_code == 201:
    frontend_data = response.json()
    frontend_url = frontend_data.get("service", {}).get("serviceDetails", {}).get("url", "")
    print(f"성공! Frontend URL: https://{frontend_url}")
    print(f"서비스 ID: {frontend_data.get('service', {}).get('id', '')}")

    print("\n" + "=" * 60)
    print("배포 완료!")
    print("=" * 60)
    print(f"\n앱 접속 URL: https://{frontend_url}")
    print(f"API URL: https://{backend_url}")
    print(f"\nRender 대시보드: https://dashboard.render.com/")
else:
    print(f"오류 발생: {response.status_code}")
    print(f"응답: {response.text}")
    sys.exit(1)
