const connection = require("../models/db");

const register = (req, res) => {
  const data = req.body;
  const name = data.name;
  const lastName = data.lastName;
  const email = data.email;
  const password = data.password;

  const sqlValidateEmail = "SELECT * FROM usuarios WHERE email = ?";
  const sqlCreateUser =
    "INSERT INTO usuarios (nombre, apellido, email, contrasena) VALUES (?, ?, ?, ?)";

  try {
    connection.query(sqlValidateEmail, [email], (error, result) => {
      if (error) {
        return res.status(500).json({ message: "error", error: error });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: "userExists" });
      }

      connection.query(
        sqlCreateUser,
        [name, lastName, email, password],
        (error, result) => {
          if (error) {
            return res.status(500).json({ message: "error", error: error });
          }
          res
            .status(201)
            .json({ message: "createSuccessfully", result: result });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", error: error });
  }
};

module.exports = { register };
