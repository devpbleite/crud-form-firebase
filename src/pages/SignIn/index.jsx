import { useState, useEffect } from "react";
import React from "react";
import LogoImage from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import Swal from "sweetalert2";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    setIsFormValid(email && password);
  }, [email, password]);

  async function handleSignIn(e) {
    e.preventDefault();
    if (isFormValid) {
      try {
        await signInWithEmailAndPassword(email, password);

        window.location.href = "/home";
      } catch (error) {
        
        Swal.fire({
          icon: "error",
          title: "Erro de autenticação",
          text: "Usuário não cadastrado. Por favor, verifique suas credenciais.",
        });
      }
    } else {
      
      Swal.fire({
        icon: "error",
        title: "Erro de autenticação",
        text: "Por favor, preencha todos os campos.",
      });
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="signin template d-flex justify-content-center align-items-center vh-100 bg-danger">
      <div className="fcol-sm-8 col-md-6 col-lg-4 p-5 rounded bg-white">
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
              disabled={!isFormValid}
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
