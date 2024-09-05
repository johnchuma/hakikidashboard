import axios from "axios";
import { checkToken } from "../utils/checkIfAuthenticated";

export const app = axios.create({
  baseURL: "https://api.hakiki.co",
  headers: {
    Authorization: checkToken(),
  },
});

export const getUsers = async () => {
  return await app.get("/users");
};

export const login = async (data) => {
  return await app.post("/users/login", data);
};
