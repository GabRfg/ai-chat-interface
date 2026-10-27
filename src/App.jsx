import { lazy, Suspense, useState } from 'react';
import { ColorModeContext, useMode } from "./theme";
import { Box, CircularProgress, CssBaseline, ThemeProvider, useTheme, useMediaQuery } from "@mui/material";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import ForgotPassword from "./scenes/forgot";
import Register from "./scenes/register";

// Telas de administração carregadas sob demanda (o Data Grid é pesado)
const Team = lazy(() => import("./scenes/team"));
const Form = lazy(() => import("./scenes/form"));
const EditUser = lazy(() => import("./scenes/editUser"));

const PageLoader = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
    <CircularProgress color="secondary" />
  </Box>
);

// Componente interno para o layout principal da aplicação
const MainLayout = () => {
  const theme = useTheme();
  const location = useLocation();

  // --- LÓGICA DE RESPONSIVIDADE E ESTADO CENTRALIZADOS ---
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // só usado no mobile (Drawer temporário)
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const handleNewChat = () => {
    setMessages([]);
    const newChatId = `${Date.now()}`;
    setActiveChatId(newChatId);
    console.log(`Nova conversa criada com ID: ${newChatId}`);
  };

  const standaloneRoutes = ["/", "/forgot", "/register"];
  const isStandaloneRoute = standaloneRoutes.includes(location.pathname);

  if (isStandaloneRoute) {
    // Se for uma rota standalone, renderiza apenas o conteúdo da rota
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  // Layout completo: a janela não rola; só a área de conteúdo (.page) rola
  return (
    <div className="app">
      <Sidebar
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onNewChat={handleNewChat}
      />
      <main className="content">
        <Topbar setIsSidebarOpen={setIsSidebarOpen} />
        <div className="page">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route
                path="/dashboard"
                element={<Dashboard messages={messages} setMessages={setMessages} chatId={activeChatId} isMobile={isMobile} />}
              />
              <Route path="/team" element={<Team isMobile={isMobile} />} />
              <Route path="/form" element={<Form isMobile={isMobile} />} />
              <Route path="/edit-user/:id" element={<EditUser isMobile={isMobile} />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
};


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
