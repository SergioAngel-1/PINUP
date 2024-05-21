import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { parseJwt } from "../globalFunctions/parseJwt.js";

const ActualizarPerfil = () => {
  const [estadoBoton, setEstadoBoton] = useState("Actualizar Datos");
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);
  const [cambiarContrasena, setCambiarContrasena] = useState(false);
  const navigate = useNavigate();
  const refForm = useRef(null);
  const refPassword = useRef(null);
  const errorSpanRef = useRef(null);

  const toggleCambiarContrasena = () => {
    setCambiarContrasena((prevState) => !prevState);
  };

  const [userData, setUserData] = useState({
    id: null,
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    ciudad: "",
    fecha_nacimiento: "",
    contrasena: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const dataToken = parseJwt(localStorage.getItem("token"));
      const emailStorage = dataToken.credentials.email;

      fetch(`${import.meta.env.VITE_BACKEND_URL}/getDataUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailStorage }),
      })
        .then((response) => response.json())
        .then((result) => {
          switch (result.message) {
            case "dataObtained":
              setUserData(result.body);
              break;
            default:
              break;
          }
        });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(refForm.current);
    const formValues = Object.fromEntries(formData.entries());
    const errorAlert = errorSpanRef.current;

    if (!formValues.name || !formValues.lastName) {
      errorAlert.innerText =
        "Los datos obligatorios deben estar diligenciados.";
      return;
    }

    if (formValues.tel && formValues.tel.length !== 10) {
      errorAlert.innerText = "El número de teléfono debe tener 10 dígitos.";
      return;
    }

    if (formValues.birthdate) {
      const birthdate = new Date(formValues.birthdate);
      const currentDate = new Date();

      if (birthdate > currentDate || birthdate == currentDate) {
        errorAlert.innerText =
          "La fecha de nacimiento debe ser menor a la fecha actual.";
        return;
      }
    }

    if (formValues.city == "Default") {
      formValues.city = null;
    }

    if (!cambiarContrasena) {
      formValues.password = null;
      formValues.confirmPassword = null;
    } else {
      if (!formValues.password) {
        errorAlert.innerText = "Introduzca una nueva contraseña.";
        return;
      }
      if (formValues.password !== formValues.confirmPassword) {
        errorAlert.innerText =
          "Las contraseñas no coinciden, intente de nuevo.";
        return;
      }
    }

    errorAlert.innerText = "";
    setBotonDeshabilitado(false);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/updateData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((result) => {
        switch (result.message) {
          case "error":
            errorAlert.innerText =
              "Ocurrió un error al momento de gestionar la petición, intente de nuevo.";
            setEstadoBoton("Actualizar Datos");
            setBotonDeshabilitado(false);
            break;
          case "updateNotSuccessfully":
            errorAlert.innerText =
              "Los datos ingresados no cambian en comparación a los que se encuentran en el sistema. Cambie un dato e intente de nuevo.";
            break;
          case "updateSuccessfully":
            errorAlert.style.color = "green";
            errorAlert.innerText =
              "Los datos fueron actualizados correctamente.";
            setEstadoBoton("Datos Actualizados");
            setBotonDeshabilitado(true);
            setTimeout(() => {
              if (result.updatedPassword) {
                localStorage.removeItem("token");
                navigate("/");
              } else {
                navigate("/profile");
              }
            }, 500);
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        setEstadoBoton("Actualizar datos");
        setBotonDeshabilitado(false);
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-fourth dark:border-fourth shadow-forms border-2 border-white">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Actualiza tus datos
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleSubmit}
            ref={refForm}
          >
            <div className="flex justify-between">
              <div className="w-1/2 mr-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombres
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={userData.nombre}
                  onChange={(e) =>
                    setUserData({ ...userData, nombre: e.target.value })
                  }
                  required
                />
              </div>
              <div className="w-1/2 ml-2">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Apellidos
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={userData.apellido}
                  onChange={(e) =>
                    setUserData({ ...userData, apellido: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed"
                value={userData.email}
                title="Para editar este campo contacte a un administrador"
                readOnly
              />
            </div>
            <div className="flex justify-between">
              <div className="w-1/2 mr-2">
                <label
                  htmlFor="tel"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Número telefónico
                </label>
                <input
                  type="tel"
                  name="tel"
                  id="tel"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={userData.telefono || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, telefono: e.target.value })
                  }
                  placeholder="+57"
                />
              </div>
              <div className="w-1/2 ml-2">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ciudad
                </label>
                <select
                  name="city"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={userData.ciudad || "Default"}
                  onChange={(e) =>
                    setUserData({ ...userData, ciudad: e.target.value })
                  }
                >
                  <option value="Default" disabled hidden>
                    Seleccione
                  </option>
                  <option
                    value="Bogotá D.C"
                    selected={userData.ciudad === "Bogotá D.C"}
                  >
                    Bogotá D.C
                  </option>
                  <option
                    value="Medellín"
                    selected={userData.ciudad === "Medellín"}
                  >
                    Medellín
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="birthdate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={
                  userData.fecha_nacimiento
                    ? userData.fecha_nacimiento.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setUserData({ ...userData, fecha_nacimiento: e.target.value })
                }
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                  ref={refPassword}
                  onChange={toggleCambiarContrasena}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  Cambiar Contraseña.
                </label>
              </div>
            </div>
            {cambiarContrasena && (
              <>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirma la contraseña
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
              </>
            )}
            <span
              ref={errorSpanRef}
              className="text-red-700 italic text-sm"
            ></span>
            <button
              type="submit"
              disabled={botonDeshabilitado}
              className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-white border-2"
            >
              {estadoBoton}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              ¿Quieres eliminar tu cuenta?{" "}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Click aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActualizarPerfil;
