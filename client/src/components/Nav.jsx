import { Link } from "react-router-dom";
import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiAccountPinCircleFill } from "react-icons/ri";

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

const Nav = () => {
  let tokenValid = false;
  let fullName = "";
  if (localStorage.getItem("token")) {
    const dataToken = parseJwt(localStorage.getItem("token"));
    tokenValid = dataToken.exp * 1000 > Date.now();

    const dataUser = dataToken.credentials;
    fullName = `${dataUser.nombre} ${dataUser.apellido}`;
  }

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setClick(false);
  };

  return (
    <header>
      <nav className="h-10vh flex justify-between items-center z-50 text-white lg:py-5 px-10 py-4 relative">
        <Link to="/">
          <img src="../logo2.png" alt="Logo" className="h-20" />
        </Link>
        <div className="flex items-center">
          {!tokenValid ? (
            <>
              <button
                className="text-5xl text-white focus:outline-none"
                onClick={handleClick}
              >
                {click ? <FaTimesCircle /> : <IoPersonCircleSharp />}
              </button>
              {click && (
                <div className="absolute top-16 right-4 w-64 bg-slate-900 text-white rounded-lg mt-6 py-2 px-4">
                  <ul className="text-center">
                    <li className="my-4 hover:bg-slate-800 hover:rounded">
                      <Link to="/register" onClick={() => setClick(false)}>
                        Registrarse
                      </Link>
                    </li>
                    <li className="my-4 hover:bg-slate-800 hover:rounded">
                      <Link to="/login" onClick={() => setClick(false)}>
                        Iniciar Sesión
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                className="text-5xl text-white focus:outline-none"
                onClick={handleClick}
              >
                {click ? <FaTimesCircle /> : <RiAccountPinCircleFill />}
              </button>
              {click && (
                <div className="absolute top-16 right-4 w-64 bg-slate-900 text-white rounded-lg mt-6 py-2 px-4">
                  <ul className="text-center">
                    <li className="my-4 hover:bg-slate-800 hover:rounded">
                      <Link to="/profile" onClick={() => setClick(false)}>
                        Mi perfil {fullName}
                      </Link>
                    </li>
                    <li className="my-4 hover:bg-slate-800 hover:rounded">
                      <Link to="/" onClick={handleLogout}>
                        Cerrar Sesión
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
