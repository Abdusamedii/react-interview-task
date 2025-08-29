import client from "./client";

export const getItems = async (id) => {
  const res = await client.get("/ItemJobSite?jobSiteCategoryId=" + id);
  return res.data;
};
