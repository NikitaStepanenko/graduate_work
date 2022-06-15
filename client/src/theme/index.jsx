import React, { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CssBaseline } from "@mui/material";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  min-height: 100vh;
  max-width: 100vw;
}
`;

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const MainTheme = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                primary: {
                  main: "#e3b23c",
                  theme: "#e7e5d6",
                  contrast: "#423e37",
                  dark: "#6e675f",
                  light: "#edebd7",
                  card: "#edebd7",
                },
                secondary: { main: "#e3b23c", card: "#e3b23c" },
                text: {
                  primary: "#423e37",
                  secondary: "#423e37",
                  thirdly: "#edebd7",
                },
                cardShadow:
                  "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), -6px 12px 20px 4px rgb(0 0 0 / 12%)",
              }
            : {
                // palette values for dark mode
                primary: {
                  main: "#e3b23c",
                  theme: "#423e37",
                  contrast: "#edebd7",
                  dark: "#6e675f",
                  light: "#edebd7",
                  card: "#6e675f",
                },
                secondary: { main: "#e3b23c", card: "#e3b23c" },
                text: {
                  primary: "#edebd7",
                  secondary: "#423e37",
                  thirdly: "#edebd7",
                },
                cardShadow:
                  "0px 3px 3px -2px rgb(167 167 167 / 20%), 0px 3px 4px 0px rgb(100 100 100 / 14%), -9px 10px 14px 4px rgb(181 181 181 / 12%)",
              }),
        },
        typography: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          button: {
            textTransform: "none",
          },
          allVariants: {},
          regTypography: {
            fontWeight: 600,
            fontSize: "28px",
          },
          title: {
            fontSize: "28px",
          },
          propertyTitle: {
            lineHeight: "32px",
            fontWeight: 600,
          },
          standard: {
            lineHeight: "32px",
          },
          secondaryText: {
            opacity: 0.7,
            fontSize: "14px",
          },
          loginTitle: {
            fontSize: "20px",
            fontWeight: "600",
          },
          ellipsis: {
            fontSize: "20px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": "2",
            "-webkit-box-orient": "vertical",
          },
        },
        components: {
          MuiButton: {
            variants: [
              {
                props: {
                  variant: "blank",
                },
                style: {
                  borderRadius: "4px",
                },
              },
            ],
            styleOverrides: {
              sizeLarge: {
                height: "43px",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        <CssBaseline />
        <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
