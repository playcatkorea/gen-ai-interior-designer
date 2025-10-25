import { Card, Typography, Row, Col } from "antd";
import { PlayCircleOutlined, EyeOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const YouTubeRecommendations = ({ videos, isDarkMode, t }) => {
  const cardBg = isDarkMode ? "#1f1f1f" : "#ffffff";
  const textColor = isDarkMode ? "#e5e5e5" : "#333333";
  const borderColor = isDarkMode ? "#333333" : "#e8e8e8";

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <Card
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 16,
        marginTop: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div
          style={{
            background: isDarkMode ? "#dc2626" : "#fee2e2",
            borderRadius: 12,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PlayCircleOutlined
            style={{
              fontSize: 20,
              color: isDarkMode ? "#fff" : "#dc2626",
            }}
          />
        </div>
        <Title level={4} style={{ margin: 0, color: textColor }}>
          📺 추천 YouTube 튜토리얼
        </Title>
      </div>

      <Row gutter={[16, 16]}>
        {videos.map((video, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Card
                hoverable
                cover={
                  <div style={{ position: "relative" }}>
                    <img
                      alt={video.title}
                      src={video.thumbnail}
                      style={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(0, 0, 0, 0.7)",
                        borderRadius: "50%",
                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(220, 38, 38, 0.9)";
                        e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)";
                        e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)";
                      }}
                    >
                      <PlayCircleOutlined style={{ fontSize: 24, color: "#fff" }} />
                    </div>
                  </div>
                }
                style={{
                  background: isDarkMode ? "#262626" : "#f9fafb",
                  border: `1px solid ${borderColor}`,
                  borderRadius: 12,
                }}
                bodyStyle={{ padding: 12 }}
              >
                <Text
                  style={{
                    color: textColor,
                    fontSize: 14,
                    fontWeight: 500,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: 1.4,
                    marginBottom: 8,
                  }}
                >
                  {video.title}
                </Text>
                <Text
                  style={{
                    color: textColor,
                    opacity: 0.6,
                    fontSize: 12,
                    display: "block",
                  }}
                >
                  {video.channel}
                </Text>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default YouTubeRecommendations;
