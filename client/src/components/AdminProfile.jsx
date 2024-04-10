import Nav from "./Nav";
import { Link } from "react-router-dom";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const AdminProfile = () => {
  let tokenValid = false;
  if (localStorage.getItem("token")) {
    const dataToken = parseJwt(localStorage.getItem("token"));
    tokenValid = dataToken.exp * 1000 > Date.now();
  }

  return (
    <div className="bg-gradient-to-b from-secondary to-primary h-full pb-16 min-h-screen">
      <header>
        <Nav />
      </header>
      {!tokenValid ? (
        <>
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
        <></>
      )}
    </div>
  );
};

export default AdminProfile;
