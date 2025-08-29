import client from "./client";

export const getJobSites = async () => {
  const res = await client.get("/JobSite");
  return res.data;
};