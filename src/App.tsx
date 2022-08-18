import { ThemeProvider } from "@mui/material";
import React from "react";
import { Router } from "./routes/Router";
import { Theme } from "./theme/Theme";

export const App = () => (
  <ThemeProvider theme={Theme}>
    <Router />
  </ThemeProvider>
);
