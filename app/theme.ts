"use client";
import { createTheme, Theme } from "@mui/material/styles";

type ThemeColor = "light" | "dark";

const createThemeTemplate = (themeColor: ThemeColor): Theme => {
  const primaryColor = themeColor === "light" ? "#d3cbc5" : "#000";
  const bgColor = themeColor === "light" ? "#d3cbc5" : "#000";
  const white = themeColor === "light" ? "#FFF" : "#FFF";
  const formColor = themeColor === "light" ? "#FFFFFF" : "#1E1E1E";
  const fontColorPrimary = themeColor === "light" ? "#1b1a1a" : "#FFF";
  const fontColorSecondary = themeColor === "light" ? "#585858" : "585858";
  const btnHover = themeColor === "light" ? "#cbc3bd" : "#FFF";

  return createTheme({
    components: {
      MuiFormControl: {
        styleOverrides: {
          root: {
            backgroundColor: formColor,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: themeColor === "light" ? "#1b1a1a" : "#FFF",
            backgroundColor: primaryColor,
            "&:hover": {
              backgroundColor: btnHover,
              color: fontColorSecondary,
            },
          },
          contained: {
            boxShadow: "none",
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            color: themeColor === "light" ? "#FFF" : "#FFF",
          },
          thumb: {
            color: themeColor === "light" ? "#FFF" : "#FFF",
          },
          track: {
            backgroundColor: themeColor === "light" ? "#FFF" : "#FFF",
          },
          switchBase: {
            "&.Mui-checked": {
              color: themeColor === "light" ? "#FFF" : "#FFF",
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: fontColorPrimary,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: fontColorPrimary,
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    palette: {
      mode: themeColor,
      primary: {
        main: primaryColor,
        light: bgColor,
        dark: fontColorSecondary,
        contrastText: fontColorPrimary,
      },
    },
    typography: {
      fontFamily: "Mulish, sans-serif",
      fontSize: 16,
    },
  });
};

export const lightTheme = createThemeTemplate("light");
export const darkTheme = createThemeTemplate("dark");
