type Category = {
  id: number;
  name: string;
};

export type JobSiteCategory = {
  id: number;
  jobSiteId: number;
  categoryId: number;
  category: Category;
  itemJobSiteCategories: any;
  jobSite: any;
};