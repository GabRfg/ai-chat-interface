import { useState } from 'react';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, useTheme, useMediaQuery } from "@mui/material";
import 'react-pro-sidebar/dist/css/styles.css';
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import Login from "./scenes/login";
import Form from "./scenes/form";
import ForgotPassword from "./scenes/forgot";
import Register from "./scenes/register";
import EditUser from "./scenes/editUser";

// Componente interno para o layout principal da aplicação
const MainLayout = () => {
  const theme = useTheme();
  const location = useLocation();

  // --- LÓGICA DE RESPONSIVIDADE E ESTADO CENTRALIZADOS ---
  const isMobile = useMediaQuery(theme.breakpoints.down("md", "sm", "xs"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile); // A sidebar começa fechada no mobile
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const handleNewChat = async () => {
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

  // Se não for standalone, renderiza o layout completo
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
        <Routes>
          <Route 
            path="/dashboard" 
            element={<Dashboard messages={messages} setMessages={setMessages} chatId={activeChatId} isMobile={isMobile} />} 
          />
          <Route path="/team" element={<Team isMobile={isMobile} />} />
          <Route path="/form" element={<Form isMobile={isMobile} />} />
          <Route path="/edit-user/:id" element={<EditUser isMobile={isMobile} />} /> 
        </Routes>
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