"use server"; 
import { auth } from "@/auth";
 
import { fetchData, postData, putData } from "../baseAction";
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import { downloadMappedOutletsEndpoint, downloadVisitActivitiesEndpoint, getDownloadHistoriesEndpoint } from "@/utils/backendEndpoints/route";
import { ReportType } from "@/types/enums/reportTypeEnum";
import { objectToString } from "@/utils/paramTransformer";

interface MODownloadParams {
  shopName?: string;
  shortCode?: string;
  msisdn?: string;
  clusterId?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  size?: string;
  isWeb?: boolean,
}

interface VADownloadParams {
  visitId?: string;
  startDate?: string;
  endDate?: string;
  shopName?: string;
  shopIds?: string;
  page?: string;
  size?: string;
}

interface DownloadHistoryParams {
  type: ReportType;
}

export async function downloadVisitActivities(params: VADownloadParams): Promise<any | AxiosErrorResponse> {
  const queryParams = objectToString(params);
  let url = `${process.env.NEXT_CTAPP_BE}${downloadVisitActivitiesEndpoint}?${queryParams}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function downloadMappedOutlets(params: MODownloadParams): Promise<any | AxiosErrorResponse> {
  const queryParams = objectToString(params);
  let url = `${process.env.NEXT_CTAPP_BE}${downloadMappedOutletsEndpoint}?${queryParams}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function getDownloadHistories(params: DownloadHistoryParams): Promise<any | AxiosErrorResponse> {
  const queryParams = objectToString(params);
  let url = `${process.env.NEXT_CTAPP_BE}${getDownloadHistoriesEndpoint}?${queryParams}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}
