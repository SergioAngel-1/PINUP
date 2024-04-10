const SeccionAboutUs = () => {
  const members = [
    [
      "Sergio Jáuregui",
      "../assets/members/Sergio.webp",
      "2020-2024",
      "Estudiante de ingeniería de software",
    ],
    [
      "Andrés Jimenez",
      "../assets/members/Andres.webp",
      "2020-2024",
      "Estudiante de ingeniería de software",
    ],
    [
      "Dubán Monroy",
      "../assets/members/Duban.webp",
      "2020-2024",
      "Estudiante de ingeniería de software",
    ],
    [
      "Andrés Castro",
      "../assets/members/Castro.webp",
      "2020-2024",
      "Estudiante de ingeniería de software",
    ],
    [
      "Camilo Anzola",
      "../assets/members/Camilo.webp",
      "2020-2024",
      "Estudiante de ingeniería de software",
    ],
  ];
  return (
    <div className="bg-fourth m-[-5px] p-24 flex-col-reverse md:flex-row md:gap-10 items-center">
      <div className="w-full Q text-center">
        <h1 className="mb-4 text-5xl text-title font-medium">
          ¿QUIENES SOMOS?
        </h1>
        <span className="italic text-text text-lg">Tu equipo de confianza</span>
      </div>
      <div className="mt-16">
        <ul className="timeline before:content">
          {members.map((fact, index) => (
            <li
              key={index}
              id={index}
              className={`before:content before:block before:absolute before:left-1/2 before:w-1 before:bg-white before:h-64 before:z-0 mb-20`}
            >
              <div
                className={`flex justify-center gap-5 ${
                  index % 2 == 0 ? "flex-row-reverse text-end" : ""
                }`}
              >
                <div className="w-4/12"></div>
                <div className="timeline-image rounded-full border-4 border-white bg-gray-400 h-44 w-44 flex items-center justify-center z-50">
                  <img className="rounded-full" src={fact[1]} alt={fact[0]} />
                </div>
                <div className="timeline-panel w-4/12">
                  <div className="timeline-heading bg-fourth text-white p-4 rounded-t-lg">
                    <h4 className="text-xl">{fact[2]}</h4>
                    <h3 className="subheading text-2xl">{fact[0]}</h3>
                  </div>
                  <div
                    className={`timeline-body bg-fourth ${
                      index % 2 == 0 ? "pe-4" : ""
                    } ps-4`}
                  >
                    <p className="text-text">{fact[3]}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
          <li className="mb-20">
            <div className="flex justify-center gap-5">
              <div className="w-4/12"></div>
              <div className="timeline-image rounded-full border-4 border-white bg-fourth h-44 w-44 flex items-center justify-center z-50 text-center">
                <p className="rounded-full text-white text-bold text-lg">
                  ¡Te esperamos!
                </p>
              </div>
              <div className="timeline-panel w-4/12">
                <div className="w-4/12"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SeccionAboutUs;
