"use server"; 
import { auth } from "@/auth";
 
import { fetchData, postData, putData } from "../baseAction";
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import {  getDashboardReportEndpoint } from "@/utils/backendEndpoints/route";
import { AnswerType } from "@/types/enums/answerTypeEnums";

export async function getDashboardReport(): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_CTAPP_BE}${getDashboardReportEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}
