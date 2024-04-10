import CardInfo from "./CardInfo";

const SeccionInformation = () => {
  const benefits = [
    [
      "EJERCICIO",
      "../assets/benefits/benefit_exercise.webp",
      "./Benefits.jsx",
    ],
    [
      "SALUD FÍSICA",
      "../assets/benefits/benefit_healty.webp",
      "./Benefits.jsx",
    ],
    [
      "DOTACIÓN COMPLETA",
      "../assets/benefits/benefit_endowment.webp",
      "./Benefits.jsx",
    ],
    [
      "MOTIVACIÓN PERSONAL",
      "../assets/benefits/benefit_motivation.webp",
      "./Benefits.jsx",
    ],
    [
      "CLASES PERSONALIZADAS",
      "../assets/benefits/benefit_feeding.webp",
      "./Benefits.jsx",
    ],
    [
      "INFORMACIÓN ALIMENTICIA",
      "../assets/benefits/benefit_classes.webp",
      "./Benefits.jsx",
    ],
  ];

  return (
    <div className="bg-fourth m-[-5px] p-24 flex-col-reverse md:flex-row md:gap-10 items-center">
      <div className="w-full md:w-1/2">
        <span className="italic text-secondary text-lg">Beneficios</span>
        <hr className="mt-4 bg-secondary h-1" />
      </div>
      <div className="w-full Q">
        <h1 className="mt-8 text-5xl text-title font-bold">
          ¿CÓMO FUNCIONAMOS?
        </h1>
        <div className="flex flex-wrap mt-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <CardInfo
                title={benefit[0]}
                imageUrl={benefit[1]}
                moreUrl={benefit[2]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeccionInformation;
