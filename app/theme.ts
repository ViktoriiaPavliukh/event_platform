"use client";
import { createTheme, Theme } from "@mui/material/styles";

type ThemeColor = "light" | "dark";

const createThemeTemplate = (themeColor: ThemeColor): Theme => {
  const primaryColor = themeColor === "light" ? "#d3cbc5" : "#000";
  const bgColor = themeColor === "light" ? "#d3cbc5" : "#000";
  const formColor = themeColor === "light" ? "#FFFFFF" : "#1E1E1E";
  const fontColorPrimary = themeColor === "light" ? "#1b1a1a" : "#FFF";
  const fontColorSecondary = themeColor === "light" ? "#FFF" : "#1b1a1a";
  const btnHover = themeColor === "light" ? "#cbc3bd" : "#FFF";

  const defaultColor = "#1b1a1a";

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
            color: themeColor === "light" ? "#1b1a1a" : "#FFF", // Default button text color
            backgroundColor: primaryColor, // Default button background color
            "&:hover": {
              backgroundColor: btnHover,
              color: fontColorSecondary,
            },
          },
          contained: {
            boxShadow: "none", // Remove button box shadow
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            color: themeColor === "light" ? "#FFF" : "#FFF", // Default color for the switch button
          },
          thumb: {
            color: themeColor === "light" ? "#FFF" : "#FFF", // Default color for the switch thumb
          },
          track: {
            backgroundColor: themeColor === "light" ? "#FFF" : "#FFF", // Default background color for the switch track
          },
          switchBase: {
            "&.Mui-checked": {
              color: themeColor === "light" ? "#FFF" : "#FFF", // Color for the switch button when checked
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: fontColorPrimary, // Change font color of form elements
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: fontColorPrimary, // Change font color of input label
          },
        },
      },
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
        light: bgColor,
        dark: bgColor,
        contrastText: fontColorPrimary,
      },
      // background: {
      //   default: backgroundColor,
      //   paper: backgroundColor,
      // },
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
