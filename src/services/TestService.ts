import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://fantogramma.org"
});

export type TFruits = {
  [key: string]: {
    fruit: string;
  };
};

const getFruits = async (): Promise<TFruits> => {
  return (await apiClient.get("/test.json")).data;
};

const getImage = async (): Promise<File> => {
  return (await apiClient.get("/test.png")).data;
};

export default {
  getFruits,
  getImage
};
