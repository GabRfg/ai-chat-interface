import { useState } from "react"; 
import {  
  Box, 
  Typography, 
  useTheme, 
  Button, 
  IconButton,
  Dialog, DialogActions, 
  DialogTitle, 
  DialogContent, 
  DialogContentText } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import { useNavigate } from "react-router";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Header from "../../components/Header";

const Team = ({ isMobile }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [users, setUsers] = useState(mockDataTeam);
  
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    userId: null,
    userName: ''
  });

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const handleDeleteClick = (id, name) => {
    setDeleteConfirmation({
      isOpen: true,
      userId: id,
      userName: name,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.userId) {
      setUsers(users.filter((user) => user.id !== deleteConfirmation.userId));
      setDeleteConfirmation({ isOpen: false, userId: null, userName: '' });
    }
  };

  const handleCloseDialog = () => {
    setDeleteConfirmation({ isOpen: false, userId: null, userName: '' });
  };


  let columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Nome", flex: 1, cellClassName: "name-column--cell" },
    { field: "phone", headerName: "Contato", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1 },
    {
      field: "access",
      headerName: "Nivel de acesso",
      flex: 1,
      renderCell: ({ row: { access } }) => (
        <Box
          sx={{
            m: "0 auto",
            p: "5px 10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: access === 'admin' ? colors.greenAccent[600] : colors.greenAccent[700],
            borderRadius: "4px"
          }}>
          {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
          {access === "manager" && <SecurityOutlinedIcon />}
          {access === "user" && <LockOpenOutlinedIcon />}
          <Typography
            color={colors.grey[100]} 
              sx={{ ml: "5px" }}>{access}
          </Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Ações",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%"
          }}>
          <IconButton 
            onClick={() => handleEdit(params.row.id)}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton 
            onClick={() => handleDeleteClick(params.row.id, params.row.name)}
              sx={{ color: colors.redAccent[500] }}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  if (isMobile) {
    columns = columns.filter(
      (col) => col.field === 'name' || col.field === 'access' || col.field === 'actions'
    );
  }

  return (
    <Box sx={{
      m: isMobile ? "10px" : "20px"
    }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 2 : 0
        }}>
        <Header 
          title="Usuários" 
          subtitle="Administração de usuários da IA" />
        <Button
          onClick={() => navigate('/form')}
          sx={{
            backgroundColor: colors.blueAccent[700], 
            color: colors.grey[100],
            fontSize: "14px", 
            fontWeight: "bold", 
            padding: "10px 20px",
            width: isMobile ? "100%" : "auto",
            '&:hover': { backgroundColor: colors.blueAccent[600] }
          }}
        >
          <AddOutlinedIcon sx={{ mr: "10px" }} />
          Criar Novo Usuário
        </Button>
      </Box>
      <Box
        sx={{
          m: "20px 0 0 0",
          overflow: "auto",
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.blackAccent[800] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] }
        }}>
        <DataGrid
          // autoHeight
          rows={users} 
          columns={columns}
        />
      </Box>

      <Dialog
        open={deleteConfirmation.isOpen}
        onClose={handleCloseDialog}
        aria-labelledby="delete-dialog-title"
        sx={{
            '& .MuiDialog-paper': {
                backgroundColor: colors.primary[400],
                backgroundImage: 'none'
            }
        }}
      >
        <DialogTitle id="delete-dialog-title">
            {"Confirmar Deleção"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText color={colors.grey[100]}>
                Gostaria mesmo de deletar o usuário "{deleteConfirmation.userName}"?
                <br/>
                Esta ação não pode ser desfeita.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: colors.grey[100] }}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} sx={{ color: colors.redAccent[500] }} autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;