import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import ModalViewUser from "../../components/ModalViewUser";
import InputMask from "react-input-mask";
import LogoImage from "../../assets/logo.png";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyD9Zuzlc5R5tj1a7sIBSM0WD5F2ztTygYw",
  authDomain: "auth-crud-2bf07.firebaseapp.com",
  projectId: "auth-crud-2bf07",
  storageBucket: "auth-crud-2bf07.appspot.com",
  messagingSenderId: "339738484630",
  appId: "1:339738484630:web:7d8a6c6d13ca0183acc7b7",
});

function Home() {
  const [show, setShow] = useState(false);
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
  const [showUserModal, setShowUserModal] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseUserModal = () => setShowUserModal(false);
  const handleShowUserModal = () => setShowUserModal(true);

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const [itemsPerPage] = useState(10);

  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  const handlePaginationClick = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  const handleViewUser = (user) => {
    setViewUser(user);
    handleShowUserModal();
  };

  const handleCreateUser = async () => {
    const errors = {};

    if (!name) {
      errors.name = true;
    }
    if (!login) {
      errors.login = true;
    }
    if (!password) {
      errors.password = true;
    }
    if (!email) {
      errors.email = true;
    }
    if (!phone) {
      errors.phone = true;
    }
    if (!cpf) {
      errors.cpf = true;
    }
    if (!birthdate) {
      errors.birthdate = true;
    }
    if (!motherName) {
      errors.motherName = true;
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    const db = getFirestore(firebaseApp);
    const user = await addDoc(collection(db, "users"), {
      name,
      login,
      password,
      email,
      phone,
      cpf,
      birthdate,
      motherName,
      status,
    });

    resetForm();
    handleClose();
  };

  const handleUpdateUser = async () => {
    const errors = {};

    if (!user.name) {
      errors.name = true;
    }
    if (!user.login) {
      errors.login = true;
    }
    if (!user.password) {
      errors.password = true;
    }
    if (!user.email) {
      errors.email = true;
    }
    if (!user.phone) {
      errors.phone = true;
    }
    if (!user.cpf) {
      errors.cpf = true;
    }
    if (!user.birthdate) {
      errors.birthdate = true;
    }
    if (!user.motherName) {
      errors.motherName = true;
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    const db = getFirestore(firebaseApp);
    const userDocRef = doc(db, "users", user.id);
    await updateDoc(userDocRef, {
      name: user.name,
      login: user.login,
      password: user.password,
      email: user.email,
      phone: user.phone,
      cpf: user.cpf,
      birthdate: user.birthdate,
      motherName: user.motherName,
      status: user.status,
    });

    resetForm();
    handleClose();
  };

  const handleDeleteUser = async (id) => {
    const db = getFirestore(firebaseApp);
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const db = getFirestore(firebaseApp);
    const usersRef = collection(db, "users");
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const usersData = [];
      snapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);
      setRecords(usersData);
    });

    return () => unsubscribe();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container ">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row">
          <div className="col-12 col-sm-6 col-lg-4">
            <img src={LogoImage} alt="Logo" width={40} />
          </div>
          <div className="col-12 col-sm-6 col-lg-5 text-center">
            <h2 className="mb-4">Painel de Controle - Usuários</h2>
          </div>

          <div className="col-12 col-md-4 mt-3">
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Busque um usuário..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </form>
            </div>
          </div>

          <div className="col-12 col-md-6 mt-3 text-end pb-4">
            <Button variant="danger" onClick={handleShow}>
              Novo Usuário
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: "3%" }}>#</th>
                  <th style={{ width: "15%" }}>Nome</th>
                  <th style={{ width: "15%" }}>CPF</th>
                  <th style={{ width: "15%" }}>Login</th>
                  <th style={{ width: "15%" }}>Situação</th>
                  <th style={{ width: "15%" }}>Data de Nascimento</th>
                  <th style={{ width: "15%" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((user, index) => (
                  <tr key={users.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.cpf}</td>
                    <td>{user.login}</td>
                    <td>{user.status}</td>
                    <td>{user.birthdate}</td>

                    <td className="text-center">
                      <a
                        href="#"
                        className="view"
                        title="View"
                        data-toggle="tooltip"
                        style={{ color: "#10ab80" }}
                        onClick={() => handleViewUser(user)}
                      >
                        <i className="material-icons">&#xE417;</i>
                      </a>
                      <span style={{ marginRight: "5px" }}></span>
                      <a
                        href="#"
                        className="edit"
                        title="Edit"
                        data-toggle="tooltip"
                        onClick={() => handleEditUser(user)}
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
                        onClick={() => handleDeleteUser(user.id)}
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
        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Novo Usuário</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  Nome
                  <input
                    type="text"
                    className={`form-control ${
                      isSubmitted && validationErrors.name ? "is-invalid" : ""
                    }`}
                    aria-describedby="emailHelp"
                    placeholder="Nome Completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {validationErrors.name && (
                    <div className="invalid-feedback">Campo obrigatório.</div>
                  )}
                </div>
                <div className="form-group mt-3">
                  Login
                  <input
                    type="text"
                    className={`form-control ${
                      isSubmitted && validationErrors.name ? "is-invalid" : ""
                    }`}
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                  {validationErrors.login && (
                    <div className="invalid-feedback">Campo obrigatório.</div>
                  )}
                </div>
                <div className="form-group mt-3">
                  Senha
                  <input
                    type="password"
                    className={`form-control ${
                      isSubmitted && validationErrors.name ? "is-invalid" : ""
                    }`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {validationErrors.password && (
                    <div className="invalid-feedback">Campo obrigatório.</div>
                  )}
                </div>
                <div className="form-group mt-3">
                  E-mail
                  <input
                    type="email"
                    className={`form-control ${
                      isSubmitted && validationErrors.name ? "is-invalid" : ""
                    }`}
                    id="exampleInputPassword1"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {validationErrors.email && (
                    <div className="invalid-feedback">Campo obrigatório.</div>
                  )}
                </div>
                <div className="form-group mt-3">
                  Telefone
                  <InputMask
                    type="text"
                    mask={"(99) 99999-9999"}
                    className={`form-control ${
                      isSubmitted && validationErrors.name ? "is-invalid" : ""
                    }`}
                    id="exampleInputPassword1"
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {validationErrors.phone && (
                    <div className="invalid-feedback">Campo obrigatório.</div>
                  )}
                </div>
                <div className="form-group mt-3">
                  CPF
                  <InputMask
                    type="text"
                    mask={"999.999.999-99"}
                    className={`form-control ${
                      isSubmitted && validationErrors.name ? "is-invalid" : ""
                    }`}
                    id="exampleInputPassword1"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                  {validationErrors.cpf && (
                    <div className="invalid-feedback">Campo obrigatório.</div>
                  )}
                </div>
                <div className="form-group mt-3">
                  Data de Nascimento
                  <InputMask
                    className={`form-control ${
                      isSubmitted && validationErrors.name ? "is-invalid" : ""
                    }`}
                    mask="99/99/9999"
                    placeholder="Data de Nascimento"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                  {validationErrors.birthdate && (
                    <div className="invalid-feedback">Campo obrigatório.</div>
                  )}
                </div>
                <div className="form-group mt-3">
                  Nome da Mãe
                  <input
                    type="text"
                    className={`form-control ${
                      isSubmitted && validationErrors.name ? "is-invalid" : ""
                    }`}
                    id="exampleInputPassword1"
                    placeholder="Nome da Mãe"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                  />
                  {validationErrors.motherName && (
                    <div className="invalid-feedback">Campo obrigatório.</div>
                  )}
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="status">Status</label>
                  <div className="input-group">
                    <select
                      className={`form-control ${
                        isSubmitted && validationErrors.name ? "is-invalid" : ""
                      }`}
                      aria-label="Default select example"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                      <option value="Bloqueado">Bloqueado</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-danger mt-4"
                  onClick={() => {
                    setIsSubmitted(true);
                    handleCreateUser();
                  }}
                >
                  Cadastrar
                </button>
              </form>
            </Modal.Body>
          </Modal>

          {/* Model Box Finsihs */}
          <ModalViewUser
            show={showUserModal}
            handleClose={handleCloseUserModal}
            user={viewUser}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
