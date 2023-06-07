import LogoImage from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, createUserDocument } from "../../services/firebaseConfig";
import Swal from "sweetalert2";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(name && email && password && confirmPassword);
  }, [name, email, password, confirmPassword]);

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  async function handleSignUp(e) {
    e.preventDefault();

    if (isFormValid) {
      if (password !== confirmPassword) {
        setErrorMessage("");
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "As senhas não coincidem. Por favor, corrija-as.",
        });
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
          confirmPassword
        );

        const user = userCredential.user;

        await createUserDocument(user, { name });
      } catch (error) {
        setErrorMessage(
          "Ocorreu um erro ao criar o usuário. Por favor, tente novamente."
        );
      }
      resetForm();
      setSuccessMessage("Usuário cadastrado com sucesso!");

      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Usuário cadastrado com sucesso! Volte para a página de login.",
      }).then(() => {
        window.location.href = "/";
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Por favor, preencha todos os campos.",
      });
      setErrorMessage("");
      setSuccessMessage("");
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
