import { useState } from "react";
import LogoImage from "../../assets/logo3.jpg";
import CompanyImage from "../../assets/companyImage.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import Swal from "sweetalert2";

export const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState("");

  const { resetPassword } = useAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!email || !confirmEmail) {
        throw new Error("Todos os campos precisam ser preenchidos.");
      }
      if (email !== confirmEmail) {
        Swal.fire({
          title: "Erro!",
          text: "O e-mail e a confirmação de e-mail precisam ser iguais.",
          icon: "error",
          confirmButtonText: "OK",
        });
        throw new Error("A senha e a confirmação de senha não são iguais.");
      }

      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length === 0) {
        Swal.fire({
          title: "Erro!",
          text: "Usuário não encontrado.",
          icon: "error",
          confirmButtonText: "OK",
        });
        throw new Error("Usuário não encontrado.");
      }
      await resetPassword(email);
      Swal.fire({
        title: "Sucesso!",
        text: "E-mail de recuperação enviado.",
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
            <h3 className="pb-3">Recupere sua senha</h3>
            <div className="mb-4">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                className="form-control"
                placeholder="Digite seu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email">Confirme seu e-mail</label>
              <input
                type="email"
                className="form-control"
                placeholder="Confirme seu email..."
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
            </div>

            <div className="d-grid gap-2">
              <button className="btn btn-danger" onClick={handleResetPassword}>
                Enviar
              </button>
            </div>
            <p className="text-end pt-3" style={{ "marginBottom": 0 }}>
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

export default ForgotPass;
