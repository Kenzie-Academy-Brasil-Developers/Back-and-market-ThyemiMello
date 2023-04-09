import express, { Application } from "express";
import {
  createProduct,
  deleteProduct,
  listAllProducts,
  retriveProduct,
  updateProduct,
} from "./logic";
import { ensureExistProducts, ensureProductsMiddleware } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/products", ensureExistProducts, createProduct);
app.get("/products", listAllProducts);
app.get("/products/:id", ensureProductsMiddleware, retriveProduct);
app.patch("/products/:id", ensureProductsMiddleware, ensureExistProducts, updateProduct);
app.delete("/products/:id", ensureProductsMiddleware, deleteProduct);

app.listen(3000, () => {
  console.log("server is running");
});
