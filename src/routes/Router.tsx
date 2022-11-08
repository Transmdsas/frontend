import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "../components/LayOut";
import { NotFound } from "../containers/NotFound";
import { Vehicles } from "../containers/Vehicles";
import { Parameters } from "../containers/Parameters";
import { CreateParameters } from "../containers/CreateParameters";
import { Owners } from "../containers/Owners";
import { CreateOwners } from "../containers/CreateOwners";
import { LoadOrders } from "../containers/LoadOrders";
import { CreateOrders } from "../containers/CreateOrders";
import { Tecnomecanics } from "../containers/Tecnomecanics";
import { Insurers } from "../containers/Insurers";
import { Customers } from "../containers/Customers"
import { CreateCustomers } from "../containers/CreateCustomers";
import { Communications } from "../containers/Communications";
import { HoldersPage } from "./../views/Holders/HoldersGridPage/HoldersGridPage";
import { HoldersFormPage } from "./../views/Holders/HoldersFormPage/HoldersFormPage";
import { DriversPage } from "./../views/Drivers/DriversGridPage/DriversGridPage";
import { DriversFormPage } from "./../views/Drivers/DriversFormPage/DriversFormPage";
import { OwnersPage } from "./../views/Owners/OwnersGridPage/OwnersGridPage";
import { OwnersFormPage } from "./../views/Owners/OwnersFormPage/OwnersFormPage";
import { VehiclesPage } from "./../views/Vehicles/VehiclesGridPage/VehiclesGridPage";
import { VehiclesFormPage } from "./../views/Vehicles/VehiclesFormPage/VehiclesFormPage";


export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Vehicles />} />
          <Route path="vehiculos" element={<VehiclesPage />} />
          <Route path="vehiculos/crearVehiculo" element={<VehiclesFormPage />} />
          <Route path="vehiculos/tecnomecanica" element={<Tecnomecanics />} />
          <Route path="vehiculos/polizas" element={<Insurers />} />
          <Route path="vehiculos/comunicaciones" element={<Communications /> } />
          <Route path="conductores" element={<DriversPage />} />
          <Route
            path="/conductores/crearConductor"
            element={<DriversFormPage />}
          />
          <Route path="/propietarios" element={<OwnersPage />} />
          <Route
            path="/propietarios/crearPropietario"
            element={<OwnersFormPage />}
          />
          <Route path="/tenedores" element={<HoldersPage />} />
          <Route path="/tenedores/crearTenedor" element={<HoldersFormPage />} />
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
