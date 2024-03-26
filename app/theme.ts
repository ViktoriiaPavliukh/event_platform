"use client";
import { createTheme, ThemeOptions } from "@mui/material/styles";

type ThemeColor = "light" | "dark";

const createThemeTemplate = (themeColor: ThemeColor): ThemeOptions => {
  const primaryColor = themeColor === "light" ? "#f8f4f0" : "#300B31";
  const backgroundColor = themeColor === "light" ? "#FFFFFF" : "#000000";
  const fontColorPrimary = themeColor === "light" ? "#FFFFFF" : "#000000";

  return createTheme({
    components: {
      // Add your component styles if needed
    },
    breakpoints: {
      // Define your breakpoints
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
      },
      background: {
        default: backgroundColor,
        paper: backgroundColor,
      },
      // Add more palette colors if needed
    },
    typography: {
      fontFamily: "Mulish, sans-serif",
      fontSize: 16,
    },
    // Add more theme options as needed
  });
};

export const lightTheme = createThemeTemplate("light");
export const darkTheme = createThemeTemplate("dark");
