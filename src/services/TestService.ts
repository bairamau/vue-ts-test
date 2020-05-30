import axios from "axios";
import * as Bluebird from "bluebird";

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

const getImage = async (): Promise<HTMLImageElement> => {
  const data = (await apiClient.get("/test.png", { responseType: "blob" }))
    .data;
  const file = new File([data], "bg");
  const image = new Image();

  return new Bluebird.Promise(resolve => {
    const loadHandler = () => {
      image.removeEventListener("load", loadHandler);
      resolve(image);
    };

    image.addEventListener("load", loadHandler);
    image.src = URL.createObjectURL(file);
  });
};

export default {
  getFruits,
  getImage
};
