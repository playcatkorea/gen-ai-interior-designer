"""
OpenAI를 사용한 디자인 설명 보강
Gemini의 결과를 더 상세하고 전문적으로 개선
"""
import os
from typing import Dict, Optional
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


async def enhance_design_description(
    gemini_description: str,
    design_type: str,
    room_type: str,
    style: str,
    background_color: str,
    foreground_color: str
) -> Dict[str, str]:
    """
    OpenAI MCP를 사용하여 디자인 설명 보강

    Args:
        gemini_description: Gemini가 생성한 원본 설명
        design_type: interior/exterior
        room_type: 방 타입
        style: 디자인 스타일
        background_color: 배경색
        foreground_color: 전경색

    Returns:
        enhanced_description: 보강된 설명
        cost_breakdown: 상세 비용 분석
        improvement_suggestions: 개선 제안
    """

    # OpenAI API Key가 없으면 원본 반환
    if not OPENAI_API_KEY:
        return {
            "enhanced_description": gemini_description,
            "cost_breakdown": "API 키가 설정되지 않아 상세 비용 분석을 제공할 수 없습니다.",
            "improvement_suggestions": "OpenAI API 키를 설정하면 더 상세한 제안을 받을 수 있습니다."
        }

    try:
        # MCP OpenAI 사용
        from utils.mcp_openai import call_openai_chat

        prompt = f"""
        당신은 전문 인테리어/익스테리어 디자이너입니다.

        다음은 AI가 생성한 {design_type} 디자인 설명입니다:

        {gemini_description}

        디자인 상세 정보:
        - 공간 타입: {room_type}
        - 스타일: {style}
        - 배경색: {background_color}
        - 전경색: {foreground_color}

        아래 3가지를 JSON 형식으로 제공해주세요:

        1. enhanced_description: 원본 설명을 더 전문적이고 상세하게 개선 (한국어, 200-300자)
        2. cost_breakdown: 상세 비용 분석 (재료비, 인건비, 기간 등 구체적으로, 한국 원화와 USD 병기)
        3. improvement_suggestions: 추가 개선 제안 3가지 (각 항목 50자 이내)

        JSON 응답 형식:
        {{
          "enhanced_description": "...",
          "cost_breakdown": "...",
          "improvement_suggestions": "..."
        }}
        """

        result = await call_openai_chat(prompt, model="gpt-4o")

        # JSON 파싱
        import json
        response_data = json.loads(result)

        return {
            "enhanced_description": response_data.get("enhanced_description", gemini_description),
            "cost_breakdown": response_data.get("cost_breakdown", "비용 분석 정보 없음"),
            "improvement_suggestions": response_data.get("improvement_suggestions", "개선 제안 정보 없음")
        }

    except Exception as e:
        print(f"OpenAI enhancement error: {e}")
        return {
            "enhanced_description": gemini_description,
            "cost_breakdown": f"비용 분석 생성 중 오류: {str(e)}",
            "improvement_suggestions": "개선 제안 생성 불가"
        }


async def generate_youtube_search_query(design_type: str, room_type: str, style: str) -> str:
    """
    디자인 정보를 기반으로 YouTube 검색 쿼리 생성
    """
    return f"{style} {room_type} {design_type} design tutorial korean"
