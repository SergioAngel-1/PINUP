const { FRONTEND_URL, PORT } = require("./config");
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./api/endPoints");

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
    credentials: true,
  })
);

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
