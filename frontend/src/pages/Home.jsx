import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Select,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Divider,
  Card,
  Modal,
  Spin,
} from "antd";
import {
  SaveOutlined,
  DownloadOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import ImageUpload from "../components/ImageUpload";
import DesignTips from "../components/DesignTips";
import YouTubeRecommendations from "../components/YouTubeRecommendations";
import ReactMarkdown from "react-markdown";

const { Title, Text } = Typography;
const { Option } = Select;

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const Home = ({ isDarkMode, t, userEmail }) => {
  const [homeImage, setHomeImage] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [designType, setDesignType] = useState("");
  const [roomType, setRoomType] = useState("");
  const [style, setStyle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // 추천 시스템 상태
  const [designTips, setDesignTips] = useState([]);
  const [colorPalette, setColorPalette] = useState(null);
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  // 프로젝트 저장 모달
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [saving, setSaving] = useState(false);

  const resultRef = useRef(null);
  const textColor = isDarkMode ? "#e5e5e5" : "#333333";
  const cardBg = isDarkMode ? "#1f1f1f" : "#ffffff";
  const borderColor = isDarkMode ? "#333333" : "#e8e8e8";

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  // 디자인 타입/스타일이 변경될 때 추천 정보 가져오기
  useEffect(() => {
    if (designType && roomType && style) {
      fetchRecommendations();
    }
  }, [designType, roomType, style]);

  const fetchRecommendations = async () => {
    setLoadingRecommendations(true);
    try {
      // YouTube 추천
      const youtubeRes = await axios.get(`${API_URL}/api/recommendations/youtube`, {
        params: { style, room_type: roomType, design_type: designType, max_results: 3 },
      });
      if (youtubeRes.data.success) {
        setYoutubeVideos(youtubeRes.data.videos);
      }

      // 디자인 팁
      const tipsRes = await axios.get(`${API_URL}/api/recommendations/design-tips`, {
        params: { style, room_type: roomType },
      });
      if (tipsRes.data.success) {
        setDesignTips(tipsRes.data.tips);
      }

      // 컬러 팔레트
      const paletteRes = await axios.get(`${API_URL}/api/recommendations/color-palette`, {
        params: { style },
      });
      if (paletteRes.data.success) {
        setColorPalette(paletteRes.data.palette);
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!homeImage) {
      toast.error(t("uploadRequired"));
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("place_image", homeImage);
    formData.append("background_color", backgroundColor);
    formData.append("foreground_color", foregroundColor);
    formData.append("design_type", designType);
    formData.append("room_type", roomType);
    formData.append("style", style);
    formData.append("instructions", instructions);

    try {
      const response = await axios.post(`${API_URL}/api/try-on`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newResult = {
        id: Date.now(),
        resultImage: response.data.image,
        text: response.data.text,
        timestamp: new Date().toLocaleString(),
        designType,
        roomType,
        style,
        backgroundColor,
        foregroundColor,
      };

      setResult(newResult);
      setHistory((prev) => [newResult, ...prev]);
      toast.success(t("success"));
    } catch (error) {
      console.error("Design generation error:", error);
      const errorMessage = error.response?.data?.detail || error.message || "Unknown error occurred";
      toast.error(`${t("error")}: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async () => {
    if (!projectName.trim()) {
      toast.error(t("projectNamePlaceholder"));
      return;
    }

    if (!result) {
      toast.error("저장할 디자인이 없습니다");
      return;
    }

    setSaving(true);
    try {
      const projectData = {
        user_email: userEmail || "guest@example.com",
        name: projectName,
        original_image_url: homeImage ? URL.createObjectURL(homeImage) : null,
        redesigned_image_url: result.resultImage,
        design_type: designType,
        room_type: roomType,
        style: style,
        background_color: backgroundColor,
        foreground_color: foregroundColor,
        ai_description: result.text,
        instructions: instructions,
      };

      await axios.post(`${API_URL}/api/projects`, projectData);
      toast.success(t("saved"));
      setSaveModalVisible(false);
      setProjectName("");
    } catch (error) {
      console.error("Failed to save project:", error);
      toast.error(t("saveFailed"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <Title
            level={1}
            style={{
              color: textColor,
              marginBottom: 16,
              fontSize: "3rem",
              fontWeight: 800,
            }}
          >
            {t("subtitle")}
          </Title>
          <Text
            style={{
              color: textColor,
              opacity: 0.8,
              fontSize: "1.1rem",
            }}
          >
            AI 기술로 당신의 공간을 완전히 새롭게 디자인하세요
          </Text>
        </motion.div>

        {/* Main Form */}
        <form onSubmit={handleSubmit}>
          <Row gutter={[32, 32]}>
            {/* Left Column - Image Upload */}
            <Col xs={24} lg={10}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ImageUpload
                  label={t("uploadImage")}
                  onImageChange={setHomeImage}
                  isDarkMode={isDarkMode}
                  t={t}
                />
              </motion.div>
            </Col>

            {/* Right Column - Options */}
            <Col xs={24} lg={14}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card
                  style={{
                    background: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: 16,
                    boxShadow: isDarkMode
                      ? "0 4px 20px rgba(0,0,0,0.3)"
                      : "0 4px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {/* Design Type */}
                    <div>
                      <Text
                        style={{
                          color: textColor,
                          fontWeight: 600,
                          marginBottom: 8,
                          display: "block",
                        }}
                      >
                        {t("designType")}
                      </Text>
                      <Select
                        placeholder={t("designTypePlaceholder")}
                        style={{ width: "100%" }}
                        size="large"
                        value={designType}
                        onChange={setDesignType}
                      >
                        <Option value="interior">{t("interior")}</Option>
                        <Option value="exterior">{t("exterior")}</Option>
                      </Select>
                    </div>

                    {/* Room Type */}
                    <div>
                      <Text
                        style={{
                          color: textColor,
                          fontWeight: 600,
                          marginBottom: 8,
                          display: "block",
                        }}
                      >
                        {t("roomType")}
                      </Text>
                      <Select
                        placeholder={t("roomTypePlaceholder")}
                        style={{ width: "100%" }}
                        size="large"
                        value={roomType}
                        onChange={setRoomType}
                      >
                        <Option value="living">{t("living")}</Option>
                        <Option value="bedroom">{t("bedroom")}</Option>
                        <Option value="kitchen">{t("kitchen")}</Option>
                        <Option value="bathroom">{t("bathroom")}</Option>
                        <Option value="balcony">{t("balcony")}</Option>
                        <Option value="garden">{t("garden")}</Option>
                      </Select>
                    </div>

                    {/* Style */}
                    <div>
                      <Text
                        style={{
                          color: textColor,
                          fontWeight: 600,
                          marginBottom: 8,
                          display: "block",
                        }}
                      >
                        {t("designStyle")}
                      </Text>
                      <Select
                        placeholder={t("designStylePlaceholder")}
                        style={{ width: "100%" }}
                        size="large"
                        value={style}
                        onChange={setStyle}
                      >
                        <Option value="modern">{t("modern")}</Option>
                        <Option value="minimalist">{t("minimalist")}</Option>
                        <Option value="rustic">{t("rustic")}</Option>
                        <Option value="bohemian">{t("bohemian")}</Option>
                        <Option value="classic">{t("classic")}</Option>
                      </Select>
                    </div>

                    {/* Colors */}
                    <Row gutter={16}>
                      <Col span={12}>
                        <Text
                          style={{
                            color: textColor,
                            fontWeight: 600,
                            marginBottom: 8,
                            display: "block",
                          }}
                        >
                          {t("backgroundColor")}
                        </Text>
                        <Input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          style={{
                            width: "100%",
                            height: "48px",
                            padding: "6px",
                            borderRadius: 8,
                            cursor: "pointer",
                          }}
                        />
                      </Col>
                      <Col span={12}>
                        <Text
                          style={{
                            color: textColor,
                            fontWeight: 600,
                            marginBottom: 8,
                            display: "block",
                          }}
                        >
                          {t("foregroundColor")}
                        </Text>
                        <Input
                          type="color"
                          value={foregroundColor}
                          onChange={(e) => setForegroundColor(e.target.value)}
                          style={{
                            width: "100%",
                            height: "48px",
                            padding: "6px",
                            borderRadius: 8,
                            cursor: "pointer",
                          }}
                        />
                      </Col>
                    </Row>

                    {/* Additional Instructions */}
                    <div>
                      <Text
                        style={{
                          color: textColor,
                          fontWeight: 600,
                          marginBottom: 8,
                          display: "block",
                        }}
                      >
                        {t("additionalInstructions")}
                      </Text>
                      <Input.TextArea
                        rows={4}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder={t("instructionsPlaceholder")}
                        style={{ borderRadius: 8 }}
                      />
                    </div>

                    {/* Generate Button */}
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={loading}
                      block
                      style={{
                        height: 56,
                        borderRadius: 12,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        marginTop: 8,
                      }}
                    >
                      {loading ? t("generating") : t("generate")}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </form>

        {/* Recommendations Section */}
        {(designTips.length > 0 || colorPalette || youtubeVideos.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ marginTop: 48 }}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                {loadingRecommendations ? (
                  <div style={{ textAlign: "center", padding: "2rem" }}>
                    <Spin size="large" />
                    <p style={{ color: textColor, marginTop: 16 }}>
                      {t("loadingRecommendations")}
                    </p>
                  </div>
                ) : (
                  <DesignTips
                    tips={designTips}
                    palette={colorPalette}
                    isDarkMode={isDarkMode}
                    t={t}
                  />
                )}
              </Col>
              <Col xs={24} md={12}>
                <YouTubeRecommendations
                  videos={youtubeVideos}
                  isDarkMode={isDarkMode}
                  t={t}
                />
              </Col>
            </Row>
          </motion.div>
        )}

        {/* Result Section */}
        {result && (
          <motion.div
            ref={resultRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginTop: 64 }}
          >
            <Divider />
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <Title level={2} style={{ color: textColor, marginBottom: 16 }}>
                {t("resultTitle")}
              </Title>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Button
                  icon={<SaveOutlined />}
                  size="large"
                  onClick={() => setSaveModalVisible(true)}
                  style={{ borderRadius: 8 }}
                >
                  {t("saveProject")}
                </Button>
                <Button
                  icon={<DownloadOutlined />}
                  size="large"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = result.resultImage;
                    link.download = `design_${Date.now()}.png`;
                    link.click();
                  }}
                  style={{ borderRadius: 8 }}
                >
                  다운로드
                </Button>
              </div>
            </div>

            <Card
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <img
                src={result.resultImage}
                alt="AI Design Result"
                style={{
                  width: "100%",
                  maxHeight: "600px",
                  objectFit: "contain",
                  borderRadius: 12,
                  marginBottom: 24,
                }}
              />

              {result.text && (
                <div
                  style={{
                    color: textColor,
                    lineHeight: 1.8,
                    padding: "20px",
                    background: isDarkMode ? "#262626" : "#f9fafb",
                    borderRadius: 12,
                  }}
                >
                  <ReactMarkdown>{result.text}</ReactMarkdown>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* History Section */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ marginTop: 64 }}
          >
            <Divider />
            <Title level={3} style={{ color: textColor, marginBottom: 32, textAlign: "center" }}>
              {t("historyTitle")}
            </Title>
            <Row gutter={[24, 24]}>
              {history.map((item) => (
                <Col xs={24} sm={12} md={8} key={item.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="Previous design"
                        src={item.resultImage}
                        style={{ height: 200, objectFit: "cover" }}
                      />
                    }
                    style={{
                      background: cardBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: 12,
                    }}
                    onClick={() => setResult(item)}
                  >
                    <Text style={{ color: textColor, fontSize: 12, opacity: 0.7 }}>
                      {item.timestamp}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </motion.div>
        )}

        {/* Save Project Modal */}
        <Modal
          title={t("saveProject")}
          open={saveModalVisible}
          onOk={handleSaveProject}
          onCancel={() => setSaveModalVisible(false)}
          confirmLoading={saving}
          okText={t("saveProject")}
          cancelText="취소"
        >
          <div style={{ padding: "20px 0" }}>
            <Text style={{ marginBottom: 8, display: "block" }}>{t("projectName")}</Text>
            <Input
              placeholder={t("projectNamePlaceholder")}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              size="large"
              style={{ borderRadius: 8 }}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
