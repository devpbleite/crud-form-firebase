import { useState, useEffect } from "react";
import React from "react";
import LogoImage from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        window.location.href = "/home";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Usuário ou senha inválidos.",
        });
      });
  };

  return (
    <div className="signin template d-flex justify-content-center align-items-center vh-100 bg-danger">
      <div className="col-sm-8 shadow-lg col-md-6 col-lg-4 col-xxl-3 p-5 rounded bg-white">
        <form>
          <div className="d-flex justify-content-center mb-4">
            <img src={LogoImage} alt="" width={55} />
          </div>
          <h3 className="pb-3">Faça seu login</h3>

          <div className="mb-2">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu email..."
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="************"
              onChange={handlePasswordChange}
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
              <Link
                to="/home"
                style={{ textDecoration: "none", color: "white" }}
              >
                Login
              </Link>
            </button>
          </div>
          <p className="text-end pt-2">
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
  );
}

export default SignIn;
