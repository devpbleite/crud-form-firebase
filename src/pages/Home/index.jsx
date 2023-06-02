import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";

function Home() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [records, setRecords] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddRecord = (e) => {
    e.preventDefault();

    const newRecord = {
      id: records.length + 1,
      name,
      address,
      city,
      country,
    };

    setRecords([...records, newRecord]);

    setName("");
    setAddress("");
    setCity("");
    setCountry("");

    handleClose();
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
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.name}</td>
                    <td>{record.address}</td>
                    <td>{record.city}</td>
                    <td>{record.country}</td>
                    <td className="text-center">
                      <a
                        href="#"
                        className="view"
                        title="View"
                        data-toggle="tooltip"
                        style={{ color: "#10ab80" }}
                      >
                        <i className="material-icons">&#xE417;</i>
                      </a>
                      <span style={{ marginRight: "5px" }}></span>
                      <a
                        href="#"
                        className="edit"
                        title="Edit"
                        data-toggle="tooltip"
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
            <Modal.Title>Novo Usuário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="needs-validation" noValidate>
              <div className="form-group">
                <label htmlFor="validationServer01" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationServer01"
                  required
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="invalid-feedback">Preencha este campo.</div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddRecord}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
