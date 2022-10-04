import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { TransMDcontext } from "./context/TransMDcontext";
import { Router } from "./routes/Router";
import { store } from "./store/Store";
import { Theme } from "./theme/Theme";
import { ContextStore } from "./store/ContextStore";

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={Theme}>
      <TransMDcontext.Provider value={ContextStore()}>
        <Router />
      </TransMDcontext.Provider>
    </ThemeProvider>
  </Provider>
);
