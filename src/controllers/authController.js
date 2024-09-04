import axios from "axios";
import { checkToken } from "../utils/checkIfAuthenticated";

export const app = axios.create({
  baseURL: "http://104.194.157.251:5000",
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
