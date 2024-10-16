export interface FloatReportTable {
  id: number;
  transferFromOrgCode: string;
  transferToOrgCode: string;
  transferFromChannelId: string;
  transferToChannelId: string;
  locationIdFrom: string;
  grossAmount: string;
  commissionModalityApplied: string;
  netAmount: string;
  commissionValue: string;
  isActive: "true" | "false";
  createdBy: string;
  createdOn: string;
}
export interface FloatReportTableResult {
  content: FloatReportTable[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
