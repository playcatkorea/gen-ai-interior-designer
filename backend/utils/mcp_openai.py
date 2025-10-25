"""
OpenAI MCP 호출 유틸리티
Claude Code의 mcp-openai를 Python에서 사용
"""
import subprocess
import json
import os
from typing import List, Dict


async def call_openai_chat(
    prompt: str,
    model: str = "gpt-4o",
    system_message: str = "You are a helpful assistant."
) -> str:
    """
    OpenAI Chat API 호출 (MCP를 통해)

    Args:
        prompt: 사용자 프롬프트
        model: 사용할 모델 (gpt-4o, gpt-4o-mini, o1-preview, o1-mini)
        system_message: 시스템 메시지

    Returns:
        AI 응답 텍스트
    """
    try:
        # MCP OpenAI 직접 호출 대신 httpx로 OpenAI API 직접 호출
        import httpx

        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY not found in environment")

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

        data = {
            "model": model,
            "messages": [
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 1500
        }

        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                json=data,
                headers=headers
            )

            response.raise_for_status()
            result = response.json()

            return result["choices"][0]["message"]["content"]

    except Exception as e:
        print(f"OpenAI API call error: {e}")
        raise
