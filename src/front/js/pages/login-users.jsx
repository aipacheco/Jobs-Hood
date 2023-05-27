import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {loginUser, getUserPrivate} from "../services";
import {useParams} from "react-router-dom";
import LinkButton from "../component/LinkButton.jsx";
import Spinner from "../component/Spinner.jsx";
import {Navbar} from "../component/navbar.js";
import Alert from "../component/Alert.jsx";
import "../../styles/login.css";

export const Login = (props) => {
  const params = useParams();
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = ({target}) => {
    setLogin({...login, [target.name]: target.value}); // se setean los cambios en el usestate de Login
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSpinner(true);
    const isLogin = await loginUser(login);
    try {
      if (!isLogin.error) {
        const token = localStorage.getItem("token");
        const user = await getUserPrivate(token);
        localStorage.setItem("role", user.role); //seteamos el rol del usuario al localstorage para usarlo en otras páginas como companyProfile
        setAlert(true);
        setClassName("success");
        setMessage("Login correcto");
        setTimeout(() => {
          if (user.company) {
            navigate("/company/profile");
          } else if (user.lawyer) {
            navigate("/lawyer/profile");
          } else {
            navigate("/worker/profile");
          }
        }, 1500);
      } else {
        setAlert(true);
        setClassName("danger");
        setMessage(isLogin.msg);
      }
    } catch (error) {
      setAlert(true);
      setClassName("danger");
      setMessage("error del servidor");
    }
    setSpinner(false);
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <div className="login">
          <Navbar />
          <div className="container-register">
            <div className="card card-form p-5 m-5">
              <form onChange={handleChange} onSubmit={handleSubmit}>
                <h5 className="text-center">Iniciar Sesión en Jobs Hood</h5>
                {alert && (
                  <div className="d-flex justify-content-center m-5">
                    <Alert className={className} message={message} />
                  </div>
                )}
                <div>
                  <div className="col">
                    <label htmlFor="form-login" className="form-label">
                      Dirección Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control rounded-0"
                      placeholder="email@gmail.com"
                      required
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="inputPassword6" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control rounded-0"
                      aria-labelledby="passwordHelpInline"
                      placeholder="Contraseña"
                      required
                    />
                  </div>

                  <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="btn btn-success mt-3"
                  ></input>
                </div>
              </form>
            </div>
          </div>

          <div className="container">
            <div className="row">
            <div className="d-flex justify-content-start">
              <Alert
                className={"success"}
                message="¿No estás registrado? Crea tu cuenta para poder acceder a
                  nuestros servicios"
              />
            </div>
            </div>

            <div className="row">
            <div className="d-flex justify-content-start">
              <LinkButton
                direction={"/register"}
                text={"Ir a la página de registro"}
              />  
            </div>
            </div>
            </div>

        </div>
      )}
    </>
  );
};
