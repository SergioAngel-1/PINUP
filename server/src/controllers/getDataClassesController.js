const connection = require("../models/db");

const getDataClasses = (req, res) => {
  const data = req.body;
  const userId = data.userId;

  const sqlGetData = `SELECT 
                            u.id AS id_usuario,
                            c.id AS id_clase,
                            CONCAT(u.nombre, ' ', u.apellido) as nombre,
                            (SELECT 
                                    CONCAT(nombre, ' ', apellido)
                                FROM
                                    usuarios u
                                        INNER JOIN
                                    clases c ON c.id_profesor = u.id
                                WHERE
                                    c.id_alumno = ? LIMIT 1) AS 'profesor',
                            b.nombre_baile as baile,
                            DATE_FORMAT(c.fecha, '%Y-%m-%d') AS fecha, 
                            c.estado,
                            b.precio
                        FROM
                            usuarios u
                                INNER JOIN
                            clases c ON u.id = c.id_alumno
                                INNER JOIN
                            tipo_baile b ON b.id = c.cfg_tipo
                        WHERE
                          c.id_alumno = ?
                              AND c.estado IN ('Pago' , 'Sin pagar', 'Pendiente')`;

  try {
    connection.query(sqlGetData, [userId, userId], (error, result) => {
      if (error) {
        return res.status(500).json({ message: "error", error: error });
      }

      if (result.length > 0) {
        return res.status(200).json({
          message: "dataObtained",
          body: result,
        });
      } else {
        return res.status(500).json({
          message: "invalidUserId",
        });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error interno del servidor", error: error });
  }
};

module.exports = { getDataClasses };
