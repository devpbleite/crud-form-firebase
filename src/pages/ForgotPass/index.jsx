import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import LogoImage from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const ForgotPass = () => {
  const [email, setEmail] = useState("");

  const auth = getAuth();

  const handleResetPassword = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "E-mail enviado",
          text: "Um e-mail foi enviado para redefinir sua senha.",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Ocorreu um erro ao enviar o e-mail de redefinição de senha.",
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
          <h3 className="pb-3">Recupere sua senha</h3>
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
            <label htmlFor="email">Confirme seu e-mail</label>
            <input
              type="email"
              className="form-control"
              placeholder="Confirme seu email..."
            />
          </div>

          <div className="d-grid pt-2">
            <button className="btn btn-danger" onClick={handleResetPassword}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Enviar
              </Link>
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

export default ForgotPass;
