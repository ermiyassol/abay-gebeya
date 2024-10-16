import { AxiosResponse } from "axios";

export interface FloatReportFilter {
  createdBy: string;
  createdOn: Date|string;
  duration: string;
  endDate: Date|string;
  id: number;
  isActive: boolean;
  isExternal: boolean;
  location: string;
  startDate: Date|string;
  transferType: string;
  updatedBy: string;
  updatedOn: Date|string;
  userId: number;
  userType: string;
}
