from fastapi import FastAPI
from routers import tryon, projects, recommendations
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(
    title="Gen AI Home Interior Designer API",
    description="AI-powered interior/exterior design generation with MCP integration",
    version="1.0.0"
)

# CORS 설정 - 환경에 따라 동적 허용
# 프로덕션: 실제 프론트엔드 URL 사용
# 개발: localhost 사용
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
if allowed_origins == ["*"]:
    # 개발 환경
    allowed_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*"  # 개발 시 모든 origin 허용
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tryon.router, prefix="/api", tags=["Design Generation"])
app.include_router(projects.router, prefix="/api", tags=["Projects"])
app.include_router(recommendations.router, prefix="/api", tags=["Recommendations"])


@app.get("/")
async def root():
    """API 상태 확인"""
    return {
        "status": "running",
        "message": "Gen AI Home Interior Designer API",
        "version": "1.0.0",
        "docs": "/docs"
    }
