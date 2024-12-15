import { Route, Routes } from "react-router-dom";
import { App } from "./pages/App";
import { RegisterPage } from "./pages/Register";
import { LoginPage } from "./pages/Login";

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
};
