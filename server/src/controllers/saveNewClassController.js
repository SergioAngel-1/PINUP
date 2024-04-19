const connection = require("../models/db");

const saveNewClass = (req, res) => {
  const data = req.body;

  const sqlInsertData = `INSERT INTO clases
                          (id_profesor, id_alumno, cfg_tipo, fecha, estado)
                        VALUES (?, ?, ?, ?, ?);`;

  connection.query(
    sqlInsertData,
    [data.teacherId, data.userId, data.danceTypeId, data.date, "Sin pagar"],
    (error, result) => {
      if (error) {
        return res.status(500).json({ message: "insertError", error: error });
      }

      return res.status(201).json({
        message: "insertSuccesfully",
        body: result,
      });
    }
  );
};

module.exports = { saveNewClass };
