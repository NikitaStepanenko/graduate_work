import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { store } from "./redux/store";
// import { Provider } from "react-redux";
// import "./index.css";
import { StyledEngineProvider } from "@mui/material/styles";
// import { ThemeProvider } from 'styled-components';
import { MainTheme } from "./theme";

import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <MainTheme>
        <Provider store={store}>
          <App />
        </Provider>
      </MainTheme>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
