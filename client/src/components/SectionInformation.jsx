const SeccionInformation = () => {
  return (
    <div className="bg-fourth m-[-5px] p-24 flex flex-col-reverse md:flex-row md:gap-10 items-center">
      <div className="w-1/2 text-center">
        <img
          src="../banners/sectionInformation.webp"
          alt="Información Planes"
          className="w-auto rounded-2xl mb-6"
        />
        <span className="italic font-bold text-text">
          Baile Urbano - Medellín, Colombia.
        </span>
      </div>
      <div className="mt-8 md:mt-0 md:ml-30 w-1/2">
        <hr className="bg-secondary h-1" />
        <h2 className="mt-4 text-4xl text-title font-bold">PLANES POPULARES</h2>
        <p className="text-text mt-8">
          ¡Descubre tu ritmo y libera tu energía con nuestros planes de baile
          urbano! Desde principiantes hasta avanzados, tenemos el plan perfecto
          para ti. Con instructores expertos y horarios flexibles, ¡prepárate
          para brillar en la pista con nosotros!
        </p>
        <button className="bannerButton bg-primary hover:bg-third text-white font-normal py-2 px-4 mt-8 rounded w-80">
          Ver planes
        </button>
      </div>
    </div>
  );
};

export default SeccionInformation;
