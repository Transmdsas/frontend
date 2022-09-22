import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "../components/LayOut";
import { NotFound } from "../containers/NotFound";
import { Vehicles } from "../containers/Vehicles";
import { Drivers } from "../containers/Drivers";
import { CreateVehicles } from "../containers/CreateVehicles";
import { CreateDrivers } from "../containers/CreateDrivers";
import { Parameters } from "../containers/Parameters";
import { CreateParameters } from "../containers/CreateParameters";
import { ConnectStore } from "../utils/connectStore";
import { Owners } from "../containers/Owners";
import { CreateOwners } from "../containers/CreateOwners";
import { Holders } from "../containers/Holders";
import { Tecnomecanics } from "../containers/Tecnomecanics";
import { Insurers } from "../containers/Insurers";

export const Router = () => {
  ConnectStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayOut />}>
          <Route index element={<Vehicles />} />
          <Route path="/vehiculos" element={<Vehicles />} />
          <Route path="/vehiculos/crearVehiculo" element={<CreateVehicles />} />
          <Route path="/vehiculos/tecnomecanica" element={<Tecnomecanics />} />
          <Route path="/vehiculos/polizas" element={<Insurers />} />
          <Route path="/conductores" element={<Drivers />} />
          <Route
            path="/conductores/crearConductor"
            element={<CreateDrivers />}
          />
          <Route path="/propietarios" element={<Owners />} />
          <Route
            path="/propietarios/crearPropietario"
            element={<CreateOwners />}
          />
          <Route path="/tenedores" element={<Holders />} />
          <Route path="/parametros" element={<Parameters />} />
          <Route path="/parametros/crearParametro" element={<CreateParameters />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
