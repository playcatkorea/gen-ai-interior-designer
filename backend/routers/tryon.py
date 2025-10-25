from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from utils.base64_helpers import array_buffer_to_base64
from dotenv import load_dotenv
import os
from google import genai
from google.genai import types
import traceback
import base64
import logging
from datetime import datetime
import json

load_dotenv()

router = APIRouter()

# 로그 디렉토리 생성
LOG_DIR = os.path.join(os.path.dirname(__file__), "..", "logs")
os.makedirs(LOG_DIR, exist_ok=True)

# 로거 설정
logger = logging.getLogger("tryon")
logger.setLevel(logging.INFO)

# 파일 핸들러 (일별 로그 파일)
log_filename = os.path.join(LOG_DIR, f"tryon_{datetime.now().strftime('%Y%m%d')}.log")
file_handler = logging.FileHandler(log_filename, encoding='utf-8')
file_handler.setLevel(logging.INFO)

# 포맷 설정
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("Missing GEMINI_API_KEY in .env")

client = genai.Client(api_key=GEMINI_API_KEY)

@router.post("/try-on")
async def try_on(
    place_image: UploadFile = File(...),
    design_type: str = Form(...),
    room_type: str = Form(...),
    style: str = Form(...),
    background_color: str = Form(...),
    foreground_color: str = Form(...),
    instructions: str = Form(""),

):
    request_id = datetime.now().strftime('%Y%m%d_%H%M%S_%f')
    logger.info(f"[{request_id}] New design generation request started")
    logger.info(f"[{request_id}] Parameters: design_type={design_type}, room_type={room_type}, style={style}")

    try:
        
        MAX_IMAGE_SIZE_MB = 10
        ALLOWED_MIME_TYPES = {
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/heic",
            "image/heif",
        }

        if place_image.content_type not in ALLOWED_MIME_TYPES:
            raise HTTPException(
                status_code=400, detail=f"Unsupported file type for place_image: {place_image.content_type}"
            )

        place_bytes = await place_image.read()

        size_in_mb_for_place_image = len(place_bytes) / (1024 * 1024)
        if size_in_mb_for_place_image > MAX_IMAGE_SIZE_MB:
            raise HTTPException(status_code=400, detail="Image exceeds 10MB size limit for place_image")
        
       
        place_b64 = array_buffer_to_base64(place_bytes)

        prompt = f"""
        당신은 전문 AI 인테리어 및 익스테리어 디자이너입니다.
        사용자가 업로드한 공간을 재디자인하는 것이 당신의 임무입니다.

        ### 사용자 입력 정보
        - **디자인 유형:** {design_type}
        - **공간 타입:** {room_type}
        - **스타일:** {style}
        - **배경색 선호도:** {background_color}
        - **전경색 선호도:** {foreground_color}
        - **추가 지시사항:** {instructions}

        ### 중요: 구조 요소 절대 보존 (CRITICAL)
        다음 요소들은 **절대로 변경, 이동, 삭제하지 마세요**:
        - ✓ 창문 (위치, 크기, 개수 모두 동일하게 유지)
        - ✓ 문 (위치와 크기 유지)
        - ✓ 벽 (위치와 각도 유지)
        - ✓ 천장 높이
        - ✓ 기둥이나 구조물
        - ✓ 방의 전체적인 형태와 레이아웃

        ### 변경 가능한 요소만:
        - 가구 (침대, 소파, 테이블, 의자 등)
        - 조명 (천장등, 스탠드, 벽등)
        - 바닥재 (타일, 마루, 카펫)
        - 벽지 또는 페인트 색상
        - 커튼, 블라인드
        - 장식품 (그림, 화분, 소품)

        ### 디자인 목표:
        1. 원본 이미지의 모든 창문을 정확히 같은 위치에 유지한 채 {style} 스타일 적용
        2. 배경색({background_color})과 전경색({foreground_color})을 조화롭게 사용
        3. {instructions} 요구사항 반영
        4. 자연광(창문)을 고려한 조명 계획
        5. 사진처럼 사실적이고 시공 가능한 디자인

        ### 응답 형식 (반드시 한국어로):
        **디자인 설명:**
        [변경된 가구, 색상, 소재를 구체적으로 설명]

        **주요 색상:**
        - 벽: #XXXXXX
        - 바닥: #XXXXXX
        - 가구: #XXXXXX

        **예상 비용:**
        - 한국: X,XXX,XXX원
        - 미국: $X,XXX

        **소요 기간:** X주

        **보존된 구조:** 창문 X개, 문 X개, 벽 구조
        """

        logger.info(f"[{request_id}] Prompt created (length: {len(prompt)} characters)")

        contents=[
            prompt,
            types.Part.from_bytes(
                data=place_b64,
                mime_type= place_image.content_type,
            )
        ]        
        
        logger.info(f"[{request_id}] Calling Gemini API with model gemini-2.0-flash-exp-image-generation")

        response = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=contents,
            config=types.GenerateContentConfig(
            response_modalities=['TEXT', 'IMAGE']
            )
        )

        logger.info(f"[{request_id}] Gemini API call successful")
        
        image_data = None
        text_response = "No Description available."
        if response.candidates and len(response.candidates) > 0:
            parts = response.candidates[0].content.parts

            if parts:
                print("Number of parts in response:", len(parts))

                for part in parts:
                    if hasattr(part, "inline_data") and part.inline_data:
                        image_data = part.inline_data.data
                        image_mime_type = getattr(part.inline_data, "mime_type", "image/png")
                        print("Image data received, length:", len(image_data))
                        print("MIME type:", image_mime_type)

                    elif hasattr(part, "text") and part.text:
                        text_response = part.text
                        preview = (text_response[:100] + "...") if len(text_response) > 100 else text_response
                        print("Text response received:", preview)
            else:
                print("No parts found in the response candidate.")
        else:
            print("No candidates found in the API response.")

        image_url = None
        if image_data:
            image_base64 = base64.b64encode(image_data).decode("utf-8")
            image_url = f"data:{image_mime_type};base64,{image_base64}"
        else:
            image_url = None
    
        logger.info(f"[{request_id}] Request completed successfully")

        return JSONResponse(
        content={
            "image": image_url,
            "text": text_response,
        }
        )

    except Exception as e:
        error_details = {
            "request_id": request_id,
            "error_type": type(e).__name__,
            "error_message": str(e),
            "traceback": traceback.format_exc(),
            "parameters": {
                "design_type": design_type,
                "room_type": room_type,
                "style": style,
                "background_color": background_color,
                "foreground_color": foreground_color,
                "instructions": instructions
            }
        }

        logger.error(f"[{request_id}] Error occurred: {error_details['error_type']} - {error_details['error_message']}")
        logger.error(f"[{request_id}] Traceback: {error_details['traceback']}")

        # 에러 상세 정보를 별도 파일로 저장
        error_log_file = os.path.join(LOG_DIR, f"error_{request_id}.json")
        with open(error_log_file, 'w', encoding='utf-8') as f:
            json.dump(error_details, f, ensure_ascii=False, indent=2)

        logger.error(f"[{request_id}] Error details saved to {error_log_file}")

        raise HTTPException(status_code=500, detail=f"Internal Server Error (Request ID: {request_id})")
