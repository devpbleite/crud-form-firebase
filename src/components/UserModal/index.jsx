import React from "react";
import { Modal, Button } from "react-bootstrap";
import InputMask from "react-input-mask";

const UserModal = ({
  show,
  handleClose,
  handleCreateUser,
  handleUpdateUser,
  editUser,
  setEditUser,
  isSubmitted,
  setIsSubmitted,
  validationErrors,
  name,
  setName,
  login,
  setLogin,
  password,
  setPassword,
  email,
  setEmail,
  phone,
  setPhone,
  cpf,
  setCpf,
  birthdate,
  setBirthdate,
  motherName,
  setMotherName,
  status,
  setStatus,
}) => {
  return (
    <div className="model_box">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {editUser ? "Editar Usuário" : "Novo Usuário"}
            </Modal.Title>
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
                    isSubmitted && validationErrors.login ? "is-invalid" : ""
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
                    isSubmitted && validationErrors.password ? "is-invalid" : ""
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
                    isSubmitted && validationErrors.email ? "is-invalid" : ""
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
                    isSubmitted && validationErrors.phone ? "is-invalid" : ""
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
                    isSubmitted && validationErrors.cpf ? "is-invalid" : ""
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
                    isSubmitted && validationErrors.birthdate ? "is-invalid" : ""
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
                    isSubmitted && validationErrors.motherName ? "is-invalid" : ""
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
                      isSubmitted && validationErrors.status ? "is-invalid" : ""
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
              {editUser === null ? (
                <Button
                  className="mt-3"
                  variant="danger"
                  onClick={() => {
                    setIsSubmitted(true);
                    handleCreateUser();
                  }}
                >
                  Cadastrar
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="mt-3"
                  variant="danger"
                  onClick={() => {
                    setIsSubmitted(true);
                    handleUpdateUser();
                    setEditUser(null);
                  }}
                >
                  Atualizar
                </Button>
              )}
            </form>
          </Modal.Body>
        </Modal>
      </div>
  )
}

export default UserModal
