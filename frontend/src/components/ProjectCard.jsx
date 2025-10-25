import { Card, Tag, Tooltip } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  EyeOutlined,
  CalendarOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { useState } from "react";

const ProjectCard = ({ project, onView, onDelete, isDarkMode, t }) => {
  const [liked, setLiked] = useState(false);

  const cardBg = isDarkMode ? "#1f1f1f" : "#ffffff";
  const textColor = isDarkMode ? "#e5e5e5" : "#333333";
  const borderColor = isDarkMode ? "#333333" : "#e8e8e8";

  return (
    <Card
      hoverable
      cover={
        <div style={{ position: "relative", overflow: "hidden", height: 240 }}>
          <img
            alt={project.name}
            src={project.redesigned_image_url || project.original_image_url}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              display: "flex",
              gap: 8,
            }}
          >
            <Tooltip title={liked ? "좋아요 취소" : "좋아요"}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {liked ? (
                  <HeartFilled style={{ fontSize: 18, color: "#ff4d4f" }} />
                ) : (
                  <HeartOutlined style={{ fontSize: 18, color: "#333" }} />
                )}
              </div>
            </Tooltip>
          </div>
        </div>
      }
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 16,
        overflow: "hidden",
      }}
      bodyStyle={{ padding: "16px" }}
      onClick={() => onView(project)}
    >
      <div style={{ marginBottom: 12 }}>
        <h3
          style={{
            color: textColor,
            margin: 0,
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          {project.name}
        </h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag color="blue">{t(project.design_type)}</Tag>
          <Tag color="green">{t(project.room_type)}</Tag>
          <Tag color="purple">{t(project.style)}</Tag>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          paddingTop: 12,
          borderTop: `1px solid ${borderColor}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <CalendarOutlined style={{ color: textColor, opacity: 0.6 }} />
          <span style={{ color: textColor, opacity: 0.6, fontSize: 12 }}>
            {new Date(project.created_at).toLocaleDateString("ko-KR")}
          </span>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <Tooltip title="자세히 보기">
            <EyeOutlined
              style={{
                fontSize: 18,
                color: isDarkMode ? "#38bdf8" : "#1677ff",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onView(project);
              }}
            />
          </Tooltip>
          <Tooltip title="삭제">
            <DeleteOutlined
              style={{
                fontSize: 18,
                color: "#ff4d4f",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(project.id);
              }}
            />
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
