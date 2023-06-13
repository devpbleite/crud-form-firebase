import LogoImage from "../../assets/logo3.jpg";
import CompanyImage from "../../assets/companyImage.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Swal from "sweetalert2";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!email || !password || !confirmPassword) {
        throw new Error("Todos os campos precisam ser preenchidos.");
      }
      if (password !== confirmPassword) {
        Swal.fire({
          title: "Erro!",
          text: "A senha e a confirmação de senha precisam ser iguais.",
          icon: "error",
          confirmButtonText: "OK",
        });
        throw new Error("A senha e a confirmação de senha não são iguais.");
      }
      await createUser(email, password);
      Swal.fire({
        title: "Sucesso!",
        text: "Usuário cadastrado com sucesso.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      setError(error.message);
      console.log(error);
      if (error.message === "Todos os campos precisam ser preenchidos.") {
        Swal.fire({
          title: "Erro!",
          text: "Todos os campos precisam ser preenchidos.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
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
            <h3 className="pb-2">Registre-se</h3>

            <div className="mb-1">
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
    </div>
  );
};

export default SignUp;
