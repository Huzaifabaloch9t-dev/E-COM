import axios from "axios";
import { Product } from "../types/product";

const API = "http://localhost:5000/api/products";

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get(API);
  return res.data;
};
