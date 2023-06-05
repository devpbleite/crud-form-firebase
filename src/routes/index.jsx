import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPass from "../pages/ForgotPass";

const Private = ({ Item }) => {
  const { isAuth } = useAuth();

  return isAuth > 0 ? <Item /> : <SignIn />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/forgotpass" element={<ForgotPass />}></Route>
        <Route exact path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
