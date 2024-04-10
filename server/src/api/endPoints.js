const express = require("express");
const router = express.Router();
const { ping } = require("../controllers/pingController");
const { register } = require("../controllers/registerController");
const { login } = require("../controllers/loginController");

router.get("/", (req, res) => {
  res.send("¡Hola desde la ruta raíz!");
});

router.post("/register", register);
router.post("/login", login);

router.get("/ping", ping);

module.exports = router;
