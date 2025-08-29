type Item = {
  id: number;
  name: string;
  quantity: number;
};

export type JobSiteItem = {
  id: number;
  jobSiteCategoryId: number;
  itemId: number;
  description: string;
  note: string;
  quantity: number;
  item: Item;
  jobSiteCategory: any; 
};
