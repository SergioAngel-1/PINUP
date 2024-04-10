// eslint-disable-next-line no-unused-vars
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const SeccionContact = () => {
  const refForm = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const serviceId = "service_l2577g8";
      const templateId = "template_h9uh50k";
      const apiKey = "T-ng2dpIc2Z1tTgNG";

      await emailjs.sendForm(serviceId, templateId, refForm.current, apiKey);
      console.log("Formulario enviado correctamente");
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }

    setSubmitting(false);
  };

  return (
    <div className="bg-fourth m-[-5px] p-24 yflex-col-reverse md:flex-row md:gap-10 items-center bg-form">
      <div className="w-full Q text-center mb-16">
        <h1 className="text-5xl text-title font-medium">CONTÁCTANOS</h1>
        <span className="italic text-text text-lg">
          Déjanos un mensaje y te responderemos lo más pronto posible
        </span>
      </div>
      <form className="w-full" action="" onSubmit={handleSubmit} ref={refForm}>
        <div className="flex gap-16 justify-center overflow-hidden">
          <div className="w-1/2">
            <fieldset className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-base font-normal text-gray-900 dark:text-white"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nombres y Apellidos"
                required
              />
            </fieldset>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-base font-normal text-gray-900 dark:text-white"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="example@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-base font-normal text-gray-900 dark:text-white"
              >
                Teléfono de contacto
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="+57"
                required
              />
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="message"
              className="block mb-2 text-base font-normal text-gray-900 dark:text-white"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              rows="4"
              name="message"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[86%]"
              placeholder="Deja un comentario..."
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-third text-white font-normal py-3 px-6 mt-24 rounded w-full md:w-80"
            disabled={submitting || formSubmitted}
          >
            {submitting
              ? "Enviando..."
              : formSubmitted
              ? "Correo enviado"
              : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SeccionContact;
