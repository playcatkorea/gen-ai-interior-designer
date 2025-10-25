import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, ConfigProvider, theme } from "antd";
import { Toaster } from "react-hot-toast";
import { translations, getTranslation } from "./locales/translations";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MyProjects from "./pages/MyProjects";

const { Content: AntContent } = Layout;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("language");
    return saved || "ko";
  });

  const [userEmail] = useState("guest@example.com"); // Default user email

  const { defaultAlgorithm, darkAlgorithm } = theme;

  // 번역 헬퍼 함수
  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#667eea",
          borderRadius: 8,
        },
      }}
    >
      <Layout style={{ minHeight: "100vh", background: isDarkMode ? "#0f0f0f" : "#f9fafb" }}>
        <Navigation
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />

        <AntContent>
          <Routes>
            <Route
              path="/"
              element={<Home isDarkMode={isDarkMode} t={t} userEmail={userEmail} />}
            />
            <Route
              path="/projects"
              element={<MyProjects isDarkMode={isDarkMode} t={t} userEmail={userEmail} />}
            />
          </Routes>
        </AntContent>

        <Footer isDarkMode={isDarkMode} />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDarkMode ? "#1f1f1f" : "#ffffff",
              color: isDarkMode ? "#e5e5e5" : "#333333",
              border: isDarkMode ? "1px solid #333" : "1px solid #e8e8e8",
            },
          }}
        />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
