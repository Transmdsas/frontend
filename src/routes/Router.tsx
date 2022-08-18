import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "../components/LayOut";
import { NotFound } from "../containers/NotFound";
import { Vehicles } from "../containers/Vehicles";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<LayOut />}>
        <Route path="/" element={<Vehicles />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
