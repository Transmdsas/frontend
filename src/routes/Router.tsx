import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "../components/LayOut";
import { NotFound } from "../containers/NotFound";
import { Vehicles } from "../containers/Vehicles";
import { CreateVehicles } from "../containers/CreateVehicles";
import Parameters from "../containers/Parameters";
import { ConnectStore } from "../utils/connectStore";

export const Router = () => {
  ConnectStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Vehicles />} />
          <Route path="/vehiculos" element={<Vehicles />} />
          <Route path="/vehiculos/crearVehiculo" element={<CreateVehicles />} />
          <Route path="/parametros" element={<Parameters />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
