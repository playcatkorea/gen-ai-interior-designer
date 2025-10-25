import { Card, Typography, Divider } from "antd";
import {
  BulbOutlined,
  CheckCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const DesignTips = ({ tips, palette, isDarkMode, t }) => {
  const cardBg = isDarkMode ? "#1f1f1f" : "#ffffff";
  const textColor = isDarkMode ? "#e5e5e5" : "#333333";
  const borderColor = isDarkMode ? "#333333" : "#e8e8e8";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* 디자인 팁 */}
      {tips && tips.length > 0 && (
        <Card
          style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div
              style={{
                background: isDarkMode ? "#2563eb" : "#eff6ff",
                borderRadius: 12,
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BulbOutlined
                style={{
                  fontSize: 20,
                  color: isDarkMode ? "#fff" : "#2563eb",
                }}
              />
            </div>
            <Title level={4} style={{ margin: 0, color: textColor }}>
              💡 디자인 팁
            </Title>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {tips.map((tip, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "12px 16px",
                  background: isDarkMode ? "#262626" : "#f9fafb",
                  borderRadius: 8,
                  transition: "all 0.2s",
                }}
              >
                <CheckCircleOutlined
                  style={{
                    fontSize: 18,
                    color: "#22c55e",
                    marginTop: 2,
                  }}
                />
                <Text style={{ color: textColor, flex: 1, lineHeight: 1.6 }}>
                  {tip}
                </Text>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 컬러 팔레트 */}
      {palette && (
        <Card
          style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div
              style={{
                background: isDarkMode ? "#7c3aed" : "#f5f3ff",
                borderRadius: 12,
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StarOutlined
                style={{
                  fontSize: 20,
                  color: isDarkMode ? "#fff" : "#7c3aed",
                }}
              />
            </div>
            <Title level={4} style={{ margin: 0, color: textColor }}>
              🎨 추천 컬러 팔레트
            </Title>
          </div>

          <Paragraph style={{ color: textColor, opacity: 0.8, marginBottom: 16 }}>
            {palette.description}
          </Paragraph>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Primary Colors */}
            <div>
              <Text
                style={{
                  color: textColor,
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  opacity: 0.7,
                  marginBottom: 8,
                  display: "block",
                }}
              >
                Primary Colors
              </Text>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {palette.primary.map((color, index) => (
                  <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        background: color,
                        borderRadius: 8,
                        border: `2px solid ${borderColor}`,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Text
                      style={{
                        color: textColor,
                        fontSize: 11,
                        fontFamily: "monospace",
                        opacity: 0.7,
                      }}
                    >
                      {color}
                    </Text>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Colors */}
            {palette.accent && palette.accent.length > 0 && (
              <div>
                <Text
                  style={{
                    color: textColor,
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    opacity: 0.7,
                    marginBottom: 8,
                    display: "block",
                  }}
                >
                  Accent Colors
                </Text>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {palette.accent.map((color, index) => (
                    <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          background: color,
                          borderRadius: 8,
                          border: `2px solid ${borderColor}`,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Text
                        style={{
                          color: textColor,
                          fontSize: 11,
                          fontFamily: "monospace",
                          opacity: 0.7,
                        }}
                      >
                        {color}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default DesignTips;
