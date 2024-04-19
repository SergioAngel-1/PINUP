import Nav from "./Nav";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const Register = () => {
  const [estadoBoton, setEstadoBoton] = useState("Crear cuenta");
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);
  const navigate = useNavigate();
  const refForm = useRef(null);
  const refTerms = useRef(null);
  const errorSpanRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(refForm.current);
    const formValues = Object.fromEntries(formData.entries());

    const errorAlert = errorSpanRef.current;

    if (
      !formValues.email &&
      !formValues.password &&
      !formValues.confirmPassword &&
      !formValues.name &&
      !formValues.lastName
    ) {
      if (!formValues.acceptedTerms) {
        if (!formValues.password === !formValues.confirmPassword) {
          errorAlert.innerText = null;
          setEstadoBoton("Creando cuenta");
          setBotonDeshabilitado(true);
          fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
          })
            .then((response) => response.json())
            .then((result) => {
              switch (result.message) {
                case "userExists":
                  errorAlert.innerText =
                    "El correo ya está registrado en la base de datos.";
                  setEstadoBoton("Crear cuenta");
                  setBotonDeshabilitado(false);
                  break;
                case "error":
                  errorAlert.innerText =
                    "Ocurrió un error al momento de gestionar la petición, intente de nuevo.";
                  setEstadoBoton("Crear cuenta");
                  setBotonDeshabilitado(false);
                  break;
                case "createSuccessfully":
                  errorAlert.style.color = "green";
                  errorAlert.innerText =
                    "El usuario fue creado satisfactoriamente, serás redireccionado al inicio de sesión.";
                  setEstadoBoton("Cuenta creada");
                  setBotonDeshabilitado(true);
                  setTimeout(() => {
                    navigate("/login");
                  }, 1500);
                  break;
                default:
                  break;
              }
            })
            .catch((error) => {
              setEstadoBoton("Crear cuenta");
              setBotonDeshabilitado(false);
              console.error(error);
            });
        } else {
          errorAlert.innerText =
            "Las contraseñas no coinciden, intenta de nuevo.";
        }
      } else {
        errorAlert.innerText = "Debes aceptar los términos y condiciones.";
      }
    } else {
      errorAlert.innerText =
        "Por favor diligencie todos los campos del formulario.";
    }
  };

  return (
    <div className="bg-gradient-to-r from-secondary to-primary h-full pb-16 min-h-screen">
      <header>
        <Nav />
      </header>
      <div className="flex justify-center items-center">
        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-fourth dark:border-fourth shadow-forms">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crear una cuenta en PINUP
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
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nombre"
                    required=""
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
                    placeholder="Apellidos"
                    required=""
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@usbbog.com"
                  required=""
                />
              </div>
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
              <span
                ref={errorSpanRef}
                className="text-red-700 italic text-sm"
              ></span>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                    ref={refTerms}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    Al crear la cuenta aceptas{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Términos y condiciones
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={botonDeshabilitado}
                className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-white border-2"
              >
                {estadoBoton}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Ingresa aquí
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
