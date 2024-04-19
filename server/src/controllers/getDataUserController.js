const connection = require("../models/db");

const getDataUser = (req, res) => {
  const data = req.body;
  const sqlGetData = "SELECT * FROM usuarios WHERE email = ?";

  try {
    connection.query(sqlGetData, data.email, (error, result) => {
      if (error) {
        return res.status(500).json({ message: "error", error: error });
      }

      if (result.length > 0) {
        return res.status(200).json({
          message: "dataObtained",
          body: result[0],
        });
      } else {
        return res.status(500).json({
          message: "invalidEmail",
        });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error interno del servidor", error: error });
  }
};

module.exports = { getDataUser };
