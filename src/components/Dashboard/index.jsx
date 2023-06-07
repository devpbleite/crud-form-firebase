import { Button } from "react-bootstrap";

const Dashboard = ({
  LogoImage,
  searchTerm,
  handleSearch,
  handleShow,
  currentRecords,
  users,
  startIndex,
  statusOptions,
  handleViewUser,
  handleEditIconClick,
  handleDeleteUser,
  handleLogout,
  currentPage,
  totalPages,
  handlePaginationClick,
}) => {
  return (
  <div
    className="crud shadow-lg p-3 bg-body mx-auto rounded"
    style={{
      maxWidth: "1100px",
      maxHeight: "800px",
      width: "100%",
      height: "100vh",
    }}
  >
    <div className="row" style={{ "--bs-gutter-x": 0 }}>
      <div className="col-12 col-sm-6 col-lg-4">
        <img src={LogoImage} alt="Logo" width={40} />
      </div>
      <div className="col-12 col-sm-6 col-lg-5 text-center">
        <h3 className="mb-4">Painel de Controle - Usuários</h3>
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

      <div className="col-12 col-md-8 mt-3 text-end pb-4 text-end">
        <Button variant="danger" onClick={handleShow}>
          Novo Usuário
        </Button>
      </div>
    </div>
    <div className="row">
      <div className="table-responsive mb-4">
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
              <tr key={user.id}>
                <td>{startIndex + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.cpf}</td>
                <td>{user.login}</td>
                <td>{statusOptions[user.status]}</td>
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
                    onClick={() => handleEditIconClick(user)}
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
    <div className="d-flex justify-content-between">
      <Button
        className="btn-sm btn-danger align-self-center"
        onClick={handleLogout}
      >
        Sair
      </Button>
      <nav
        className="mt-1 d-flex justify-content-center"
        aria-label="Page navigation"
      >
        <ul
          className="pagination pagination-sm d-flex justify-content-center"
          style={{ marginBottom: "0" }}
        >
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
    </div>
  </div>
  )
};

export default Dashboard;