const connection = require("../models/db");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;

  const sqlValidateEmail = "SELECT * FROM usuarios WHERE email = ?";
  const sqlValidateEmailAndPassword =
    "SELECT * FROM usuarios WHERE email = ? AND contrasena = ?";

  try {
    connection.query(sqlValidateEmail, [email], (error, result) => {
      if (error) {
        return res.status(500).json({ message: "error", error: error });
      }

      if (result.length > 0) {
        connection.query(
          sqlValidateEmailAndPassword,
          [email, password],
          (error, result) => {
            const dataUser = result[0];
            const name = dataUser.nombre;
            const lastName = dataUser.apellido;

            console.log({ nombre: name, apellido: lastName });
            if (error) {
              return res.status(500).json({ message: "error", error: error });
            }

            if (result.length > 0) {
              const token = jwt.sign(
                {
                  credentials: {
                    email: email,
                    nombre: name,
                    apellido: lastName,
                  },
                },
                "Stack",
                { expiresIn: "3m" }
              );
              return res.status(201).json({
                message: "correctCredentials",
                body: token,
              });
            } else {
              return res.status(400).json({ message: "incorrectCredentials" });
            }
          }
        );
      } else {
        return res.status(400).json({ message: "userNotExists" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", error: error });
  }
};

module.exports = { login };
