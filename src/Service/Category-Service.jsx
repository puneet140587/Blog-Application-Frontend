import { myAxios } from "./Helper";

export const fetchAllCategories = () => {
  return myAxios.get("/categories/").then((response) => response.data);
};
