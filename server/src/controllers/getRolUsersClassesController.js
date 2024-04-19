const connection = require("../models/db");

const getRolUsersClasses = (req, res) => {
  const sqlGetData = `SELECT id, nombre, apellido, email FROM usuarios WHERE rol = ?`;

  try {
    connection.query(sqlGetData, "profesor", (error, result) => {
      if (error) {
        return res.status(500).json({ message: "error", error: error });
      }

      return res.status(200).json({
        message: "dataObtained",
        body: result,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error interno del servidor", error: error });
  }
};

module.exports = { getRolUsersClasses };
