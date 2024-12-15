import { Route, Routes } from "react-router-dom";
import { App } from "./pages/App";
import { RegisterPage } from "./pages/Register";

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  );
};
