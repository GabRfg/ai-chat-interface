import { Box, Button, TextField, MenuItem, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useParams, useNavigate } from "react-router";
import { mockDataTeam } from "../../data/mockData";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'; 

// 1. O componente agora recebe a prop 'isMobile'
const EditUser = ({ isMobile }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { id } = useParams();

  const userToEdit = mockDataTeam.find((user) => user.id.toString() === id);

  if (!userToEdit) {
    return (
      <Box sx={{
        m: "20px"
      }}>
        <Typography>Usuário não encontrado!</Typography>
      </Box>
    );
  }

  const handleFormSubmit = (values) => {
    console.log("ATUALIZANDO USUÁRIO:", values);
    navigate("/team");
  };

  const initialValues = {
    firstName: userToEdit.name.split(' ')[0],
    lastName: userToEdit.name.split(' ')[1] || "",
    email: userToEdit.email,
    contact: userToEdit.phone,
    // age: userToEdit.age,
    access: userToEdit.access,
    password: "",
    confirmPassword: "",
  };

  const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

  const userSchema = yup.object().shape({
    firstName: yup.string().required("O nome é obrigatório"),
    lastName: yup.string().required("O sobrenome é obrigatório"),
    email: yup.string().email("Formato de email inválido").required("O email é obrigatório"),
    contact: yup.string().matches(phoneRegExp, "Número de telefone não é válido").required("O contato é obrigatório"),
    // age: yup.number().positive().integer().required("A idade é obrigatória"),
    access: yup.string().oneOf(["admin", "manager", "user"]).required("O nível de acesso é obrigatório"),
    password: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: yup.string()
      .oneOf([yup.ref("password"), null], "As senhas não conferem")
      .when('password', (password, schema) => {
        return password && password.length > 0 ? schema.required('Confirme a senha') : schema;
      }),
  });

  return (
    <Box sx={{
      m: isMobile ? "10px" : "20px"
    }}>
      {/* 2. O cabeçalho agora se adapta a telas pequenas */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 2 : 0
        }}>
        <Header title="EDITAR USUÁRIO" subtitle={`Editando o perfil de ${userToEdit.name}`} />
        <Button
          onClick={() => navigate('/team')} 
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            width: isMobile ? "100%" : "auto",
            '&:hover': {
              backgroundColor: colors.blueAccent[600],
            }
          }}
        >
          <ArrowBackOutlinedIcon sx={{ mr: "10px" }} />
          Voltar para a Lista
        </Button>
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
        enableReinitialize
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                gap: "30px",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",

                // 3. A regra do grid agora usa 'isMobile' para tornar os campos responsivos
                "& > div": { gridColumn: isMobile ? "span 4" : undefined },

                mt: "30px"
              }}>
              {/* Para campos que devem ficar lado a lado no desktop, aplicamos a lógica de novo */}
              <TextField 
                  fullWidth variant="filled" 
                  type="text" 
                  label="Nome" 
                  onBlur={handleBlur} 
                  onChange={handleChange} 
                  value={values.firstName} 
                  name="firstName" 
                  error={!!touched.firstName && !!errors.firstName} 
                  helperText={touched.firstName && errors.firstName} 
                    sx={{ gridColumn: isMobile ? "span 4" : "span 2" }} 
              />
              <TextField 
                  fullWidth 
                  variant="filled" 
                  type="text" label="Sobrenome" 
                  onBlur={handleBlur} 
                  onChange={handleChange} 
                  value={values.lastName} 
                  name="lastName" 
                  error={!!touched.lastName && !!errors.lastName} 
                  helperText={touched.lastName && errors.lastName} 
                    sx={{ gridColumn: isMobile ? "span 4" : "span 2" }} 
              />
              {/* Campos de largura total se adaptam automaticamente com a regra do sx acima */}
              <TextField 
                  fullWidth 
                  variant="filled" 
                  type="text" label="Email" 
                  onBlur={handleBlur} 
                  onChange={handleChange} 
                  value={values.email} 
                  name="email" 
                  error={!!touched.email && !!errors.email} 
                  helperText={touched.email && errors.email} 
                    sx={{ gridColumn: "span 4" }} 
              />
              <TextField 
                  fullWidth 
                  variant="filled" 
                  type="password" 
                  label="Nova Senha (opcional)"
                  onBlur={handleBlur} 
                  onChange={handleChange} 
                  value={values.password} 
                  name="password" 
                  error={!!touched.password && !!errors.password} 
                  helperText={touched.password && errors.password} 
                    sx={{ gridColumn: isMobile ? "span 4" : "span 2" }} 
              />
              <TextField 
                  fullWidth 
                  variant="filled" 
                  type="password" 
                  label="Confirmar Nova Senha" 
                  onBlur={handleBlur} 
                  onChange={handleChange} 
                  value={values.confirmPassword} 
                  name="confirmPassword" 
                  error={!!touched.confirmPassword && !!errors.confirmPassword} 
                  helperText={touched.confirmPassword && errors.confirmPassword} 
                    sx={{ gridColumn: isMobile ? "span 4" : "span 2" }} 
              />
              <TextField 
                  fullWidth 
                  variant="filled" 
                  type="text" 
                  label="Número de Telefone" 
                  onBlur={handleBlur} 
                  onChange={handleChange} 
                  value={values.contact} 
                  name="contact" 
                  error={!!touched.contact && !!errors.contact} 
                  helperText={touched.contact && errors.contact} 
                    sx={{ gridColumn: "span 4" }} 
              />
              {/* <TextField 
                  fullWidth 
                  variant="filled" 
                  type="number" 
                  label="Idade" 
                  onBlur={handleBlur} 
                  onChange={handleChange} 
                  value={values.age} 
                  name="age" 
                  error={!!touched.age && !!errors.age} 
                  helperText={touched.age && errors.age} 
                    sx={{ gridColumn: isMobile ? "span 4" : "span 2" }} 
              /> */}
              <TextField 
                  fullWidth 
                  variant="filled" 
                  select label="Nível de Acesso" 
                  value={values.access} 
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  name="access" 
                  error={!!touched.access && !!errors.access} 
                  helperText={touched.access && errors.access} 
                    sx={{ gridColumn: isMobile ? "span 4" : "span 2" }}>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                mt: "20px"
              }}>
              <Button type="submit" 
                  sx={{ backgroundColor: colors.greenAccent[600], 
                        color: colors.grey[100], 
                        fontSize: "14px", 
                        fontWeight: "bold", 
                        padding: "10px 20px", '&:hover': 
                          { backgroundColor: colors.greenAccent[700] } }}>
                Salvar Alterações
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditUser;