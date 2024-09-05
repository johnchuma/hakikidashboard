import { checkToken } from "../utils/checkIfAuthenticated";
import { app } from "./authController";

export const getOverviewStats = async () => {
  return await app.get("/analytics/overview", {
    headers: {
      Authorization: checkToken(),
    },
  });
};
