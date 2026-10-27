import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ mb: { xs: "20px", md: "30px" }, minWidth: 0 }}>
      <Typography
        variant="h2"
        sx={{
          color: colors.grey[100],
          fontWeight: "bold",
          mb: "5px",
          fontSize: { xs: 26, md: 32 },
        }}>
        {title}
      </Typography>
      <Typography variant="h5" sx={{ color: colors.greenAccent[400] }}>{subtitle}</Typography>
    </Box>
  );
}

export default Header;
