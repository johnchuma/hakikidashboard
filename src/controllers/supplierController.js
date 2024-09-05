import { checkToken } from "../utils/checkIfAuthenticated";
import { app } from "./authController";

export const getSuppliers = async () => {
  return await app.get("/suppliers", {
    headers: {
      Authorization: checkToken(),
    },
  });
};
