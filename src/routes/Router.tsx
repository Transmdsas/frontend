import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "../components/LayOut";
import { NotFound } from "../containers/NotFound";
import { Vehicles } from "../containers/Vehicles";
import { Theme } from "../theme/Theme";
import { CreateVehicles } from "../containers/CreateVehicles";
import Parameters from "../containers/Parameters";

export const Router = () => (
  <ThemeProvider theme={Theme}>
    <BrowserRouter>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Vehicles />} />
          <Route path="/vehiculos" element={<Vehicles />} />
          <Route path="/crear-vehiculo" element={<CreateVehicles />} />
          <Route path="/parametros" element={<Parameters />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
