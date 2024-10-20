import { checkToken } from "../utils/checkIfAuthenticated";
import { app } from "./authController";

export const getProducts = async () => {
  return await app.get("/products", {
    headers: {
      Authorization: checkToken(),
    },
  });
};

export const addProduct = async (data) => {
  return await app.post("/products", data, {
    headers: {
      Authorization: checkToken(),
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteProduct = async (id) => {
  return await app.delete(`/products/${id}`, {
    headers: {
      Authorization: checkToken(),
    },
  });
};
