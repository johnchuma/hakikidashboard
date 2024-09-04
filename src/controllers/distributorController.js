import { app } from "./authController";

export const getDistributers = async () => {
  return await app.get("/distributers");
};
