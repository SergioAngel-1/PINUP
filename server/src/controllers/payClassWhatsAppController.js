const connection = require("../models/db");

const payClassWhatsApp = (req, res) => {
  const data = req.body;

  const sqlUpdateData = `UPDATE clases SET estado = 'Pendiente' WHERE (id = ?);`;

  connection.query(sqlUpdateData, [data.id_clase], (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Error", error: error });
    }

    return res.status(201).json({
      message: "updateClassSuccesfully",
      body: result,
    });
  });
};

module.exports = { payClassWhatsApp };
