import { darkShadows } from "./shadows";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  shape: {
    borderRadius: 16,
  },
  direction: "ltr",
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #000 inset",
            WebkitTextFillColor: "#fff",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        fallback: {
          height: "75%",
          width: "75%",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          height: "100%",
          width: "100%",
        },
        body: {
          height: "100%",
        },
        "#root": {
          height: "100%",
        },
        "#nprogress .bar": {
          zIndex: "2000 !important",
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: "hidden",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "auto",
          marginRight: "16px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
  palette: {
    background: {
      default: "#171c24",
      paper: "#222b36",
    },
    divider: "rgba(145, 158, 171, 0.24)",
    error: {
      contrastText: "#ffffff",
      main: "#f44336",
    },
    mode: "dark",
    primary: {
      contrastText: "#ffffff",
      main: "rgba(39,198,219,0.55)",
    },
    secondary: {
      main: "#f50057",
    },
    success: {
      contrastText: "#ffffff",
      main: "#4caf50",
    },
    text: {
      primary: "#ffffff",
      secondary: "#919eab",
    },
    warning: {
      contrastText: "#ffffff",
      main: "#ff9800",
    },
  },
  typography: {
    button: {
      fontWeight: 600,
    },
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    h1: {
      fontWeight: 600,
      fontSize: "3.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "3rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2.25rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
    },
    overline: {
      fontWeight: 600,
    },
  },
  shadows: darkShadows,
});

export default theme;
