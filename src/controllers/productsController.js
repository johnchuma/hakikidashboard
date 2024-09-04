import { app } from "./authController";

export const getProducts = async () => {
  return await app.get("/products");
};
