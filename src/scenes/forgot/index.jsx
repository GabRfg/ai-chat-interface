import { Avatar, Box, Button, Grid, TextField, Typography, useTheme } from "@mui/material";
import { keyframes } from '@emotion/react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
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

const ForgotPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log('Enviando link de recuperação para:', data.get('email'));
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
          maxWidth: 400,
          width: '100%',
          // MELHORIA 1: Padding e margem responsivos
          m: { xs: 2, sm: 3 },
          p: { xs: 2, sm: 4 },
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
          <EmailOutlinedIcon />
        </Avatar>
        <Typography
          component='h1'
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: colors.grey[100],

            // MELHORIA 2: Tamanho de fonte do título responsivo
            fontSize: { xs: '1.6rem', sm: '2.125rem' }
          }}>
          Recuperar Senha
        </Typography>
        <Typography variant="body2" sx={{
          textAlign: "center",
          mt: 1,
          mb: 3,
          color: colors.grey[300]
        }}>
          Insira seu e-mail e enviaremos um link para você voltar a acessar sua conta.
        </Typography>

        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="standard"
            placeholder="Seu endereço de e-mail"
            name="email"
            fullWidth
            required
            autoFocus
            sx={{
              mb: 2,
              '& .MuiInput-underline:before': { borderBottomColor: colors.grey[500] },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: colors.blueAccent[400] },
              '& .MuiInput-underline:after': { borderBottom: `2px solid ${colors.blueAccent[500]}` },
              input: { color: colors.grey[100] },
            }}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3, mb: 2, p: '12px',
              fontWeight: 'bold',
              color: colors.grey[100],
              background: `linear-gradient(45deg, ${colors.greenAccent[500]} 30%, ${colors.blueAccent[500]} 90%)`,
              border: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 20px -10px ${colors.blueAccent[700]}`,
                opacity: 0.9,
              }
            }}
          >
            Enviar Link de Recuperação
          </Button>

          <Grid container sx={{
            justifyContent: "center"
          }}>
            <Grid>
              {/* MELHORIA 3: Adiciona um tamanho de fonte menor para o link */}
              <RouterLink to="/" style={{
                color: colors.blueAccent[400],
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}>
                Lembrou a senha? Voltar para o Login
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default ForgotPassword;