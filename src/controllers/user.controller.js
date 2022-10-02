import { Router } from "express";
import responses from "../helpers/responses.js";
import conn from "../main.js";
import userSchema from "../schemas/user.schema.js";
import bcrypt from "bcrypt";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const sqlQuery = "SELECT * FROM users";
  let r;
  conn.query(sqlQuery, (err, result) => {
    if (err) responses.badRequest(res, "something is wrong");
    return responses.success(res, "all users", result);
  });
}); // TODO get all users

userRouter.post("/", (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) responses.badRequest(res, error.details[0].message);

  const { name, email, password } = value;
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const hashedPass = bcrypt.hashSync(password, parseInt(process.env.SALT));
  conn.query(sql, [name, email, hashedPass], (err, result) => {
    if (err) responses.badRequest(res, err);
    console.log("insert a user");
  });
  responses.success(res, "user created successfully", value);
}); // TODO create a new user

userRouter.put("/", (req, res) => {}); // TODO update a user
userRouter.delete("/", (req, res) => {}); // TODO delete a user
userRouter.post("/login", (req, res) => {}); // TODO login user

export default userRouter;
