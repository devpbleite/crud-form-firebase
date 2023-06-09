import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  updateDoc,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { firebaseApp } from "../../services/firebaseConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../context/AuthContext";
import UserModal from "../../components/UserModal";
import ModalViewUser from "../../components/ModalViewUser";
import Dashboard from "../../components/Dashboard";
import LogoImage from "../../assets/logo.png";
import Swal from "sweetalert2";

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
  const [editUser, setEditUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    setEditUser(null);
    resetForm();
    setShow(false);
  };
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

  const statusOptions = {
    1: "Ativo",
    2: "Inativo",
    3: "Bloqueado",
  };

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
      console.log("Usuário deslogado");
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
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

    return errors;
  };

  const handleEditIconClick = (user) => {
    setEditUser(user);
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
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setEditUser(null);

    try {
      const db = getFirestore(firebaseApp);
      await addDoc(collection(db, "users"), {
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

      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Usuário cadastrado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Ocorreu um erro ao criar o usuário. Por favor, tente novamente mais tarde.",
      });
    }
  };

  const handleUpdateUser = async () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    const db = getFirestore(firebaseApp);
    const userDocRef = doc(db, "users", editUser.id);
    await updateDoc(userDocRef, {
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

    Swal.fire({
      icon: "success",
      title: "Sucesso!",
      text: "Usuário atualizado com sucesso!",
    });
  };

  const handleDeleteUser = async (id) => {
    const db = getFirestore(firebaseApp);
    const userDoc = doc(db, "users", id);

    await Swal.fire({
      title: "Tem certeza disso?",
      text: "Você não poderá reverter a exclusão!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, exclua!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(userDoc);
        Swal.fire(
          "Deletado!",
          "O usuário foi excluído com sucesso!",
          "success"
        );
      }
    });
  };

  useEffect(() => {
    if (showLogoutAlert) {
      Swal.fire({
        title: "Deseja sair?",
        text: "Você será redirecionado para a página de login.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sair",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          setShowLogoutAlert(false);
          window.location.href = "/";
        } else {
          setShowLogoutAlert(false);
        }
      });
    }
  }, [showLogoutAlert]);

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
    <div className="p-3 h-100 d-flex justify-content-center align-items-center">
      <Dashboard
        LogoImage={LogoImage}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        handleShow={handleShow}
        currentRecords={currentRecords}
        users={users}
        startIndex={startIndex}
        statusOptions={statusOptions}
        handleViewUser={handleViewUser}
        handleEditIconClick={handleEditIconClick}
        handleDeleteUser={handleDeleteUser}
        handleLogout={handleLogout}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePaginationClick={handlePaginationClick}
      />

      <div>
        <UserModal
          show={show}
          handleClose={handleClose}
          handleCreateUser={handleCreateUser}
          handleUpdateUser={handleUpdateUser}
          editUser={editUser}
          setEditUser={setEditUser}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          validationErrors={validationErrors}
          name={name}
          setName={setName}
          login={login}
          setLogin={setLogin}
          password={password}
          setPassword={setPassword}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          cpf={cpf}
          setCpf={setCpf}
          birthdate={birthdate}
          setBirthdate={setBirthdate}
          motherName={motherName}
          setMotherName={setMotherName}
          status={status}
          setStatus={setStatus}
          statusOptions={statusOptions}
        />

        <ModalViewUser
          show={showUserModal}
          handleClose={handleCloseUserModal}
          user={viewUser}
        />
      </div>
    </div>
  );
}

export default Home;
