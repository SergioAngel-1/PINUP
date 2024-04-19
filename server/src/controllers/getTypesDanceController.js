const connection = require("../models/db");

const getTypesDance = (req, res) => {
  const sqlGetData = `SELECT * FROM tipo_baile`;

  try {
    connection.query(sqlGetData, (error, result) => {
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

module.exports = { getTypesDance };
