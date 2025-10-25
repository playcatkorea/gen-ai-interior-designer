"""
Supabase Client Utility
간단한 HTTP 클라이언트로 Supabase PostgREST API 호출
"""
import os
import httpx
from typing import Optional, Dict, Any, List
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://qqxlyjdeksbwfsjubmco.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "")


class SupabaseClient:
    """간단한 Supabase 클라이언트"""

    def __init__(self):
        self.base_url = f"{SUPABASE_URL}/rest/v1"

        # 키 검증
        auth_key = SUPABASE_SERVICE_KEY or SUPABASE_KEY
        if not auth_key or auth_key == "":
            raise ValueError("SUPABASE_KEY or SUPABASE_SERVICE_KEY must be set")

        self.headers = {
            "apikey": SUPABASE_KEY or SUPABASE_SERVICE_KEY,
            "Authorization": f"Bearer {auth_key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }

    async def insert(self, table: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """데이터 삽입"""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/{table}",
                json=data,
                headers=self.headers
            )
            response.raise_for_status()
            return response.json()

    async def select(
        self,
        table: str,
        filters: Optional[Dict[str, Any]] = None,
        limit: int = 100,
        order_by: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """데이터 조회"""
        params = {}
        if filters:
            for key, value in filters.items():
                params[key] = f"eq.{value}"
        if limit:
            params["limit"] = limit
        if order_by:
            params["order"] = order_by

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/{table}",
                params=params,
                headers=self.headers
            )
            response.raise_for_status()
            return response.json()

    async def update(
        self,
        table: str,
        filters: Dict[str, Any],
        data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """데이터 업데이트"""
        params = {}
        for key, value in filters.items():
            params[key] = f"eq.{value}"

        async with httpx.AsyncClient() as client:
            response = await client.patch(
                f"{self.base_url}/{table}",
                json=data,
                params=params,
                headers=self.headers
            )
            response.raise_for_status()
            return response.json()

    async def delete(self, table: str, filters: Dict[str, Any]) -> None:
        """데이터 삭제"""
        params = {}
        for key, value in filters.items():
            params[key] = f"eq.{value}"

        async with httpx.AsyncClient() as client:
            response = await client.delete(
                f"{self.base_url}/{table}",
                params=params,
                headers=self.headers
            )
            response.raise_for_status()


# 싱글톤 인스턴스
supabase = SupabaseClient()
