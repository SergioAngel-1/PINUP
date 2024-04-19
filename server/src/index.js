const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const routes = require("./api/endPoints");

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
    credentials: true,
  })
);

app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
