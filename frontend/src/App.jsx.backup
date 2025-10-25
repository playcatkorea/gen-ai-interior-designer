import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Select,
  Input,
  Button,
  Typography,
  Switch,
  Layout,
  ConfigProvider,
  theme,
  Row,
  Col,
  Divider,
} from "antd";
import { BulbFilled, BulbOutlined, GlobalOutlined } from "@ant-design/icons";
import ImageUpload from "./components/ImageUpload";
import Footer from "./components/Footer";
import MarkdownCard from "./components/MarkdownCard";
import ReactMarkdown from "react-markdown";
import { translations, getTranslation } from "./locales/translations";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// API URL 환경 변수 설정
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function App() {
  const [homeImage, setHomeImage] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [designType, setDesignType] = useState("");
  const [roomType, setRoomType] = useState("");
  const [style, setStyle] = useState("");
  const [history, setHistory] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("language");
    return saved || "ko";
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const { defaultAlgorithm, darkAlgorithm } = theme;

  // 번역 헬퍼 함수
  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

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

  const textColor = isDarkMode ? "#e4e4e4" : "#111827";
return (
  <ConfigProvider
    theme={{
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      token: {
        colorPrimary: "#0ea5e9",
        borderRadius: 10,
      },
    }}
  >
    <Layout style={{ minHeight: "100vh", background: isDarkMode ? "#0f0f0f" : "#f9fafb" }}>
      <Header
        style={{
          background: "transparent",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem 1rem",
          flexWrap: "wrap",
        }}
      >
        <Title level={3} style={{ margin: 0, color: textColor, fontSize: "1.5rem", flex: 1 }}>
          {t("title")}
        </Title>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
          <Button
            onClick={() => setLanguage(language === "ko" ? "en" : "ko")}
            icon={<GlobalOutlined />}
            style={{ display: "flex", alignItems: "center" }}
          >
            {language === "ko" ? "EN" : "한글"}
          </Button>
          <Switch
            checked={isDarkMode}
            onChange={setIsDarkMode}
            checkedChildren={<BulbFilled />}
            unCheckedChildren={<BulbOutlined />}
          />
        </div>
      </Header>

      <Content style={{ padding: "2rem 1rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <Title level={2} style={{ color: textColor, textAlign: "center", marginBottom: "2rem" }}>
            {t("subtitle")}
          </Title>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <Row gutter={[24, 24]} justify="center" style={{ flexWrap: "wrap" }}>
              <Col xs={24} sm={24} md={24} lg={12}>
                <ImageUpload
                  label={t("uploadImage")}
                  onImageChange={setHomeImage}
                  isDarkMode={isDarkMode}
                  t={t}
                />
              </Col>

              <Col xs={24} sm={24} md={24} lg={12}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <Text style={{ color: textColor }}>{t("designType")}</Text>
                    <Select
                      placeholder={t("designTypePlaceholder")}
                      style={{ width: "100%", marginTop: 4 }}
                      value={designType}
                      onChange={setDesignType}
                    >
                      <Option value="interior">{t("interior")}</Option>
                      <Option value="exterior">{t("exterior")}</Option>
                    </Select>
                  </div>

                  <div>
                    <Text style={{ color: textColor }}>{t("roomType")}</Text>
                    <Select
                      placeholder={t("roomTypePlaceholder")}
                      style={{ width: "100%", marginTop: 4 }}
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

                  <div>
                    <Text style={{ color: textColor }}>{t("designStyle")}</Text>
                    <Select
                      placeholder={t("designStylePlaceholder")}
                      style={{ width: "100%", marginTop: 4 }}
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

                  <Row gutter={16}>
                    <Col xs={12}>
                      <Text style={{ color: textColor }}>{t("backgroundColor")}</Text>
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
                    <Col xs={12}>
                      <Text style={{ color: textColor }}>{t("foregroundColor")}</Text>
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
                </div>
              </Col>
            </Row>

            <div style={{ marginTop: 32 }}>
              <Text style={{ color: textColor }}>{t("additionalInstructions")}</Text>
              <Input.TextArea
                rows={4}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                style={{ width: "100%", marginTop: 8 }}
                placeholder={t("instructionsPlaceholder")}
              />
            </div>

            <div style={{ textAlign: "center", marginTop: 40 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                style={{ width: 200, height: 48 }}
              >
                {loading ? t("generating") : t("generate")}
              </Button>
            </div>
          </form>

          {/* RESULT */}
          {result && (
            <div ref={resultRef} style={{ marginTop: 64, textAlign: "center" }}>
              <Divider />
              <Title level={3} style={{ color: textColor }}>
                {t("resultTitle")}
              </Title>
              <img
                src={result.resultImage}
                alt="AI Design Result"
                style={{
                  width: "100%",
                  maxWidth: "680px",
                  maxHeight: "600px",
                  objectFit: "contain",
                  borderRadius: 16,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                  margin: "0 auto 24px",
                  display: "block",
                }}
              />
              {result.text && (
              <MarkdownCard text={result.text} isDarkMode={isDarkMode} />
              )}
            </div>
          )}

          {/* HISTORY */}
          {history.length > 0 && (
            <div style={{ marginTop: 80 }}>
              <Divider />
              <Title level={3} style={{ color: textColor, marginBottom: 32 }}>
                {t("historyTitle")}
              </Title>
              <Row gutter={[24, 24]}>
                {history.map((item) => (
                  <Col xs={24} sm={12} md={8} key={item.id}>
                    <div
                      style={{
                        background: isDarkMode ? "#1f1f1f" : "#ffffff",
                        padding: 16,
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        height: "100%",
                      }}
                    >
                      <img
                        src={item.resultImage}
                        alt="Previous"
                        style={{
                          width: "100%",
                          borderRadius: 10,
                          marginBottom: 12,
                        }}
                      />
                      <ReactMarkdown
  children={item.text}
  style={{
    maxWidth: "680px",
    margin: "0 auto",
    padding: "1rem",
    background: isDarkMode ? "#1f1f1f" : "#f1f5f9",
    borderRadius: 12,
    overflowY: "auto",
    maxHeight: "400px",
    color: textColor,
    lineHeight: 1.6,
  }}
/>
                      <Text
                        style={{
                          color: isDarkMode ? "#a1a1aa" : "#666",
                          fontSize: 12,
                        }}
                      >
                        {item.timestamp}
                      </Text>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      </Content>

      <Footer isDarkMode={isDarkMode} />
      <ToastContainer theme={isDarkMode ? "dark" : "light"} />
    </Layout>
  </ConfigProvider>
);


}

export default App;