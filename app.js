const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const mongoose = require("mongoose");

require("dotenv").config();
// const dotenv = require("dotenv");
// dotenv.config();

const { contactsRouter } = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// мидлвары
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // мидлвар котор парсит json`a

app.use("/api/contacts", contactsRouter);

// порядок подключаемого промежуточного ПО имеет значение. В конце приложения идет обработка ошибок. Вначале происходит обработка несуществующего роута или ошибка 404
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// const DB_HOST = "mongodb+srv://iryna:KrWV5bhaYxvzEm3d@cluster0.s32jl.mongodb.net/db-contacts?retryWrites=true&w=majority";
// mongoose.connect(DB_HOST) .then(()=> {
//     console.log("Database connection successful")
// })
// .catch(error => {
//     console.log(error.message);
//     process.exit(1);
// })

module.exports = app;
