import React, {useState, useContext} from "react";
import {Context} from "../store/appContext.js";
import {Province} from "../component/form-province.jsx";
import LinkButton from "../component/LinkButton.jsx";
import {editCompany} from "../services/company.js";
import Spinner from "../component/Spinner.jsx";
import Avatar from "../component/avatar.jsx";
import {useNavigate} from "react-router-dom";
import {checkUser} from "../services/user.js";
import Alert from "../component/Alert.jsx";

export const EditProfileCompany = () => {
  const {store, actions} = useContext(Context);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [editedCompany, setEditedCompany] = useState({
    name: store.user.name,
    email: store.user.email,
    address: store.user.company.address,
    province: store.user.company.province,
    cif: store.user.company.cif,
  });


  const handleChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          //console.log("result", reader.result);
          setFileUrl(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
    const {name, value} = event.target;
    setEditedCompany((prevState) => ({
      ...prevState,
      [name]: value,
    }))}
  };

  const handleSubmit = async (event) => {
    setSpinner(true);
    event.preventDefault();
    if (store.user.email !== editedCompany.email) {
      //si el email ha cambiado
      const check = await checkUser(editedCompany, "edit"); //el parametro para editar
      if (!check.error) {
        try {
          const response = await editCompany(editedCompany, file);
          // Guardamos el nuevo token en el localStorage
          localStorage.setItem("token", response);
          setSpinner(false);
          navigate("/company/profile");
        } catch (error) {
          setSpinner(false);
          setAlert(true);
          setClassName("danger");
          setMessage("Error del servidor");
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        }
      } else {
        setSpinner(false);
        setAlert(true);
        setClassName("danger");
        setMessage(check.msg);
      }
    } else {
      //si no cambia el email
      try {
        await editCompany(editedCompany, file);
        setEditedCompany(store.user);
        setSpinner(false);
        navigate("/company/profile");
      } catch (error) {
        setSpinner(false);
        setAlert(true);
        setClassName("danger");
        setMessage("Error del servidor");
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      }
    }
  };
  

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <div className="container my-5">
          {" "}
          <h1> Edición de Usuario</h1>
          <form onSubmit={handleSubmit}>
            <div className="row my-3">
              <div className="col">
              <Avatar  handleChange={handleChange} fileUrl={fileUrl} file={file}/>
              </div>
            </div>
            {alert && (
              <div className="d-flex justify-content-center m-5">
                <Alert className={className} message={message} />
              </div>
            )}
            <div className="row align-items-start my-3">
              <div className="col">
                <label htmlFor="form-register-company" className="form-label">
                  Nombre de la Empresa
                </label>
                <input
                  onChange={handleChange}
                  defaultValue={store.user.name}
                  type="text"
                  name="name"
                  title="Please enter a valid name"
                  className="form-control rounded-0"
                  maxLength="80"
                />
              </div>

              <div className="col">
                <label htmlFor="form-register-company" className="form-label">
                  Dirección
                </label>
                <input
                  onChange={handleChange}
                  defaultValue={store.user.company.address}
                  type="text"
                  name="address"
                  className="form-control rounded-0"
                  maxLength="100"
                />
              </div>
            </div>
            <div className="row align-items-start my-3">
              <div className="col">
                <label htmlFor="form-register-company" className="form-label">
                  Dirección Email
                </label>
                <input
                  onChange={handleChange}
                  defaultValue={store.user.email}
                  type="email"
                  name="email"
                  className="form-control rounded-0"
                  maxLength="250"
                />
              </div>
            </div>
            <div className="row align-items-end my-3">
              <div className="col">
                <label htmlFor="form-register-company" className="form-label">
                  Provincia
                </label>
                <Province handleChange={handleChange} name="province" />
              </div>
            </div>
            <div className="d-flex">
              <input
                type="submit"
                className="btn btn-dark mx-3  rounded-0"
                value="Guardar Cambios"
              ></input>
              <LinkButton direction="/company/profile" text="Cancelar" />
            </div>
          </form>
        </div>
      )}
    </>
  );
};
