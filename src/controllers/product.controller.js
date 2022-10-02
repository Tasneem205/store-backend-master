import { Router } from "express";

const productRouter = Router();

productRouter.get("/", (req, res) => {}); // TODO get all product
productRouter.post("/", (req, res) => {}); // TODO create a new product
productRouter.put("/", (req, res) => {}); // TODO update a product
productRouter.delete("/", (req, res) => {}); // TODO delete a product

export default productRouter;
