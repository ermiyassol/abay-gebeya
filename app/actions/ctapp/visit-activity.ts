"use server"; 
import { auth } from "@/auth";
 
import { fetchData, postData, putData } from "../baseAction";
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import { getVisitActivitiesEndpoint } from "@/utils/backendEndpoints/route";
import { objectToString } from "@/utils/paramTransformer";

interface GetParams {
  visitId?: string;
  startDate?: string;
  endDate?: string;
  shopName?: string;
  shopIds?: string[];
  page?: string;
  size?: string;
  datesOnly?: boolean;
  ofDate?: string;
  msisdn?: string;
}

export async function getVisitActivitiesList(params?: GetParams): Promise<any | AxiosErrorResponse> {
  const queryParams = objectToString(params);
  let url = `${process.env.NEXT_CTAPP_BE}${getVisitActivitiesEndpoint}?${queryParams}`;
  console.log("URL - ", url);
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}