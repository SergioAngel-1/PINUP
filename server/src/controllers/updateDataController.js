const connection = require("../models/db");

const updateData = (req, res) => {
  const data = req.body;
  const {
    name,
    lastName,
    email,
    tel,
    city,
    birthdate,
    password,
    confirmPassword,
  } = data;

  let sqlUpdateData = "UPDATE usuarios SET ";
  const updateValues = [];
  let updatedPassword = false;

  if (name && lastName && email) {
    sqlUpdateData += "nombre = ?, apellido = ?, email = ?";
    updateValues.push(name, lastName, email);
  }

  if (tel) {
    sqlUpdateData += (updateValues.length ? ", " : "") + "telefono = ?";
    updateValues.push(tel);
  }

  if (city) {
    sqlUpdateData += (updateValues.length ? ", " : "") + "ciudad = ?";
    updateValues.push(city);
  }

  if (birthdate) {
    sqlUpdateData += (updateValues.length ? ", " : "") + "fecha_nacimiento = ?";
    updateValues.push(birthdate);
  }

  if (password && confirmPassword && password === confirmPassword) {
    sqlUpdateData += (updateValues.length ? ", " : "") + "contrasena = ?";
    updateValues.push(password);
    updatedPassword = true;
  }

  sqlUpdateData += " WHERE email = ?";
  updateValues.push(email);

  try {
    connection.query(sqlUpdateData, updateValues, (error, result) => {
      if (error) {
        return res.status(500).json({ message: "error", error: error });
      }

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "updateNotSuccessfully" });
      }

      return res.status(200).json({
        message: "updateSuccessfully",
        updatedPassword: updatedPassword,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error interno del servidor", error: error });
  }
};

module.exports = { updateData };
