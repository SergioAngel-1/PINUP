const Footer = () => {
  return (
    <div className="bg-white px-24 py-4 flex-col-reverse md:flex-row md:gap-10 items-center">
      <div className="flex gap-16 justify-between items-center font-medium text-fourth">
        <div>
          <span className="hover:underline hover:cursor-pointer">
            Copyright © Pin Up 2023
          </span>
        </div>
        <div>
          <ul className="flex gap-16">
            <li className="hover:underline hover:cursor-pointer">
              Políticas de privacidad
            </li>
            <li className="hover:underline hover:cursor-pointer">
              Terminos y condiciones
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
