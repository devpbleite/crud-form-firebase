import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalViewUser = ({ show, handleClose, viewUser }) => {
  return (
    <Modal show={show} onHide={handleClose}>
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
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalViewUser;
