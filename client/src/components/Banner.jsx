import Nav from "./Nav.jsx";

const Banner = () => {
  return (
    <div className="banner relative">
      <div className="relative">
        <Nav />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="text-white text-4xl italic font-medium mb-4">
          INSCRÍBETE AHORA
        </h2>
        <h1 className="bannerTitle text-7xl font-bold mx-24">
          <span className="text-third">
            A LA <span className="underline">MEJOR</span>{" "}
          </span>
          <span className="text-secondary">ACADEMIA DE BAILE</span>
        </h1>
        <button className="bannerButton bg-primary hover:bg-third text-white font-normal py-2 px-4 mt-24 rounded w-80">
          Ver planes
        </button>
      </div>
    </div>
  );
};

export default Banner;
