import { ThemeProvider } from "@mui/material";
import { Router } from "./routes/Router";
import { Theme } from "./theme/Theme";
import {store} from "./store";
import { Provider } from "react-redux";

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={Theme}>
        <Router />
    </ThemeProvider>
   </Provider>
);
