import { createContext, useState, useMemo } from "react";
import { createTheme } from '@mui/material/styles';

export const tokens = (mode) => ({
  ...(mode === 'dark'
    ? {
        grey: {
          100: "#e0e0e0", 
          200: "#c2c2c2", 
          300: "#a3a3a3", 
          400: "#858585",
          500: "#666666", 
          600: "#525252", 
          700: "#3d3d3d", 
          800: "#292929",
          900: "#141414"
        },
        primary: {
          100: "#d0d1d5", 
          200: "#a1a4ab", 
          300: "#727681", 
          400: "#434957",
          500: "#141b2d", 
          600: "#101624", 
          700: "#0c101b", 
          800: "#080b12",
          900: "#040509"
        },
        greenAccent: {
          100: "#dbf5ee", 
          200: "#b7ebde", 
          300: "#94e2cd", 
          400: "#70d8bd",
          500: "#4cceac", 
          600: "#3da58a", 
          700: "#2e7c67", 
          800: "#1e5245",
          900: "#0f2922"
        },
        redAccent: {
          100: "#f8dcdb", 
          200: "#f1b9b7", 
          300: "#e99592", 
          400: "#e2726e",
          500: "#db4f4a", 
          600: "#af3f3b", 
          700: "#832f2c", 
          800: "#58201e",
          900: "#2c100f"
        },
        blueAccent: {
          100: "#e1e2fe", 
          200: "#c3c6fd", 
          300: "#a4a9fc", 
          400: "#868dfb",
          500: "#6870fa", 
          600: "#535ac8", 
          700: "#3e4396", 
          800: "#2a2d64",
          900: "#151632"
        },
        blackAccent: {
          100: "#e6e6e6",
          200: "#cdcccc",
          300: "#b3b3b3",
          400: "#9a9999",
          500: "#818080",
          600: "#676666",
          700: "#4d4d4d",
          800: "#343333",
          900: "#1a1a1a"
        }
      }
    : {
        grey: {
          100: "#292929", 
          200: "#525252", 
          300: "#666666",
          400: "#858585",
          500: "#a3a3a3", 
          600: "#c2c2c2",
          700: "#e0e0e0", 
          800: "#f0f0f0", 
          900: "#f5f5f5"  
        },
        primary: {
          100: "#e0e0e0", 
          200: "#ebebeb",
          300: "#f0f0f0",
          400: "#f5f5f5", 
          500: "#fafafa",
          600: "#fcfcfc", 
          700: "#ffffff",
          800: "#ffffff",
          900: "#ffffff"
        },
        greenAccent: { 
          100: "#dbf5ee", 
          200: "#b7ebde", 
          300: "#94e2cd", 
          400: "#70d8bd",
          500: "#4cceac", 
          600: "#3da58a", 
          700: "#2e7c67", 
          800: "#1e5245",
          900: "#0f2922"
        },
        redAccent: {
          100: "#f8dcdb", 
          200: "#f1b9b7", 
          300: "#e99592", 
          400: "#e2726e",
          500: "#db4f4a", 
          600: "#af3f3b", 
          700: "#832f2c", 
          800: "#58201e",
          900: "#2c100f"
        },
        blueAccent: {
          100: "#e1e2fe", 
          200: "#c3c6fd", 
          300: "#a4a9fc", 
          400: "#868dfb",
          500: "#6870fa", 
          600: "#535ac8", 
          700: "#3e4396", 
          800: "#2a2d64",
          900: "#151632"
        },
        blackAccent: { 
          100: "#e6e6e6",
          200: "#cdcccc",
          300: "#b3b3b3",
          400: "#9a9999",
          500: "#818080",
          600: "#676666",
          700: "#4d4d4d",
          800: "#343333",
          900: "#2f2f2f;"
        }
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

// Definição das cores da aplicação. 
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: { main: colors.primary[500] },
            secondary: { main: colors.greenAccent[500] },
            neutral: {
              dark: colors.grey[800],
              main: colors.grey[500],
              light: colors.grey[100]
            },
            background: { default: colors.blackAccent[900] }
          }
        : { // Modo light (Por enquanto invativo): 
            primary: { main: colors.blueAccent[600] }, 
            secondary: { main: colors.greenAccent[500] }, 
            neutral: {
              dark: colors.grey[200], 
              main: colors.grey[500], 
              light: colors.grey[800] 
            },
            background: { default: colors.primary[600] }
          }),
    },
    typography: { 
      fontFamily: ["\"Source Sans 3\"", "\"Source Sans Pro\"", "system-ui", "sans-serif"].join(","),
      fontSize: 12,
      h1: { fontSize: 40 },
      h2: { fontSize: 32 },
      h3: { fontSize: 24 },
      h4: { fontSize: 20 },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
    }
  };
};

// context for the color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { }
});

// useMode hook
export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return [theme, colorMode];
}