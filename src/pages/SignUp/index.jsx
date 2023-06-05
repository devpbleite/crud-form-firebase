import React from "react";
import LogoImage from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  function handleSignUp(e) {
    e.preventDefault();

    if (email && password) {
      createUserWithEmailAndPassword(email, password)
        .then(() => {
          setSuccessMessage("Usuário cadastrado com sucesso!");
          setErrorMessage("");
        })
        .catch((error) => {
          setErrorMessage(
            "Ocorreu um erro ao criar o usuário. Por favor, tente novamente."
          );
          setSuccessMessage("");
        });
    } else {
      setErrorMessage("Por favor, preencha todos os campos.");
      setSuccessMessage("");
    }
  }
  
  return (
    <div className="signin template d-flex justify-content-center align-items-center vh-100 bg-danger">
      <div className="fcol-sm-8 col-md-6 col-lg-4 p-5 rounded bg-white">
        <form>
          <div className="d-flex justify-content-center mb-4">
            <img src={LogoImage} alt="" width={55} />
          </div>
          <h3 className="pb-3">Registre-se</h3>
          {successMessage && (
            <p className="alert alert-success" role="alert">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="alert alert-danger" role="alert">
              {errorMessage}
            </p>
          )}
          <div className="mb-2">
            <label htmlFor="email">Nome</label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite seu nome..."              
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Confirme sua senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirme sua senha..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid pt-2">
            <button className="btn btn-danger" onClick={handleSignUp}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Cadastrar
              </Link>
            </button>
          </div>
          <p className="text-end pt-2">
            Possui uma conta?{" "}
            <Link to="/">
              <strong>Faça seu login</strong>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
