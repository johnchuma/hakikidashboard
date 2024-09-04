import { app } from "./authController";

export const getOverviewStats = async () => {
  return await app.get("/analytics/overview");
};
