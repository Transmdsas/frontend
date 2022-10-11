import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "../components/LayOut";
import { NotFound } from "../containers/NotFound";
import { Vehicles } from "../containers/Vehicles";
import { Drivers } from "../containers/Drivers";
import { CreateVehicles } from "../containers/CreateVehicles";
import { CreateDrivers } from "../containers/CreateDrivers";
import { CreateHolders } from "../containers/CreateHolders";
import { Parameters } from "../containers/Parameters";
import { CreateParameters } from "../containers/CreateParameters";
import { Owners } from "../containers/Owners";
import { CreateOwners } from "../containers/CreateOwners";
import { HoldersPage } from "./../views/Holders/HoldersPage/HoldersPage";
import { LoadOrders } from "../containers/LoadOrders";
import { CreateOrders } from "../containers/CreateOrders";
import { Tecnomecanics } from "../containers/Tecnomecanics";
import { Insurers } from "../containers/Insurers";
import { Customers } from "../containers/Customers"
import { CreateCustomers } from "../containers/CreateCustomers";
import { Communications } from "../containers/Communications";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Vehicles />} />
          <Route path="vehiculos" element={<Vehicles />} />
          <Route path="vehiculos/crearVehiculo" element={<CreateVehicles />} />
          <Route path="vehiculos/tecnomecanica" element={<Tecnomecanics />} />
          <Route path="vehiculos/polizas" element={<Insurers />} />
          <Route path="vehiculos/comunicaciones" element={<Communications /> } />
          <Route path="conductores" element={<Drivers />} />
          <Route
            path="/conductores/crearConductor"
            element={<CreateDrivers />}
          />
          <Route path="/propietarios" element={<Owners />} />
          <Route
            path="/propietarios/crearPropietario"
            element={<CreateOwners />}
          />
          <Route path="/tenedores" element={<HoldersPage />} />
          <Route path="/tenedores/crearTenedor" element={<CreateHolders />} />
          <Route path="/parametros" element={<Parameters />} />
          <Route path="/ordenesdeCargue" element={<LoadOrders />} /> 
          <Route path="/ordenesdeCargue/crearOrdenCargue" element={<CreateOrders />} />
          <Route path="clientes" element={<Customers />} />
          <Route path="clientes/crearClientes" element={<CreateCustomers />} />
          <Route path="/ordenesdeCargue/crearOrdenCargue" element={<CreateOrders />} />
          <Route path="/ajustesGenerales" element={<LoadOrders />} /> 
          <Route path="clientes" element={<Customers />} /> --// Clientes
          <Route path="clientes/crearClientes" element={<CreateCustomers />} /> --// Clientes
          <Route path="/parametros/crearParametro" element={<CreateParameters />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
