import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/", (req, res) => {}); // TODO get all users
orderRouter.post("/", (req, res) => {}); // TODO create a new user
orderRouter.put("/", (req, res) => {}); // TODO update a user
orderRouter.delete("/", (req, res) => {}); // TODO delete a user
orderRouter.get("/user/:userId", (req, res) => {}); // TODO get orders by userId

export default orderRouter;
