import { Link, useLocation } from "react-router-dom";
import { Layout, Typography, Switch, Button, Menu } from "antd";
import {
  HomeOutlined,
  FolderOutlined,
  BulbFilled,
  BulbOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Header } = Layout;
const { Title } = Typography;

const Navigation = ({ isDarkMode, setIsDarkMode, language, setLanguage, t }) => {
  const location = useLocation();
  const textColor = isDarkMode ? "#e5e5e5" : "#333333";

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/" style={{ color: textColor }}>{t("home")}</Link>,
    },
    {
      key: "/projects",
      icon: <FolderOutlined />,
      label: <Link to="/projects" style={{ color: textColor }}>{t("myProjects")}</Link>,
    },
  ];

  return (
    <Header
      style={{
        background: isDarkMode ? "#1a1a1a" : "#ffffff",
        borderBottom: `1px solid ${isDarkMode ? "#333" : "#e8e8e8"}`,
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Title
            level={3}
            style={{
              margin: 0,
              color: textColor,
              fontSize: "1.5rem",
              fontWeight: 700,
              background: isDarkMode
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("title")}
          </Title>
        </Link>
      </motion.div>

      {/* Menu */}
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{
          background: "transparent",
          border: "none",
          flex: 1,
          marginLeft: 40,
          minWidth: 0,
        }}
      />

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: "flex", gap: 16, alignItems: "center" }}
      >
        {/* Language Toggle */}
        <Button
          onClick={() => setLanguage(language === "ko" ? "en" : "ko")}
          icon={<GlobalOutlined />}
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: 8,
            fontWeight: 500,
          }}
        >
          {language === "ko" ? "EN" : "한글"}
        </Button>

        {/* Dark Mode Toggle */}
        <Switch
          checked={isDarkMode}
          onChange={setIsDarkMode}
          checkedChildren={<BulbFilled />}
          unCheckedChildren={<BulbOutlined />}
          style={{ marginLeft: 8 }}
        />
      </motion.div>
    </Header>
  );
};

export default Navigation;
