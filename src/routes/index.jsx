import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPass from "../pages/ForgotPass";
import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectRoute";

const RoutesApp = () => {
  return (
    <AuthContextProvider>      
      <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/forgotpass" element={<ForgotPass />}></Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
      </Routes>      
    </AuthContextProvider>
  );
};

export default RoutesApp;
