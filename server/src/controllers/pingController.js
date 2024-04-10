const connection = require("../models/db");

const ping = (req, res) => {
  const consult = "SELECT * FROM usuarios";

  try {
    connection.query(consult, (error, results) => {
      console.log(results);
      res.json(results);
    });
  } catch (e) {}
};

module.exports = { ping };
