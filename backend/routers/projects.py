"""
프로젝트 관리 API
Supabase를 사용한 프로젝트 CRUD 작업
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

router = APIRouter()

# Supabase 클라이언트 초기화 (선택적)
try:
    from utils.supabase_client import supabase
    SUPABASE_AVAILABLE = True
except (ValueError, Exception) as e:
    SUPABASE_AVAILABLE = False
    supabase = None
    print(f"⚠️  Supabase not available: {str(e)}")
    print("   Project management features will be disabled.")


class ProjectCreate(BaseModel):
    """프로젝트 생성 요청"""
    user_email: str
    name: str
    original_image_url: Optional[str] = None
    redesigned_image_url: Optional[str] = None
    design_type: str
    room_type: str
    style: str
    background_color: str
    foreground_color: str
    ai_description: Optional[str] = None
    cost_estimate: Optional[str] = None
    instructions: Optional[str] = None


class ProjectUpdate(BaseModel):
    """프로젝트 업데이트 요청"""
    name: Optional[str] = None
    redesigned_image_url: Optional[str] = None
    ai_description: Optional[str] = None
    cost_estimate: Optional[str] = None


class DesignHistoryCreate(BaseModel):
    """디자인 히스토리 추가"""
    project_id: str
    iteration_number: int
    image_url: str
    prompt_used: Optional[str] = None
    ai_response: Optional[str] = None


@router.post("/projects")
async def create_project(project: ProjectCreate):
    """새 프로젝트 생성"""
    if not SUPABASE_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="Project management is unavailable. Supabase configuration is missing."
        )
    try:
        # 사용자 확인 또는 생성
        users = await supabase.select("users", filters={"email": project.user_email})

        if not users:
            # 사용자 생성
            user_data = await supabase.insert("users", {
                "email": project.user_email,
                "name": project.user_email.split("@")[0]
            })
            user_id = user_data[0]["id"] if isinstance(user_data, list) else user_data["id"]
        else:
            user_id = users[0]["id"]

        # 프로젝트 생성
        project_data = {
            "user_id": user_id,
            "name": project.name,
            "original_image_url": project.original_image_url,
            "redesigned_image_url": project.redesigned_image_url,
            "design_type": project.design_type,
            "room_type": project.room_type,
            "style": project.style,
            "background_color": project.background_color,
            "foreground_color": project.foreground_color,
            "ai_description": project.ai_description,
            "cost_estimate": project.cost_estimate,
            "instructions": project.instructions
        }

        result = await supabase.insert("projects", project_data)

        return {
            "success": True,
            "project": result[0] if isinstance(result, list) else result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create project: {str(e)}")


@router.get("/projects")
async def get_projects(user_email: Optional[str] = None, limit: int = 100):
    """프로젝트 목록 조회"""
    if not SUPABASE_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="Project management is unavailable. Supabase configuration is missing."
        )
    try:
        filters = {}
        if user_email:
            # 사용자 ID 먼저 조회
            users = await supabase.select("users", filters={"email": user_email})
            if users:
                filters["user_id"] = users[0]["id"]

        projects = await supabase.select(
            "projects",
            filters=filters,
            limit=limit,
            order_by="created_at.desc"
        )

        return {
            "success": True,
            "projects": projects,
            "count": len(projects)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch projects: {str(e)}")


@router.get("/projects/{project_id}")
async def get_project(project_id: str):
    """특정 프로젝트 조회"""
    if not SUPABASE_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="Project management is unavailable. Supabase configuration is missing."
        )
    try:
        projects = await supabase.select("projects", filters={"id": project_id})

        if not projects:
            raise HTTPException(status_code=404, detail="Project not found")

        # 디자인 히스토리도 함께 조회
        history = await supabase.select(
            "design_history",
            filters={"project_id": project_id},
            order_by="iteration_number.asc"
        )

        return {
            "success": True,
            "project": projects[0],
            "history": history
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch project: {str(e)}")


@router.patch("/projects/{project_id}")
async def update_project(project_id: str, update: ProjectUpdate):
    """프로젝트 업데이트"""
    if not SUPABASE_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="Project management is unavailable. Supabase configuration is missing."
        )
    try:
        update_data = update.model_dump(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow().isoformat()

        result = await supabase.update(
            "projects",
            filters={"id": project_id},
            data=update_data
        )

        if not result:
            raise HTTPException(status_code=404, detail="Project not found")

        return {
            "success": True,
            "project": result[0] if isinstance(result, list) else result
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update project: {str(e)}")


@router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    """프로젝트 삭제"""
    if not SUPABASE_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="Project management is unavailable. Supabase configuration is missing."
        )
    try:
        await supabase.delete("projects", filters={"id": project_id})

        return {
            "success": True,
            "message": "Project deleted successfully"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete project: {str(e)}")


@router.post("/design-history")
async def add_design_history(history: DesignHistoryCreate):
    """디자인 히스토리 추가"""
    if not SUPABASE_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="Project management is unavailable. Supabase configuration is missing."
        )
    try:
        result = await supabase.insert("design_history", history.model_dump())

        return {
            "success": True,
            "history": result[0] if isinstance(result, list) else result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add design history: {str(e)}")
