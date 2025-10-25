// 다국어 번역 파일
export const translations = {
  ko: {
    // 헤더
    title: "🏡 가상 홈 디자이너",
    subtitle: "AI 인테리어 / 익스테리어 메이크오버",

    // 폼 레이블
    uploadImage: "공간 이미지 업로드",
    designType: "디자인 타입",
    designTypePlaceholder: "실내 또는 실외?",
    roomType: "공간 타입",
    roomTypePlaceholder: "공간 타입 선택",
    designStyle: "디자인 스타일",
    designStylePlaceholder: "스타일 선택",
    backgroundColor: "배경 색상",
    foregroundColor: "전경 색상",
    additionalInstructions: "추가 요청사항",
    instructionsPlaceholder: "예: 따뜻한 조명 선호, 친환경 자재, 모던한 느낌 등",

    // 디자인 타입
    interior: "실내",
    exterior: "실외",

    // 공간 타입
    living: "거실",
    bedroom: "침실",
    kitchen: "주방",
    bathroom: "욕실",
    balcony: "발코니",
    garden: "정원",

    // 스타일
    modern: "모던",
    minimalist: "미니멀",
    rustic: "러스틱",
    bohemian: "보헤미안",
    classic: "클래식",

    // 버튼
    generating: "디자인 생성 중...",
    generate: "디자인 생성",

    // 결과
    resultTitle: "AI가 디자인한 공간",
    historyTitle: "이전 결과",

    // 토스트 메시지
    uploadRequired: "공간 이미지를 업로드해주세요",
    success: "디자인이 성공적으로 생성되었습니다!",
    error: "디자인 생성 실패",

    // 기타
    dragDrop: "이미지를 드래그하거나 클릭하여 업로드",
    imagePreview: "이미지 미리보기",
    imageOnly: "이미지만 업로드 가능합니다!",
    imageTooLarge: "이미지는 10MB보다 작아야 합니다!",
    dragDropText: "클릭하거나 이미지를 여기로 드래그하세요",
    imageHint: "이미지만 • 최대 크기: 10MB",
  },

  en: {
    // Header
    title: "🏡 Virtual Home Designer",
    subtitle: "AI Interior / Exterior Makeover",

    // Form labels
    uploadImage: "Upload Home Image",
    designType: "Design Type",
    designTypePlaceholder: "Interior or Exterior?",
    roomType: "Room Type",
    roomTypePlaceholder: "Select room type",
    designStyle: "Design Style",
    designStylePlaceholder: "Select a style",
    backgroundColor: "Background Color",
    foregroundColor: "Foreground Color",
    additionalInstructions: "Additional Instructions",
    instructionsPlaceholder: "Example: Prefer warm lighting, eco-friendly materials, modern look, etc.",

    // Design types
    interior: "Interior",
    exterior: "Exterior",

    // Room types
    living: "Living Room",
    bedroom: "Bedroom",
    kitchen: "Kitchen",
    bathroom: "Bathroom",
    balcony: "Balcony",
    garden: "Garden",

    // Styles
    modern: "Modern",
    minimalist: "Minimalist",
    rustic: "Rustic",
    bohemian: "Bohemian",
    classic: "Classic",

    // Buttons
    generating: "Designing...",
    generate: "Generate Design",

    // Results
    resultTitle: "Your AI-Designed Space",
    historyTitle: "Previous Results",

    // Toast messages
    uploadRequired: "Please upload an image of your space",
    success: "Design generated successfully!",
    error: "Design generation failed",

    // Others
    dragDrop: "Drag or click to upload image",
    imagePreview: "Image Preview",
    imageOnly: "You can only upload image files!",
    imageTooLarge: "Image must be smaller than 10MB!",
    dragDropText: "Click or drag an image here to upload",
    imageHint: "Image only • Max size: 10MB",
  }
};

export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations.en[key] || key;
};
