import { useState } from "react";
import {
  Avatar,
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

export const SIDEBAR_WIDTH = 270;
export const SIDEBAR_COLLAPSED_WIDTH = 72;

const mockChatHistory = [
  "Monitor Fora de Quadro",
  "IT Service Launch Success",
  "Documento Sobre React Hooks",
  "Como fazer café dalgona",
  "Teste page",
  "Melhores práticas de UI/UX",
  "Cozinhar",
];

const adminItems = [
  { title: "Dashboard", to: "/dashboard", icon: <HomeOutlinedIcon /> },
  { title: "Usuários", to: "/team", icon: <PeopleOutlinedIcon /> },
  { title: "Criar Usuários", to: "/form", icon: <PersonAddOutlinedIcon /> },
];

const INITIAL_VISIBLE_COUNT = 5;

// Item de navegação: mostra tooltip com o título quando a sidebar está colapsada
const NavItem = ({ title, icon, selected, onClick, isCollapsed, nested = false, muted = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Tooltip title={isCollapsed ? title : ""} placement="right" disableInteractive>
      <ListItemButton
        selected={selected}
        onClick={onClick}
        sx={{
          minHeight: 44,
          mx: 1,
          px: 1.5,
          pl: nested && !isCollapsed ? 3 : 1.5,
          borderRadius: "8px",
          justifyContent: isCollapsed ? "center" : "flex-start",
          color: muted ? colors.grey[300] : colors.grey[100],
          "&.Mui-selected": {
            backgroundColor: colors.blueAccent[800],
            color: colors.blueAccent[200],
            "& .MuiListItemIcon-root": { color: colors.blueAccent[200] },
          },
          "&.Mui-selected:hover": { backgroundColor: colors.blueAccent[700] },
          "&:hover": { backgroundColor: colors.grey[800] },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isCollapsed ? 0 : 1.5,
            justifyContent: "center",
            color: "inherit",
          }}
        >
          {icon}
        </ListItemIcon>
        {!isCollapsed && (
          <ListItemText
            primary={title}
            slotProps={{ primary: { noWrap: true, sx: { fontSize: 14 } } }}
          />
        )}
      </ListItemButton>
    </Tooltip>
  );
};

const SidebarContent = ({ onNewChat, isCollapsed, onToggle, onNavigate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isShowingMore, setIsShowingMore] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(adminItems.some((item) => item.to === pathname));
  const [selectedChat, setSelectedChat] = useState(null);

  const visibleHistory = isShowingMore
    ? mockChatHistory
    : mockChatHistory.slice(0, INITIAL_VISIBLE_COUNT);

  const go = (to) => {
    navigate(to);
    onNavigate?.();
  };

  const subheaderSx = {
    backgroundColor: "transparent",
    color: colors.grey[300],
    lineHeight: "32px",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    px: 2.5,
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Cabeçalho: título + botão de colapsar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          px: isCollapsed ? 0 : 2.5,
          py: 1.5,
          minHeight: 64,
          flexShrink: 0,
        }}
      >
        {!isCollapsed && (
          <Typography variant="h3" sx={{ color: colors.grey[100], fontWeight: 600 }}>
            Chats
          </Typography>
        )}
        <IconButton
          onClick={onToggle}
          aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
          sx={{ color: colors.grey[100] }}
        >
          {isCollapsed ? <MenuOutlinedIcon /> : <MenuOpenOutlinedIcon />}
        </IconButton>
      </Box>

      {/* Perfil */}
      {!isCollapsed && (
        <Box sx={{ textAlign: "center", px: 2, pb: 2, flexShrink: 0 }}>
          <Avatar
            alt="Foto do usuário"
            src="/assets/user.jpeg"
            sx={{ width: 80, height: 80, mx: "auto" }}
          />
          <Typography variant="h4" sx={{ color: colors.grey[100], mt: 1.5, fontWeight: 600 }}>
            IA Interface
          </Typography>
          <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
            Desenvolvido para uso interno de empresas
          </Typography>
        </Box>
      )}

      {/* Lista rolável: só esta área rola, cabeçalho e perfil ficam fixos */}
      <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden", pb: 2 }}>
        <List disablePadding>
          <NavItem
            title="Nova conversa"
            icon={<AddCommentOutlinedIcon />}
            isCollapsed={isCollapsed}
            onClick={() => {
              setSelectedChat(null);
              onNewChat?.();
              go("/dashboard");
            }}
          />
        </List>

        <List
          disablePadding
          subheader={!isCollapsed && <ListSubheader sx={subheaderSx}>Recentes</ListSubheader>}
          sx={{ mt: 1 }}
        >
          {visibleHistory.map((chatTitle) => (
            <NavItem
              key={chatTitle}
              title={chatTitle}
              icon={<ChatBubbleOutlineIcon fontSize="small" />}
              isCollapsed={isCollapsed}
              selected={selectedChat === chatTitle}
              onClick={() => {
                setSelectedChat(chatTitle);
                onNavigate?.();
              }}
            />
          ))}
          {mockChatHistory.length > INITIAL_VISIBLE_COUNT && (
            <NavItem
              title={isShowingMore ? "Mostrar menos" : "Mostrar mais"}
              icon={isShowingMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              isCollapsed={isCollapsed}
              muted
              onClick={() => setIsShowingMore((prev) => !prev)}
            />
          )}
        </List>

        <List disablePadding sx={{ mt: 2 }}>
          <NavItem
            title="Administração"
            icon={<AdminPanelSettingsOutlinedIcon />}
            isCollapsed={isCollapsed}
            onClick={() => setIsAdminOpen((prev) => !prev)}
          />
          <Collapse in={isAdminOpen} timeout="auto" unmountOnExit>
            <List disablePadding>
              {adminItems.map((item) => (
                <NavItem
                  key={item.to}
                  {...item}
                  nested
                  isCollapsed={isCollapsed}
                  selected={pathname === item.to}
                  onClick={() => go(item.to)}
                />
              ))}
            </List>
          </Collapse>
        </List>
      </Box>
    </Box>
  );
};

// Desktop: Drawer permanente que colapsa para uma faixa de ícones.
// Mobile: Drawer temporário (overlay), aberto pelo botão da Topbar.
const Sidebar = ({ onNewChat, isMobile, isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const paperSx = {
    backgroundColor: colors.grey[900],
    backgroundImage: "none",
    borderRight: `1px solid ${colors.grey[800]}`,
    boxSizing: "border-box",
  };

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        anchor="left"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { ...paperSx, width: SIDEBAR_WIDTH, maxWidth: "85vw" } }}
      >
        <SidebarContent
          onNewChat={onNewChat}
          isCollapsed={false}
          onToggle={() => setIsSidebarOpen(false)}
          onNavigate={() => setIsSidebarOpen(false)}
        />
      </Drawer>
    );
  }

  const width = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;
  const widthTransition = theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter,
  });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        transition: widthTransition,
        "& .MuiDrawer-paper": {
          ...paperSx,
          width,
          position: "relative", // fica no fluxo do flex, sem sobrepor o conteúdo
          overflowX: "hidden",
          transition: widthTransition,
        },
      }}
    >
      <SidebarContent
        onNewChat={onNewChat}
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed((prev) => !prev)}
      />
    </Drawer>
  );
};

export default Sidebar;
