import { useState, useEffect } from "react";
import { Layout, Typography, Row, Col, Empty, Spin, Input, Select, Button } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
import { toast } from "react-hot-toast";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const MyProjects = ({ isDarkMode, t, userEmail }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStyle, setFilterStyle] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const textColor = isDarkMode ? "#e5e5e5" : "#333333";
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/projects`, {
        params: userEmail ? { user_email: userEmail } : {},
      });

      if (response.data.success) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      toast.error("프로젝트 목록을 불러오는데 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!confirm("정말 이 프로젝트를 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`${API_URL}/api/projects/${projectId}`);
      toast.success("프로젝트가 삭제되었습니다");
      fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("프로젝트 삭제에 실패했습니다");
    }
  };

  const handleViewProject = (project) => {
    // TODO: Navigate to project detail page
    console.log("View project:", project);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStyle = filterStyle === "all" || project.style === filterStyle;
    const matchesType = filterType === "all" || project.design_type === filterType;
    return matchesSearch && matchesStyle && matchesType;
  });

  return (
    <Content style={{ padding: "2rem 1rem", minHeight: "calc(100vh - 200px)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <Title level={2} style={{ color: textColor, margin: 0, marginBottom: 8 }}>
              내 프로젝트
            </Title>
            <Text style={{ color: textColor, opacity: 0.7 }}>
              저장된 디자인 프로젝트를 관리하세요
            </Text>
          </div>

          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => (window.location.href = "/")}
            style={{ borderRadius: 8 }}
          >
            새 디자인 만들기
          </Button>
        </div>

        {/* Filters */}
        <div
          style={{
            background: isDarkMode ? "#1f1f1f" : "#ffffff",
            padding: "20px 24px",
            borderRadius: 16,
            marginBottom: 24,
            border: isDarkMode ? "1px solid #333" : "1px solid #e8e8e8",
          }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input
                placeholder="프로젝트 검색..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="large"
                style={{ borderRadius: 8 }}
              />
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Select
                value={filterType}
                onChange={setFilterType}
                size="large"
                style={{ width: "100%", borderRadius: 8 }}
              >
                <Option value="all">모든 타입</Option>
                <Option value="interior">실내</Option>
                <Option value="exterior">실외</Option>
              </Select>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Select
                value={filterStyle}
                onChange={setFilterStyle}
                size="large"
                style={{ width: "100%", borderRadius: 8 }}
              >
                <Option value="all">모든 스타일</Option>
                <Option value="modern">모던</Option>
                <Option value="minimalist">미니멀</Option>
                <Option value="rustic">러스틱</Option>
                <Option value="bohemian">보헤미안</Option>
                <Option value="classic">클래식</Option>
              </Select>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <Button
                  icon={<AppstoreOutlined />}
                  type={viewMode === "grid" ? "primary" : "default"}
                  onClick={() => setViewMode("grid")}
                  style={{ borderRadius: 8 }}
                >
                  그리드
                </Button>
                <Button
                  icon={<UnorderedListOutlined />}
                  type={viewMode === "list" ? "primary" : "default"}
                  onClick={() => setViewMode("list")}
                  style={{ borderRadius: 8 }}
                >
                  리스트
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <Spin size="large" />
            <p style={{ color: textColor, marginTop: 16 }}>프로젝트를 불러오는 중...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <Empty
            description={
              <Text style={{ color: textColor }}>
                {projects.length === 0
                  ? "아직 저장된 프로젝트가 없습니다"
                  : "검색 결과가 없습니다"}
              </Text>
            }
            style={{ padding: "4rem 0" }}
          />
        ) : (
          <Row gutter={[24, 24]}>
            {filteredProjects.map((project) => (
              <Col
                xs={24}
                sm={viewMode === "grid" ? 12 : 24}
                md={viewMode === "grid" ? 8 : 24}
                lg={viewMode === "grid" ? 6 : 24}
                key={project.id}
              >
                <ProjectCard
                  project={project}
                  onView={handleViewProject}
                  onDelete={handleDeleteProject}
                  isDarkMode={isDarkMode}
                  t={t}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Content>
  );
};

export default MyProjects;
