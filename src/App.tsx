import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { Router } from "./routes/Router";
import { store } from "./store/Store";
import { Theme } from "./theme/Theme";

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={Theme}>
      <Router />
    </ThemeProvider>
  </Provider>
);
