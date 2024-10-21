import axios from "axios";
import { checkToken } from "../utils/checkIfAuthenticated";

export const app = axios.create({
  baseURL: "https://api.hakiki.co",
});

export const getUsers = async () => {
  return await app.get("/users", {
    headers: {
      Authorization: checkToken(),
    },
  });
};

export const login = async (data) => {
  return await app.post("/users/login", data);
};
export const addUser = async (data) => {
  return await app.post("/users/", data, {
    headers: {
      Authorization: checkToken(),
    },
  });
};
export const deleteUser = async (id) => {
  return await app.delete(`/users/${id}`, {
    headers: {
      Authorization: checkToken(),
    },
  });
};
