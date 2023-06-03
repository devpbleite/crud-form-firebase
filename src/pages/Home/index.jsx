import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";

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
  };

  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewUser = (user) => {
    setViewUser(user);
    handleShowUserModal();
  };

  const handleAddRecord = (e) => {
    e.preventDefault();

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
      status,
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
              <Button variant="danger" onClick={handleShow}>
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
                  <th style={{ width: "25%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
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
                <label htmlFor="validationServer01" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationServer01"
                  required
                  placeholder="Digite o nome..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="invalid-feedback">Preencha este campo.</div>
              </div>
              <div className="form-group">
                <label>Login</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Insira uma senha..."
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Insira uma senha..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Digite o e-mail..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input
                  type="phone"
                  className="form-control"
                  placeholder="Insira um telefone..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>CPF</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Insira um CPF..."
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Data de Nascimento</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Insira uma data de nascimento..."
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Nome da Mãe</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Insira o nome da mãe..."
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                />
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <div className="input-group">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option selected value="1">
                        Ativo
                      </option>
                      <option value="2">Inativo</option>
                      <option value="3">Bloqueado</option>
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
        <Modal show={showUserModal} onHide={handleCloseUserModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalhes do Usuário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {viewUser && (
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <strong>Nome:</strong>
                    </td>
                    <td>{viewUser.name}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Login:</strong>
                    </td>
                    <td>{viewUser.login}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>E-mail:</strong>
                    </td>
                    <td>{viewUser.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Telefone:</strong>
                    </td>
                    <td>{viewUser.phone}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>CPF:</strong>
                    </td>
                    <td>{viewUser.cpf}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Data de Nascimento:</strong>
                    </td>
                    <td>{viewUser.birthdate}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Nome da Mãe:</strong>
                    </td>
                    <td>{viewUser.motherName}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Status:</strong>
                    </td>
                    <td>{viewUser.status}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUserModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
