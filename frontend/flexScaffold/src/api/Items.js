import client from "./client";

export const getItems = async (id) => {
  const res = await client.get("/ItemJobSite?jobSiteCategoryId=" + id);
  return res.data;
};

export const getAllItems = async () => {
  const res = await client.get("/Item");
  return res.data;
}

export const createItemForJobSite = async (data) => {
  const res = await client.post("/ItemJobSite", data);
  return res.data;
}

export const updateItemForJobSite = async (data) => {
  const res = await client.put("/ItemJobSite", data);
  return res.data;
}