import { useState } from "react";
import React from "react";
import LogoImage from "../../assets/logo3.jpg";
import CompanyImage from "../../assets/companyImage.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signIn } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      window.location.href = "/home";
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      Swal.fire({
        title: "Erro!",
        text: "Usuário ou senha inválidos.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="signin template d-flex justify-content-center align-items-center vh-100 bg-danger">
      <div className="col-sm-8 shadow-lg col-md-6 col-lg-10 col-xxl-7 p-5 rounded bg-white d-flex">
        <div className="login-image col-md-6 pe-3">
          <img src={CompanyImage} alt="FC" className="img-fluid h-100" />
        </div>
        <div className="login-card col-md-6 d-flex flex-column justify-content-center ps-5">
          <form>
            <div className="d-flex justify-content-center mb-4">
              <img src={LogoImage} alt="" width={300} />
            </div>
            <h3 className="pb-3">Faça seu login</h3>

            <div className="mb-4">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                className="form-control"
                placeholder="Digite seu email..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                className="form-control"
                placeholder="************"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input
                type="checkbox"
                className="custom-control custom-checkbox"
                id="check"
              />
              <label htmlFor="check" className="custom-input-label ms-2">
                Lembrar do login
              </label>
            </div>
            <div className="d-grid">
              <button
                className="btn btn-danger"
                disabled={!email || !password}
                onClick={handleSignIn}
              >
                Login
              </button>
            </div>
            <p className="text-end pt-3" style={{ "marginBottom": 0 }}>
              Esqueceu a{" "}
              <strong>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/forgotpass"
                >
                  senha?
                </Link>
              </strong>
              <strong className="p-1">
                |{" "}
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/signup"
                >
                  Registre-se
                </Link>
              </strong>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
