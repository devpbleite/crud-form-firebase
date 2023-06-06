import React from "react";
import LogoImage from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, createUserDocument } from "../../services/firebaseConfig";
import Swal from "sweetalert2";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();

    if (name && email && password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        await createUserDocument(user, { name });

        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Usuário cadastrado com sucesso!",
        }).then(() => {
          window.location.href = "/";
        });
      } catch (error) {
        setErrorMessage(
          "Ocorreu um erro ao criar o usuário. Por favor, tente novamente."
        );
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Por favor, preencha todos os campos.",
      });
    }
  }

  return (
    <div className="signin template d-flex justify-content-center align-items-center vh-100 bg-danger">
      <div className="col-sm-8 col-md-6 col-lg-4 col-xxl-3 p-5 rounded bg-white">
        <form>
          <div className="d-flex justify-content-center mb-4">
            <img src={LogoImage} alt="" width={55} />
          </div>
          <h3 className="pb-3">Registre-se</h3>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
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
              <Link
                to="/"
                style={{ textDecoration: "none", color: "white" }}
                onClick={handleSignUp}
              >
                Cadastrar
              </Link>
            </button>
          </div>
          <p className="text-end pt-2">
            Possui uma conta?{" "}
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <strong>Faça seu login</strong>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
