import { Avatar, Box, Button, Grid, TextField, Typography, useTheme } from "@mui/material";
import { keyframes } from '@emotion/react';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { Link as RouterLink } from "react-router";
import { tokens } from "../../theme";

// Animações permanecem as mesmas
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log('Dados de registro:', {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box // Container de fundo (sem alterações)
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(-45deg, ${colors.primary[900]}, ${colors.primary[700]}, ${colors.blueAccent[800]}, ${colors.primary[900]})`,
        backgroundSize: '400% 400%',
        animation: `${gradientAnimation} 15s ease infinite`,
      }}
    >
      <Box // Card do formulário
        sx={{
          // Este formulário é maior, então ajustamos o maxWidth
          maxWidth: 450,
          width: '100%',
          // MELHORIA 1: Padding e margem responsivos
          m: { xs: 2, sm: 3 },
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: 'rgba(12, 16, 27, 0.5)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${colors.primary[700]}`,
          borderRadius: '16px',
          boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37)`,
          animation: `${fadeInUp} 0.8s ease-out`,
        }}
      >
        <Avatar sx={{
          m: '0 auto 16px auto',
          width: 56,
          height: 56,
          backgroundColor: colors.blueAccent[600],
        }}>
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography
          component='h1'
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: colors.grey[100],

            // MELHORIA 2: Tamanho de fonte do título responsivo
            fontSize: { xs: '1.75rem', sm: '2.125rem' }
          }}>
          Criar Conta
        </Typography>
        <Typography variant="body2" sx={{
          textAlign: "center",
          mt: 1,
          mb: 3,
          color: colors.grey[300]
        }}>
          Crie seu novo perfil para acessar nossa plataforma.
        </Typography>

        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* MELHORIA 3: Este Grid já era responsivo! Nenhuma alteração necessária aqui. */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                variant="standard"
                placeholder="Nome"
                name="firstName"
                fullWidth
                required
                autoFocus
                sx={{
                  '& .MuiInput-underline:before': { borderBottomColor: colors.grey[500] },
                  input: { color: colors.grey[100] },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                variant="standard"
                placeholder="Sobrenome"
                name="lastName"
                fullWidth
                required
                sx={{
                  '& .MuiInput-underline:before': { borderBottomColor: colors.grey[500] },
                  input: { color: colors.grey[100] },
                }}
              />
            </Grid>
          </Grid>
          <TextField
            variant="standard"
            placeholder="Seu endereço de e-mail"
            name="email"
            fullWidth
            required
            sx={{
              mt: 2, // Ajuste de margem
              '& .MuiInput-underline:before': { borderBottomColor: colors.grey[500] },
              input: { color: colors.grey[100] },
            }}
          />
          <TextField
            variant="standard"
            placeholder="Senha"
            name="password"
            fullWidth
            required
            type="password"
            sx={{
              mt: 2, // Ajuste de margem
              '& .MuiInput-underline:before': { borderBottomColor: colors.grey[500] },
              input: { color: colors.grey[100] },
            }}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 4, mb: 2, p: '12px',
              fontWeight: 'bold',
              color: colors.grey[100],
              background: `linear-gradient(45deg, ${colors.greenAccent[500]} 30%, ${colors.blueAccent[500]} 90%)`,
              // ...outros estilos
            }}
          >
            Criar Conta
          </Button>

          <Grid container sx={{
            justifyContent: "center"
          }}>
            <Grid>
              <RouterLink to="/" style={{
                color: colors.blueAccent[400],
                textDecoration: 'none',
                // MELHORIA 4: Consistência no tamanho da fonte do link
                fontSize: '0.9rem'
              }}>
                Já tem uma conta? Voltar para o Login
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;