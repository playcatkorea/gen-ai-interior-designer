"""
추천 시스템 API
YouTube 튜토리얼 및 디자인 영감 제공
"""
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
import os

router = APIRouter()


@router.get("/recommendations/youtube")
async def get_youtube_tutorials(
    style: str = Query(..., description="디자인 스타일"),
    room_type: str = Query(..., description="방 타입"),
    design_type: str = Query(default="interior", description="interior 또는 exterior"),
    max_results: int = Query(default=5, ge=1, le=10)
):
    """
    디자인 스타일에 맞는 YouTube 튜토리얼 추천

    MCP YouTube Data API 사용
    """
    try:
        # YouTube MCP 사용
        import httpx

        api_key = os.getenv("YOUTUBE_API_KEY")
        if not api_key:
            return {
                "success": False,
                "message": "YouTube API 키가 설정되지 않았습니다.",
                "videos": []
            }

        # 검색 쿼리 생성
        search_query = f"{style} {room_type} {design_type} design tutorial korean"

        # YouTube Data API v3 호출
        params = {
            "part": "snippet",
            "q": search_query,
            "type": "video",
            "maxResults": max_results,
            "key": api_key,
            "relevanceLanguage": "ko",
            "order": "relevance"
        }

        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://www.googleapis.com/youtube/v3/search",
                params=params
            )

            if response.status_code != 200:
                return {
                    "success": False,
                    "message": f"YouTube API 오류: {response.status_code}",
                    "videos": []
                }

            data = response.json()

            videos = []
            for item in data.get("items", []):
                videos.append({
                    "video_id": item["id"]["videoId"],
                    "title": item["snippet"]["title"],
                    "description": item["snippet"]["description"],
                    "thumbnail": item["snippet"]["thumbnails"]["medium"]["url"],
                    "channel": item["snippet"]["channelTitle"],
                    "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}"
                })

            return {
                "success": True,
                "query": search_query,
                "videos": videos,
                "count": len(videos)
            }

    except Exception as e:
        print(f"YouTube recommendation error: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"YouTube 추천 생성 중 오류: {str(e)}"
        )


@router.get("/recommendations/design-tips")
async def get_design_tips(
    style: str = Query(..., description="디자인 스타일"),
    room_type: str = Query(..., description="방 타입")
):
    """
    디자인 팁 및 영감 제공
    """
    tips_database = {
        "modern": {
            "living": [
                "중성 톤과 깨끗한 라인을 사용하세요",
                "미니멀한 가구 배치가 중요합니다",
                "자연광을 최대한 활용하세요"
            ],
            "bedroom": [
                "침실은 편안함이 우선입니다",
                "간접 조명을 활용하세요",
                "수납공간을 최대화하세요"
            ],
            "kitchen": [
                "작업 공간을 넓게 확보하세요",
                "스테인리스 가전을 선택하세요",
                "아일랜드 형태가 효율적입니다"
            ]
        },
        "rustic": {
            "living": [
                "나무 재질을 많이 사용하세요",
                "따뜻한 색감의 조명을 선택하세요",
                "빈티지 소품을 활용하세요"
            ],
            "bedroom": [
                "나무 가구로 따뜻함을 더하세요",
                "자연 소재 침구를 사용하세요",
                "간접 조명으로 분위기를 만드세요"
            ]
        },
        "boho": {
            "living": [
                "다양한 패턴과 색상을 조화롭게",
                "식물을 많이 배치하세요",
                "매크라메와 같은 핸드메이드 소품"
            ]
        }
    }

    style_lower = style.lower()
    room_lower = room_type.lower()

    tips = tips_database.get(style_lower, {}).get(room_lower, [
        f"{style} 스타일의 {room_type}에 적합한 디자인을 선택하세요",
        "공간의 기능성을 우선으로 고려하세요",
        "개인의 취향을 반영하는 것이 중요합니다"
    ])

    return {
        "success": True,
        "style": style,
        "room_type": room_type,
        "tips": tips
    }


@router.get("/recommendations/color-palette")
async def get_color_palette(
    style: str = Query(..., description="디자인 스타일")
):
    """
    스타일별 추천 컬러 팔레트
    """
    palettes = {
        "modern": {
            "primary": ["#FFFFFF", "#000000", "#808080"],
            "accent": ["#3498db", "#e74c3c"],
            "description": "모던 스타일은 흑백과 중성 톤을 기본으로 합니다"
        },
        "rustic": {
            "primary": ["#8B4513", "#D2691E", "#F5DEB3"],
            "accent": ["#228B22", "#DC143C"],
            "description": "러스틱은 따뜻한 갈색 계열과 자연 색상"
        },
        "boho": {
            "primary": ["#F4A460", "#DEB887", "#F0E68C"],
            "accent": ["#FF6347", "#4682B4"],
            "description": "보헤미안은 따뜻하고 다채로운 색상"
        },
        "minimalist": {
            "primary": ["#FFFFFF", "#F5F5F5", "#E8E8E8"],
            "accent": ["#000000", "#C0C0C0"],
            "description": "미니멀리즘은 화이트와 그레이 톤"
        }
    }

    style_lower = style.lower()
    palette = palettes.get(style_lower, {
        "primary": ["#FFFFFF", "#000000"],
        "accent": ["#808080"],
        "description": "기본 컬러 팔레트"
    })

    return {
        "success": True,
        "style": style,
        "palette": palette
    }
