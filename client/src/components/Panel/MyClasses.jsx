import { useState, useEffect } from "react";
import { parseJwt } from "../globalFunctions/parseJwt";
import { getCurrentDate } from "../globalFunctions/currentDate";
import { FaTrashAlt, FaMoneyBillAlt } from "react-icons/fa";
import { LuSave } from "react-icons/lu";

const MyClasses = () => {
  const [noData, setNoData] = useState(true);
  const [data, setData] = useState({
    id_usuario: null,
    id_clase: null,
    nombre: "",
    profesor: "",
    baile: "",
    fecha: "",
    estado: "",
    precio: "",
  });

  const [showTable, setShowTable] = useState(false);
  const handleButtonClick = () => {
    setShowTable(!showTable);
  };

  const [teachers, setTeachers] = useState({
    id_profesor: null,
    nombre: "",
    apellido: "",
    email: "",
  });
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const [danceTypes, setDanceTypes] = useState([]);
  const [selectedDanceTypes, setSelectedDanceTypes] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [dataLoaded, setDataLoaded] = useState(true);

  useEffect(() => {
    if (dataLoaded) {
      const dataToken = parseJwt(localStorage.getItem("token"));
      const userId = dataToken.credentials.userId;
      const userRol = dataToken.credentials.userRol;

      fetch(`${import.meta.env.VITE_BACKEND_URL}/getDataClasses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, userRol: userRol }),
      })
        .then((response) => response.json())
        .then((result) => {
          switch (result.message) {
            case "dataObtained":
              setData(result.body);
              setNoData(false);
              break;
            default:
              setData([]);
              setNoData(true);
              break;
          }
        })
        .finally(() => {
          setDataLoaded(false); // Evita que se vuelva a ejecutar la solicitud de datos
        });
    }
  }, [dataLoaded]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/getRolUsersClasses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTeachers(data.body);
      })
      .catch((error) =>
        console.error("Error al cargar los profesores:", error)
      );
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/getTypesDance`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDanceTypes(data.body);
      })
      .catch((error) =>
        console.error("Error al cargar los profesores:", error)
      );
  }, []);

  const saveClass = () => {
    const dataToken = parseJwt(localStorage.getItem("token"));
    const userId = dataToken.credentials.userId;

    const data = {
      userId: userId,
      teacherId: selectedTeacher,
      danceTypeId: selectedDanceTypes,
      date: selectedDate,
    };

    if (data.userId && data.teacherId && data.danceTypeId && data.date) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/saveNewClass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          switch (result.message) {
            case "insertSuccesfully":
              console.log("Clase insertada correctamente");
              setDataLoaded(true);
              handleButtonClick();
              break;
            default:
              console.log("Error al insertar la clase");
              break;
          }
        });
    } else {
      console.error("Datos incompletos");
    }
  };

  const removeClass = (id_clase) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/removeClass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_clase }),
    })
      .then((response) => response.json())
      .then((result) => {
        switch (result.message) {
          case "updateClassSuccesfully":
            console.log("Clase eliminada correctamente");
            setDataLoaded(true);
            break;
          default:
            console.error("Error al insertar la clase");
            break;
        }
      });
  };

  const payClass = (clase) => {
    const dataToken = parseJwt(localStorage.getItem("token"));
    const userEmail = dataToken.credentials.email;
    const id_clase = clase.id_clase;
    let linkWhatsApp = "";

    fetch(`${import.meta.env.VITE_BACKEND_URL}/payClassWhatsApp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_clase }),
    })
      .then((response) => response.json())
      .then((result) => {
        switch (result.message) {
          case "updateClassSuccesfully":
            linkWhatsApp = `https://api.whatsapp.com/send?phone=573203180670&text=Hola%2C%20quiero%20pagar%20la%20clase%20con%20id%20${id_clase}.`;
            linkWhatsApp += "%0A";
            linkWhatsApp += `Los datos de la clase son:`;
            linkWhatsApp += "%0A";
            linkWhatsApp += `Nombre estudiante: ${clase.nombre}.`;
            linkWhatsApp += "%0A";
            linkWhatsApp += `Profesor clase: ${clase.profesor}.`;
            linkWhatsApp += "%0A";
            linkWhatsApp += `Tipo de baile: ${clase.baile}.`;
            linkWhatsApp += "%0A";
            linkWhatsApp += `Fecha elegida: ${clase.fecha}.`;
            linkWhatsApp += "%0A";
            linkWhatsApp += `Precio clase: ${clase.precio}.`;
            linkWhatsApp += "%0A";
            linkWhatsApp += `Quiero validar los datos y realizar mi pago, por favor, mi correo registrado en la página web es: ${userEmail}`;
            window.open(linkWhatsApp);
            setDataLoaded(true);
            break;
          default:
            console.error("Error al enviar el link de pago.");
            break;
        }
      });
  };

  return (
    <div className="flex flex-col justify-center mt-8 items-center">
      <div className="w-10/12 flex flex-col justify-center items-center bg-fourth p-8 rounded-2xl shadow-forms gap-4">
        <h1 className="text-center text-white font-medium text-3xl">
          ADMINISTRA TUS CLASES DE BAILE
        </h1>
        {noData ? (
          <span className="text-text italic text-center">
            No tienes clases agendadas
          </span>
        ) : (
          <div className="w-full text-center">
            <span className="text-text italic">Tus clases agendadas son:</span>
            <div className="overflow-hidden border border-gray-200 shadow-md rounded-lg my-6">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-fourth uppercase text-center tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-fourth uppercase text-center tracking-wider">
                      Profesor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-fourth uppercase text-center tracking-wider">
                      Baile
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-fourth uppercase text-center tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-fourth uppercase text-center tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-fourth uppercase text-center tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-fourth uppercase text-center tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((clase, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fourth">
                        {clase.nombre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fourth">
                        {clase.profesor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fourth">
                        {clase.baile}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fourth">
                        {clase.fecha}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fourth">
                        {clase.estado}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fourth">
                        ${clase.precio}
                      </td>
                      {clase.estado !== "Pago" &&
                      clase.estado !== "Pendiente" ? (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center items-center">
                          <FaTrashAlt
                            className="cursor-pointer text-red-500 mr-2 text-2xl"
                            onClick={() => removeClass(clase.id_clase)}
                            title="Cancelar."
                          />

                          <FaMoneyBillAlt
                            className="cursor-pointer text-green-500 text-3xl"
                            onClick={() => payClass(clase)}
                            title="Pagar"
                          />
                        </td>
                      ) : (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center items-center">
                          <FaTrashAlt
                            className="cursor-not-allowed text-red-300 mr-2 text-2xl"
                            title="Para cancelar una clase paga o pendiente de pago, contáctese con el administrador."
                          />
                          <FaMoneyBillAlt
                            className="cursor-not-allowed text-green-300 text-3xl"
                            title="Esta clase ya se en proceso de pago."
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h1 className="text-right text-text font-normal mr-4 hover:underline hover:cursor-pointer">
              <a
                href="https://api.whatsapp.com/send?phone=573203180670&text=Hola,%20quiero%20hablar%20con%20un%20administrador"
                target="_blank"
              >
                Hablar con un administrador.
              </a>
            </h1>
          </div>
        )}
        {showTable && (
          <div className="overflow-hidden border border-gray-200 shadow-md rounded-lg my-6">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-fourth uppercase text-center tracking-wider">
                    Profesor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-fourth uppercase text-center tracking-wider">
                    Baile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-fourth uppercase text-center tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-fourth uppercase text-center tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-fourth uppercase text-center tracking-wider">
                    Guardar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-fourth">
                    <select
                      name="teacher"
                      id="teacher"
                      value={selectedTeacher}
                      onChange={(e) => setSelectedTeacher(e.target.value)}
                      className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-fourth text-base text-center p-2 border-2 border-text"
                      required
                    >
                      <option value="" disabled hidden>
                        Seleccionar
                      </option>
                      {Object.entries(teachers).map(([key, teacher]) => (
                        <option key={teacher.id} value={teacher.id} id={key}>
                          {teacher.nombre} {teacher.apellido}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-fourth">
                    <select
                      name="baile"
                      id="baile"
                      value={selectedDanceTypes}
                      onChange={(e) => setSelectedDanceTypes(e.target.value)}
                      className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-fourth text-base text-center p-2 border-2 border-text"
                      required
                    >
                      <option value="" disabled hidden>
                        Seleccionar
                      </option>
                      {danceTypes.map((danceType) => (
                        <option key={danceType.id} value={danceType.id}>
                          {danceType.nombre_baile}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-fourth">
                    <input
                      className="p-2 border-2 border-text rounded-md focus:border-fourth"
                      onChange={(e) => setSelectedDate(e.target.value)}
                      type="date"
                      min={getCurrentDate()}
                      required
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-fourth font-medium">
                    {selectedDanceTypes &&
                    danceTypes[selectedDanceTypes - 1] ? (
                      <span>${danceTypes[selectedDanceTypes - 1].precio}</span>
                    ) : (
                      <span className="text-text italic">
                        Seleccione un tipo de baile
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex justify-center">
                      <LuSave
                        className="cursor-pointer text-fourth text-2xl"
                        onClick={() => saveClass()}
                        title="Guardar"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <button
          className="rounded-2xl border-white text-white border-2 p-2"
          onClick={handleButtonClick}
        >
          {showTable ? "Cancelar" : "Agendar Nueva Clase"}
        </button>
      </div>
    </div>
  );
};
export default MyClasses;
