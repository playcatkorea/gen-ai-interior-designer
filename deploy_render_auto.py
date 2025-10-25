#!/usr/bin/env python3
"""Render.com 자동 배포 스크립트"""
import requests
import json
import time

# API 키
RENDER_API_KEY = "rnd_y1TpnHtypwIgKWtARAmaqmHD5UhY"

# 설정
REPO_URL = "https://github.com/playcatkorea/gen-ai-interior-designer"
BRANCH = "main"

# 환경 변수
GOOGLE_API_KEY = "AIzaSyByspltgfRno_NisFdYIFZ89HCoaZdokNU"
YOUTUBE_API_KEY = "AIzaSyCKZIdDjUBLqC8hfcvIQehIul6R6pmGx-A"

# API 헤더
headers = {
    "Authorization": f"Bearer {RENDER_API_KEY}",
    "Content-Type": "application/json"
}

print("=" * 60)
print("🎨 Gen AI Interior Designer - Render.com 자동 배포")
print("=" * 60)
print()

# Blueprint 생성
print("🚀 Blueprint 생성 중...")
url = "https://api.render.com/v1/blueprints"
payload = {
    "name": "gen-ai-interior-designer",
    "repo": REPO_URL,
    "branch": BRANCH,
    "autoDeploy": True
}

response = requests.post(url, headers=headers, json=payload)
print(f"Status: {response.status_code}")
print(f"Response: {response.text}")

if response.status_code == 201:
    print("✅ Blueprint 생성 성공!")
else:
    print(f"⚠️ Blueprint 이미 존재하거나 생성 실패 (계속 진행)")

# 서비스 목록 조회
print("\n⏳ 서비스 생성 대기 중... (10초)")
time.sleep(10)

print("\n📋 서비스 목록 조회 중...")
url = "https://api.render.com/v1/services"
response = requests.get(url, headers=headers)

if response.status_code == 200:
    services = response.json()
    print(f"✅ 서비스 {len(services)} 개 발견")
    
    # Backend 서비스 설정
    for service in services:
        service_name = service.get('name', '')
        service_id = service.get('id')
        
        if 'backend' in service_name.lower():
            print(f"\n🔧 Backend 서비스 설정: {service_name}")
            
            # 환경 변수 설정
            env_url = f"https://api.render.com/v1/services/{service_id}/env-vars"
            
            env_vars = [
                {"key": "GOOGLE_API_KEY", "value": GOOGLE_API_KEY},
                {"key": "YOUTUBE_API_KEY", "value": YOUTUBE_API_KEY},
                {"key": "PYTHON_VERSION", "value": "3.11.0"},
                {"key": "ALLOWED_ORIGINS", "value": "*"}
            ]
            
            for env_var in env_vars:
                response = requests.put(env_url, headers=headers, json=env_var)
                if response.status_code == 200:
                    print(f"  ✅ {env_var['key']} 설정 완료")
                else:
                    print(f"  ⚠️ {env_var['key']} 설정 실패: {response.status_code}")
            
            # 배포
            print(f"\n🚢 Backend 배포 시작...")
            deploy_url = f"https://api.render.com/v1/services/{service_id}/deploys"
            response = requests.post(deploy_url, headers=headers)
            
            if response.status_code == 201:
                print("✅ Backend 배포 시작됨!")
            else:
                print(f"⚠️ Backend 배포 실패: {response.status_code}")
        
        elif 'frontend' in service_name.lower():
            print(f"\n🎨 Frontend 서비스 발견: {service_name}")
            
            # 배포
            print(f"🚢 Frontend 배포 시작...")
            deploy_url = f"https://api.render.com/v1/services/{service_id}/deploys"
            response = requests.post(deploy_url, headers=headers)
            
            if response.status_code == 201:
                print("✅ Frontend 배포 시작됨!")
            else:
                print(f"⚠️ Frontend 배포 실패: {response.status_code}")

print("\n" + "=" * 60)
print("✅ 자동 배포 완료!")
print("=" * 60)
print("\n📊 배포 진행 상황 확인:")
print("https://dashboard.render.com/")
print("\n⏱️  약 5-10분 후 배포 완료 예상")
print("\n📱 배포 완료 후 URL:")
print("  Frontend: https://gen-ai-interior-frontend.onrender.com")
print("  Backend:  https://gen-ai-interior-backend.onrender.com/docs")

