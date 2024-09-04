import { app } from "./authController";

export const getProductScans = async () => {
  return await app.get("/productScans");
};
