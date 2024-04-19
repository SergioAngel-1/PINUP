const DefaultPanel = () => {
  return (
    <div className="text-center flex flex-col gap-12 justify-center items-center h-[inherit] mt-32 text-fourth">
      <h1 className="bannerTitle text-7xl font-bold mx-24">
        Bienvenido al panel de administración de PINUP
      </h1>
      <span className="font-medium text-4x1">
        Acá podrás editar tus datos personales, ver, agendar, editar y cancelar
        tus clases.
      </span>
    </div>
  );
};

export default DefaultPanel;
