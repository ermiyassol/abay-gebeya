"use server"; 
import { auth } from "@/auth";
 
import { fetchData } from "../baseAction";
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import { getMappedOutletDetailEndpoint, getMappedOutletsEndpoint } from "@/utils/backendEndpoints/route";
import { objectToString } from "@/utils/paramTransformer";

interface GetParams {
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

export async function getMappedOutletsList(params: GetParams): Promise<any | AxiosErrorResponse> {
  const queryParams = objectToString(params);
  let url = `${process.env.NEXT_CTAPP_BE}${getMappedOutletsEndpoint}?${queryParams}`;
  console.log("url - ", url);
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function getMappedOutletDetail(identifier: string): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_CTAPP_BE}${getMappedOutletDetailEndpoint}?identifier=${identifier}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}
