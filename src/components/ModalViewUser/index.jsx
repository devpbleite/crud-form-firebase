import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalViewUser = ({ show, handleClose, user }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalhes do Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user && (
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Nome:</strong>
                </td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Login:</strong>
                </td>
                <td>{user.login}</td>
              </tr>
              <tr>
                <td>
                  <strong>Senha:</strong>
                </td>
                <td>{user.password}</td>
              </tr>
              <tr>
                <td>
                  <strong>E-mail:</strong>
                </td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>
                  <strong>Telefone:</strong>
                </td>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <td>
                  <strong>CPF:</strong>
                </td>
                <td>{user.cpf}</td>
              </tr>
              <tr>
                <td>
                  <strong>Data de Nascimento:</strong>
                </td>
                <td>{user.birthdate}</td>
              </tr>
              <tr>
                <td>
                  <strong>Nome da Mãe:</strong>
                </td>
                <td>{user.motherName}</td>
              </tr>
              <tr>
                <td>
                  <strong>Status:</strong>
                </td>
                <td>{user.status}</td>
              </tr>
            </tbody>
          </table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalViewUser;
