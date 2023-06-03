import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import ModalViewUser from "../../components/ModalViewUser";
import InputMask from "react-input-mask";
import LogoImage from "../../assets/logo.png";

function Home() {
  const [show, setShow] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [motherName, setMotherName] = useState("");
  const [status, setStatus] = useState("1");
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameError, setNameError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [motherNameError, setMotherNameError] = useState("");
  const [statusError, setStatusError] = useState("");

  const handleClose = () => {
    setShow(false);
    clearForm();
  };

  const handleShow = () => {
    setShow(true);
  };
  const handleCloseUserModal = () => setShowUserModal(false);
  const handleShowUserModal = () => setShowUserModal(true);

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

  const statusOptions = ["Ativo", "Inativo", "Bloqueado"];

  const handleAddRecord = (e) => {
    e.preventDefault();

    if (!name) {
      setNameError("O campo nome é obrigatório");
      return;
    }

    if (!login) {
      setLoginError("O campo login é obrigatório");
      return;
    }

    if (!password) {
      setPasswordError("O campo senha é obrigatório");
      return;
    }

    if (!email) {
      setEmailError("O campo e-mail é obrigatório");
      return;
    }

    if (!phone) {
      setPhoneError("O campo telefone é obrigatório");
      return;
    }

    if (!cpf) {
      setCpfError("O campo CPF é obrigatório");
      return;
    }

    if (!birthdate) {
      setBirthdateError("O campo data de nascimento é obrigatório");
      return;
    }

    if (!motherName) {
      setMotherNameError("O campo nome da mãe é obrigatório");
      return;
    }

    if (!status) {
      setStatusError("O campo status é obrigatório");
      return;
    }

    if (editingUser) {
      handleSaveUser();
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleString();

    const newRecord = {
      id: records.length + 1,
      name,
      login,
      password,
      email,
      phone,
      cpf,
      birthdate,
      motherName,
      status: statusOptions[parseInt(status) - 1],
      dataInclusao: formattedDate,
    };

    setRecords([...records, newRecord]);

    setName("");
    setLogin("");
    setPassword("");
    setEmail("");
    setPhone("");
    setCpf("");
    setBirthdate("");
    setMotherName("");
    setStatus("1");

    handleClose();
  };

  const newUser = () => {
    setEditingUser(null);
    setName("");
    setLogin("");
    setPassword("");
    setEmail("");
    setPhone("");
    setCpf("");
    setBirthdate("");
    setMotherName("");
    setStatus("1");
    handleShow();
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setName(user.name);
    setLogin(user.login);
    setPassword(user.password);
    setEmail(user.email);
    setPhone(user.phone);
    setCpf(user.cpf);
    setBirthdate(user.birthdate);
    setMotherName(user.motherName);
    setStatus(user.status);
    handleShow();
  };

  const handleSaveUser = () => {
    const updatedRecords = records.map((record) => {
      if (record.id === editingUser.id) {
        return {
          ...record,
          name,
          login,
          password,
          email,
          phone,
          cpf,
          birthdate,
          motherName,
          status,
        };
      }
      return record;
    });

    setRecords(updatedRecords);
    clearForm();
    handleClose();
  };

  const clearForm = () => {
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

  const handleDeleteUser = (id) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    setRecords(updatedRecords);
  };

  return (
    <div className="container">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row">
          <div className="col-sm-2">
            <img src={LogoImage} alt="Logo" width={40} />
          </div>
          <h2 className="mb-4">Painel de Controle - Usuários</h2>
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
      </div>
    </div>
  );
}

export default Home;
