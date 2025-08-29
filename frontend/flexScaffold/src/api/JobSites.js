import client from "./client";

export const getJobSites = async () => {
  const res = await client.get("/JobSite");
  return res.data;
};

export const createJobSite = async (data) => {
  const res = await client.post("/JobSite", data);
  return res.data;
}

export const getJobSiteCategoriesById = async (id) => {
  const res = await client.get(`/JobSiteCategory/${id}`);
  return res.data;
}