export type SortBy = "relevant" | "recent";

export type PageDirection = "next" | "prev";

export type JobItem = {
  id: number;
  title: string;
  company: string;
  daysAgo: number;
  badgeLetters: string;
  relevanceScore: number;
};

export type JobItemDetails = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  location: string;
  salary: string;
  coverImgURL: string;
  companyURL: string;
};
