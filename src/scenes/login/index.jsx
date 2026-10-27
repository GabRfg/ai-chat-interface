import { useState } from 'react';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography, useTheme } from "@mui/material";
import { keyframes } from '@emotion/react';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router";
import { tokens } from "../../theme";

// Animações permanecem as mesmas
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }`;

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

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginData = { email, password };
    console.log("Dados de Login (JSON):", JSON.stringify(loginData, null, 2));
    navigate("/dashboard");
  };

  return (
    <Box // Container de fundo (sem alterações)
      sx={{
        minHeight: '100dvh',
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
          // MELHORIA 1: Adiciona margem no mobile e ajusta o padding
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component='h1'
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 3,
            color: colors.grey[100],

            // MELHORIA 2: Ajusta o tamanho da fonte em telas menores
            fontSize: { xs: '1.75rem', sm: '2.125rem' }
          }}>
          Login
        </Typography>

        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="standard"
            placeholder="Email"
            name="email"
            fullWidth
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiInput-underline:before': { borderBottomColor: colors.grey[500] },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: colors.blueAccent[400] },
              '& .MuiInput-underline:after': { borderBottom: `2px solid ${colors.blueAccent[500]}` },
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 1,
              '& .MuiInput-underline:before': { borderBottomColor: colors.grey[500] },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: colors.blueAccent[400] },
              '& .MuiInput-underline:after': { borderBottom: `2px solid ${colors.blueAccent[500]}` },
              input: { color: colors.grey[100] },
            }}
          />
          <FormControlLabel
            control={<Checkbox sx={{
              color: colors.blueAccent[400],
              '&.Mui-checked': { color: colors.blueAccent[500] },
            }} />}
            label="Lembrar-se de mim"
            sx={{ color: colors.grey[200] }}
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
            Sign In
          </Button>

          {/* MELHORIA 3: Grid responsivo para os links */}
          <Grid
            container
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
            <Grid>
              <RouterLink to="/forgot" style={{ color: colors.blueAccent[400], textDecoration: 'none', fontSize: '0.9rem' }}>
                Esqueceu sua senha?
              </RouterLink>
            </Grid>
            <Grid>
              <RouterLink to="/register" style={{ color: colors.blueAccent[400], textDecoration: 'none', fontSize: '0.9rem' }}>
                Registrar-se
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;