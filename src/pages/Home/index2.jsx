import { useState, useEffect } from "react";
import { auth } from "../../services/firebaseConfig";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import ModalViewUser from "../../components/ModalViewUser";
import InputMask from "react-input-mask";
import LogoImage from "../../assets/logo.png";
import { Link } from "react-router-dom";

const firebaseApp = auth();

function Home() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [motherName, setMotherName] = useState("");
  const [status, setStatus] = useState("1");
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const usersCollectionRef = collection(db, "users");

  const resetForm = () => {
    setName("");
    setLogin("");
    setPassword("");
    setEmail("");
    setPhone("");
    setCpf("");
    setBirthdate("");
    setMotherName("");
    setStatus("1");
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(usersCollectionRef));
    }
    getUsers();
  }, []);

  return (
    <div className="container">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row">
          <div className="col-12 col-md-1">
            <img src={LogoImage} alt="Logo" width={40} />
          </div>
          <div className="col-12 col-md-10 text-center">
            <h2 className="mb-4">Painel de Controle - Usuários</h2>
          </div>
          <div className="row">
            <div className="col-sm-3 mt-5 mb-4 text-gred">
              <div className="search">
                <form className="form-inline">
                  <input
                    className="form-control mr-sm-2 fs={10px}"
                    type="search"
                    placeholder="Buscar usuário..."
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </form>
              </div>
            </div>
            <div
              className="col-sm offset-sm-2 mt-5 mb-4 text-gred"
              style={{ color: "black" }}
            >
              <h2>
                <b></b>
              </h2>
            </div>
            <div className="col-sm-3 mt-5 mb-4 text-end">
              <Button variant="danger" onClick={newUser} show={handleShow}>
                Novo Usuário
              </Button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="table">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>#</th>
                  <th style={{ width: "25%" }}>Nome</th>
                  <th style={{ width: "25%" }}>Inclusão</th>
                  <th style={{ width: "25%" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.name}</td>
                    <td>{record.dataInclusao}</td>
                    <td className="text-center">
                      <a
                        href="#"
                        className="view"
                        title="View"
                        data-toggle="tooltip"
                        style={{ color: "#10ab80" }}
                        onClick={() => handleViewUser(record)}
                      >
                        <i className="material-icons">&#xE417;</i>
                      </a>
                      <span style={{ marginRight: "5px" }}></span>
                      <a
                        href="#"
                        className="edit"
                        title="Edit"
                        data-toggle="tooltip"
                        onClick={() => handleEditUser(record)}
                      >
                        <i className="material-icons">&#xE254;</i>
                      </a>
                      <span style={{ marginRight: "5px" }}></span>
                      <a
                        href="#"
                        className="delete"
                        title="Delete"
                        data-toggle="tooltip"
                        style={{ color: "red" }}
                        onClick={() => handleDeleteUser(record.id)}
                      >
                        <i className="material-icons">&#xE872;</i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-end">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                onClick={() => handlePaginationClick(currentPage - 1)}
              >
                Anterior
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <li
                  className={`page-item ${
                    pageNumber === currentPage ? "active" : ""
                  }`}
                  key={pageNumber}
                >
                  <a
                    className="page-link"
                    onClick={() => handlePaginationClick(pageNumber)}
                  >
                    {pageNumber}
                  </a>
                </li>
              )
            )}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                onClick={() => handlePaginationClick(currentPage + 1)}
              >
                Próxima
              </a>
            </li>
          </ul>
        </nav>

        {/* <!--- Model Box ---> */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingUser ? "Editar Usuário" : "Novo Usuário"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="needs-validation" noValidate>
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  className={`form-control ${nameError ? "is-invalid" : ""}`}
                  placeholder="Digite o nome..."
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                />
                {nameError && (
                  <div className="invalid-feedback">{nameError}</div>
                )}
              </div>
              <div className="form-group">
                <label>Login</label>
                <input
                  type="text"
                  className={`form-control ${loginError ? "is-invalid" : ""}`}
                  placeholder="Insira uma senha..."
                  value={login}
                  onChange={(e) => {
                    setLogin(e.target.value);
                    setLoginError("");
                  }}
                />
                {loginError && (
                  <div className="invalid-feedback">{loginError}</div>
                )}
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  className={`form-control ${
                    passwordError ? "is-invalid" : ""
                  }`}
                  placeholder="Insira uma senha..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                />
                {passwordError && (
                  <div className="invalid-feedback">{passwordError}</div>
                )}
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input
                  type="email"
                  className={`form-control ${emailError ? "is-invalid" : ""}`}
                  placeholder="Digite o e-mail..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                />
                {emailError && (
                  <div className="invalid-feedback">{emailError}</div>
                )}
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <InputMask
                  mask="(99) 99999-9999"
                  type="phone"
                  className={`form-control ${phoneError ? "is-invalid" : ""}`}
                  placeholder="Insira um telefone..."
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError("");
                  }}
                />
                {phoneError && (
                  <div className="invalid-feedback">{phoneError}</div>
                )}
              </div>
              <div className="form-group">
                <label>CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  type="text"
                  className={`form-control ${cpfError ? "is-invalid" : ""}`}
                  placeholder="Insira um CPF..."
                  value={cpf}
                  onChange={(e) => {
                    setCpf(e.target.value);
                    setCpfError("");
                  }}
                />
                {cpfError && <div className="invalid-feedback">{cpfError}</div>}
              </div>
              <div className="form-group">
                <label>Data de Nascimento</label>
                <InputMask
                  mask="99/99/9999"
                  type="text"
                  className={`form-control ${
                    birthdateError ? "is-invalid" : ""
                  }`}
                  placeholder="Insira uma data de nascimento..."
                  value={birthdate}
                  onChange={(e) => {
                    setBirthdate(e.target.value);
                    setBirthdateError("");
                  }}
                />
                {birthdateError && (
                  <div className="invalid-feedback">{birthdateError}</div>
                )}
              </div>
              <div className="form-group">
                <label>Nome da Mãe</label>
                <input
                  type="text"
                  className={`form-control ${
                    motherNameError ? "is-invalid" : ""
                  }`}
                  placeholder="Insira o nome da mãe..."
                  value={motherName}
                  onChange={(e) => {
                    setMotherName(e.target.value);
                    setMotherNameError("");
                  }}
                />
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <div className="input-group">
                    <select
                      className={`form-select ${
                        statusError ? "is-invalid" : ""
                      }`}
                      aria-label="Default select"
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                        setStatusError("");
                      }}
                    >
                      {statusOptions.map((option, index) => (
                        <option key={index} value={index + 1}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="input-group-append"></div>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            {editingUser ? (
              <Button variant="primary" onClick={handleSaveUser}>
                Salvar
              </Button>
            ) : (
              <Button variant="primary" onClick={handleAddRecord}>
                Adicionar
              </Button>
            )}
          </Modal.Footer>
        </Modal>

        {/* Modal para exibir as informações do usuário */}
        <ModalViewUser
          show={showUserModal}
          handleClose={handleCloseUserModal}
          viewUser={viewUser}
        />
        <footer>
          <button className="btn btn-danger">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Sair
            </Link>
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Home;
