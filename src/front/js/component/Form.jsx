import React from "react";
import { Province } from "../component/form-province.jsx";



const Form = ({ form, handleChange, handleSubmit, userType }) => { //se necesita pasar los params como obj para que funcione

  return (
<>
<div className="container text-center mt-5">
        <h2>CREAR NUEVA CUENTA</h2>
        <h5>Accede a todos los servicios de Jobs Hood !</h5>
      </div>
      <div className="container mt-5">
        <h4>Datos de Acceso</h4>
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <div className="row align-items-start my-3">

          {userType ==="company" && (
            <div className="col">     
              <label htmlFor="form-register-company" className="form-label">
                Nombre de la empresa
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                title="Please enter a valid name"
                className="form-control rounded-0"
                maxLength="80"
                required
              />
            </div>)}

            {userType ==="lawyer" && (
            <div className="col">     
              <label htmlFor="form-register-company" className="form-label">
                Nombre del abogado o Buffette
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                title="Please enter a valid name"
                className="form-control rounded-0"
                maxLength="80"
                required
              />
            </div>)}

            <div className="col">
              <label htmlFor="form-register-company" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                className="form-control rounded-0"
                maxLength="100"
                required
              />
            </div>
          </div>
          <div className="row align-items-start my-3">
            <div className="col">
              <label htmlFor="form-register-company" className="form-label">
                Dirección Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                className="form-control rounded-0"
                placeholder="name@example.com"
                maxLength="250"
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
                value={form.password}
                className="form-control rounded-0"
                aria-labelledby="passwordHelpInline"
                placeholder="Debe tener entre 8-20 caracteres."
                maxLength="20"
                required
              />
            </div>
          </div>
          <div className="row align-items-end my-3">
            <div className="col">
            
              <label htmlFor="form-register-company" className="form-label">
               Provincia
              </label>
             <Province value={form.province}  name="province" />

            </div>

            {userType ==="company" && (<div className="col">
              <label htmlFor="form-register-company" className="form-label">
                CIF
              </label>
              <input
                type="text"
                name="cif"
                value={form.cif}
                className="form-control rounded-0"
                placeholder="CIF"
                maxLength="10"
                required
              />
            </div>)}
{userType === "lawyer" && (
          <div className="col">
            <label htmlFor="form-register-company" className="form-label">
              Número de Colegiado
            </label>
            <input
              type="text"
              name="col_number"
              value={form.col_number}
              className="form-control rounded-0"
              maxLength="10"
              required
            />
          </div>
        )}
            <div className="col">
              <label htmlFor="form-register-company" className="form-label">
                Código postal
              </label>
              <input
                type="text"
                name="cp"
                value={form.cp}
                className="form-control rounded-0"
                placeholder="Código postal"
                maxLength="5"
                required
              />
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-dark mx-3  rounded-0"
            value="Registrarme"
          ></input>
        </form>
      </div>
</>
  )
}

export default Form