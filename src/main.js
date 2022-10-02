import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandller.js";
import mysql from "mysql";
import userRouter from "./controllers/user.controller.js";

const app = express(); // create express app

dotenv.config();

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  database: process.env.DB_DB,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
  conn.query("CREATE DATABASE IF NOT EXISTS store", (err, result) => {
    if (err) throw err;
    console.log("Database created");
  });
  conn.query(
    "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))",
    (err, result) => {
      if (err) throw err;
      console.log("table users is cresated");
    }
  );
});

export default conn;

dotenv.config(); // load environment variables

app.use(express.json()); // to parse json data

app.use(morgan("dev")); // to log requests

app.use(errorHandler); // to handle errors

app.use("/user", userRouter);

const PORT = process.env.PORT || 3000; // set port

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // listen for requests
