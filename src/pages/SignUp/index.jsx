import LogoImage from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "As senhas não correspondem.",
      });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Swal.fire({
          icon: "success",
          title: "Cadastro realizado",
          text: "Seu cadastro foi realizado com sucesso!",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Ocorreu um erro ao realizar o cadastro.",
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
          <h3 className="pb-3">Registre-se</h3>

          <div className="mb-2">
            <label htmlFor="email">Nome</label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite seu nome..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Confirme sua senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirme sua senha..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="d-grid pt-2">
            <button className="btn btn-danger" onClick={handleSignUp}>
              Cadastrar
            </button>
          </div>
          <p className="text-end pt-2">
            Possui uma conta?{" "}
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              <strong>Faça seu login</strong>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
