require("dotenv").config();

module.exports = {
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  PORT: process.env.PORT || 3000,
  /* Database */
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_DATABASE: process.env.DB_DATABASE || "pinup",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
};
