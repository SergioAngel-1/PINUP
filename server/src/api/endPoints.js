const express = require("express");
const router = express.Router();
const { ping } = require("../controllers/pingController");
const { register } = require("../controllers/registerController");
const { login } = require("../controllers/loginController");
const { updateData } = require("../controllers/updateDataController");
const { getDataUser } = require("../controllers/getDataUserController");
const { getDataClasses } = require("../controllers/getDataClassesController");
const { saveNewClass } = require("../controllers/saveNewClassController");
const { getTypesDance } = require("../controllers/getTypesDanceController");
const { removeClass } = require("../controllers/removeClassController");
const {
  payClassWhatsApp,
} = require("../controllers/payClassWhatsAppController");
const {
  getRolUsersClasses,
} = require("../controllers/getRolUsersClassesController");

router.get("/", (req, res) => {
  res.send("¡Hola desde la ruta raíz!");
});

router.post("/register", register);
router.post("/login", login);
router.post("/updateData", updateData);
router.post("/getDataUser", getDataUser);
router.post("/getDataClasses", getDataClasses);
router.post("/saveNewClass", saveNewClass);
router.post("/removeClass", removeClass);
router.post("/payClassWhatsApp", payClassWhatsApp);

router.get("/getRolUsersClasses", getRolUsersClasses);
router.get("/getTypesDance", getTypesDance);
router.get("/ping", ping);

module.exports = router;
