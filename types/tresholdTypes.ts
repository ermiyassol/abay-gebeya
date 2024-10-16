export type TresholdUser = {
  id: string;
  userHierarchyName: string;
  email: string;
  min: number;
  max: number;
  dailyMin: number;
  dailyMax: number;
  isActive: boolean;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
};
export type TresholdRole = {
  id: string;
  userHierarchyName: string;
  email: string;
  min: number;
  max: number;
  dailyMin: number;
  dailyMax: number;
  isActive: boolean;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
};

export type Treshold = {
  role: TresholdRole[];
  user: TresholdUser[];
};
