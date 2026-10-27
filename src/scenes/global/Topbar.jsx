import {
  Box,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  useMediaQuery
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ColorModeContext, tokens } from "../../theme";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Topbar = ({ setIsSidebarOpen /* opcional: isSidebarOpen */ }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Estado e handlers para o menu de logout
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleMenuClose();
  };
  const handleCloseDialog = () => setOpenDialog(false);
  const handleConfirmLogout = () => {
    console.log("Usuário deslogado. Redirecionando para a página de login...");
    handleCloseDialog();
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexShrink: 0,
        p: { xs: 1, sm: 2 }
      }}>
      {/* HAMBÚRGUER NO MOBILE */}
      {isMobile && (
        <IconButton onClick={() => setIsSidebarOpen((prev) => !prev)}>
          <MenuOutlinedIcon />
        </IconButton>
      )}

      {/* Espaçador para empurrar os ícones da direita */}
      <Box sx={{
        flexGrow: 1
      }} />

      {/* ÍCONES DA DIREITA */}
      <Box sx={{
        display: "flex"
      }}>
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton> */}
        <IconButton onClick={handleProfileMenuOpen}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      {/* MENU DROPDOWN */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        id="primary-search-account-menu"
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{ "& .MuiPaper-root": { backgroundColor: colors.primary[400] } }}
      >
        <MenuItem onClick={handleOpenDialog}>
          <LogoutOutlinedIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* DIALOG DE CONFIRMAÇÃO */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        sx={{ "& .MuiPaper-root": { backgroundColor: colors.primary[400] } }}
      >
        <DialogTitle id="alert-dialog-title">{"Gostaria de sair?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: colors.grey[100] }}>
            Não
          </Button>
          <Button onClick={handleConfirmLogout} sx={{ color: colors.grey[100] }} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Topbar;
