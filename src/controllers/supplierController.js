import { app } from "./authController";

export const getSuppliers = async () => {
  return await app.get("/suppliers");
};
