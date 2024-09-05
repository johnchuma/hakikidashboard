import { checkToken } from "../utils/checkIfAuthenticated";
import { app } from "./authController";

export const getDistributers = async () => {
  return await app.get("/distributers", {
    headers: {
      Authorization: checkToken(),
    },
  });
};
