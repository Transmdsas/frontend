import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "../components/LayOut";
import { NotFound } from "../containers/NotFound";
import { Parameters } from "../containers/Parameters";
import { CreateParameters } from "../containers/CreateParameters";
import { HoldersPage } from "./../views/Holders/HoldersGridPage/HoldersGridPage";
import { HoldersFormPage } from "./../views/Holders/HoldersFormPage/HoldersFormPage";
import { DriversPage } from "./../views/Drivers/DriversGridPage/DriversGridPage";
import { DriversFormPage } from "./../views/Drivers/DriversFormPage/DriversFormPage";
import { OwnersPage } from "./../views/Owners/OwnersGridPage/OwnersGridPage";
import { OwnersFormPage } from "./../views/Owners/OwnersFormPage/OwnersFormPage";
import { VehiclesPage } from "./../views/Vehicles/VehiclesGridPage/VehiclesGridPage";
import { VehiclesFormPage } from "./../views/Vehicles/VehiclesFormPage/VehiclesFormPage";
import { OrdersPage } from "./../views/Orders/OrdersGridPage/OrdersGridPage";
import { OrdersFormPage } from "./../views/Orders/OrdersFormPage/OrdersFormPage";
import { CustomersPage } from "./../views/Customers/CustomersGridPage/CustomersGridPage";
import { CustomersFormPage } from "./../views/Customers/CustomersFormPage/CustomersFormPage";
import { DocsConfigPage } from "../views/DocumentsConfig/DocsConfigPage/DocsConfigPage";
import { DocsConfigFormPage } from "../views/DocumentsConfig/DocsConfigFormPage/DocsConfigFormPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<VehiclesPage />} />
          <Route path="vehiculos" element={<VehiclesPage />} />
          <Route
            path="vehiculos/crearVehiculo"
            element={<VehiclesFormPage />}
          />
          <Route path="conductores" element={<DriversPage />} />
          <Route
            path="/conductores/crearConductor"
            element={<DriversFormPage />}
          />
          <Route
            path="/conductores/editarConductor/:docNum"
            element={<DriversFormPage />}
          />
          <Route path="/propietarios" element={<OwnersPage />} />
          <Route
            path="/propietarios/crearPropietario"
            element={<OwnersFormPage />}
          />
          <Route
            path="/propietarios/editarPropietario/:docNum"
            element={<OwnersFormPage />}
          />
          <Route path="/tenedores" element={<HoldersPage />} />
          <Route path="/tenedores/crearTenedor" element={<HoldersFormPage />} />
          <Route
            path="/tenedores/editarTenedor/:docNum"
            element={<HoldersFormPage />}
          />
          <Route path="/parametros" element={<Parameters />} />
          <Route path="/ordenesdeCargue" element={<OrdersPage />} />
          <Route
            path="/ordenesdeCargue/crearOrdenCargue"
            element={<OrdersFormPage />}
          />
          <Route path="clientes" element={<CustomersPage />} />
          <Route
            path="clientes/crearClientes"
            element={<CustomersFormPage />}
          />
          <Route
            path="/parametros/crearParametro"
            element={<CreateParameters />}
          />
          <Route path="/configuracionDocumentos" element={<DocsConfigPage />} />
          <Route
            path="/configuracionDocumentos/crearDocConfig"
            element={<DocsConfigFormPage />}
          />
          <Route
            path="/configuracionDocumentos/editarDocConfig/:configId"
            element={<DocsConfigFormPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
