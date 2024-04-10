import Nav from "./Nav";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";

const Login = () => {
  const [textoBoton, setTextoBoton] = useState("Iniciar sesión"); // Estado para el texto del botón
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);
  const refForm = useRef(null);
  const errorSpanRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(refForm.current);
    const formValues = Object.fromEntries(formData.entries());

    const email = formValues.email;
    const password = formValues.password;
    const errorAlert = errorSpanRef.current;

    if ((email, password)) {
      errorAlert.innerText = null;
      setTextoBoton("Iniciando sesión");
      setBotonDeshabilitado(true);
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
        .then((response) => response.json())
        .then((result) => {
          switch (result.message) {
            case "userNotExists":
              errorAlert.innerText =
                "El correo no se encuentra registrado en la base de datos, cree una cuenta.";
              setTextoBoton("Iniciar sesión");
              setBotonDeshabilitado(false);
              break;
            case "incorrectCredentials":
              errorAlert.innerText =
                "Credenciales incorrectas, intente de nuevo.";
              setTextoBoton("Iniciar sesión");
              setBotonDeshabilitado(false);
              break;
            case "error":
              errorAlert.innerText =
                "Ocurrió un error al momento de gestionar la petición, intente de nuevo.";
              setTextoBoton("Iniciar sesión");
              setBotonDeshabilitado(false);
              break;
            case "correctCredentials":
              if (result.body) {
                localStorage.setItem("token", result.body);

                errorAlert.style.color = "green";
                errorAlert.innerText =
                  "Sesión iniciada correctamente, serás redireccionado a la página de inicio.";

                setTextoBoton("Sesión iniciada");
                setBotonDeshabilitado(true);

                setTimeout(() => {
                  navigate("/");
                }, 3000);
              } else {
                errorAlert.innerText =
                  "Ocurrió un error al generar el token de inicio de sesión.";

                setTextoBoton("Recargar página");
                setBotonDeshabilitado(true);
              }
              break;
            default:
              break;
          }
        })
        .catch((error) => {
          console.error(error);
        });
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
              Inicia sesión con tu cuenta
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
              ref={refForm}
            >
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
              <span
                ref={errorSpanRef}
                className="text-red-700 italic text-sm"
              ></span>
              <div className="flex items-center justify-end">
                <Link
                  href="/forgot"
                  className="text-sm font-medium text-white hover:underline dark:text-primary-500"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <button
                type="submit"
                disabled={botonDeshabilitado}
                className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-white border-2"
              >
                {textoBoton}
              </button>
              <p className="text-sm font-light text-text dark:text-gray-400">
                ¿No tienes una cuenta aún?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Créala aquí
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
