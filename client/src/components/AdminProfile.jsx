import ActualizarPerfil from "./Panel/UpdateProfile.jsx";
import MisClases from "./Panel/MyClasses.jsx";
import DefaultPanel from "./Panel/DefaultPanel.jsx";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useState } from "react";
import { parseJwt } from "./globalFunctions/parseJwt.js";

const AdminProfile = () => {
  let tokenValid = false;

  if (localStorage.getItem("token")) {
    const dataToken = parseJwt(localStorage.getItem("token"));
    tokenValid = dataToken.exp * 1000 > Date.now();
  }

  const [selectedComponent, setSelectedComponent] = useState(<DefaultPanel />);
  const [selectedButton, setSelectedButton] = useState(null);

  const buttons = [
    {
      label: "Actualizar Perfil",
      component: <ActualizarPerfil />,
      key: "actualizarPerfil",
    },
    { label: "Mis Clases", component: <MisClases />, key: "misClases" },
  ];

  return (
    <div className="bg-gradient-to-b from-secondary to-primary h-full min-h-screen">
      {!tokenValid ? (
        <>
          <header>
            <Nav />
          </header>
          <div className="flex justify-center items-center">
            <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:py-16 xl:px-8 dark:bg-fourth dark:border-fourth shadow-forms text-center">
              <h2 className="mt-4 text-3xl text-title font-bold mb-8">
                Para interactuar con esta parte de la página necesitarás tener
                una sesión activa.
              </h2>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Ingresa aquí
                </Link>
              </p>
              <p className="text-sm font-light text-text dark:text-gray-400">
                ¿No tienes una cuenta aún?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Créala aquí
                </Link>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full min-h-screen overflow-clip">
          <div className="w-2/12 shadow-panel flex flex-col items-center py-5">
            <Link to="/">
              <img src="../logo2.png" alt="Logo" className="h-20" />
            </Link>
            <ul className="mt-16 font-medium text-center">
              {buttons.map((button) => (
                <li
                  key={button.key}
                  onClick={() => {
                    setSelectedComponent(button.component);
                    setSelectedButton(button.key);
                  }}
                  className={`py-2 px-4 text-fourth rounded-2xl mb-6 border-2 border-fourth transition duration-150 ease-out hover:cursor-pointer ${
                    selectedButton === button.key
                      ? "shadow-innerBtns bg-opacity-80"
                      : "hover:shadow-innerBtns hover:bg-opacity-80 hover:cursor-pointer"
                  }`}
                >
                  {button.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <Nav showLogo={false} />
            <div className="pb-24">{selectedComponent}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
