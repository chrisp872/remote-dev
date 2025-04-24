export type JobItem = {
  id: number;
  title: string;
  company: string;
  daysAgo: string;
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
