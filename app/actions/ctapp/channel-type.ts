"use server"; 
import { auth } from "@/auth";
 
import { fetchData, postData, putData } from "../baseAction";
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import { createChannelTypeEndpoint, getChannelTypesEndpoint, updateChannelTypeEndpoint } from "@/utils/backendEndpoints/route";
import { OutletType } from "@/types/enums/outletTypeEnums";

interface PostType {
  name: string,
  outletType: OutletType
}

interface PutType {
  id: number,
  name?: string,
  outletType?: OutletType,
  isActive?: boolean
}

export async function getChannelTypesList(): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_CTAPP_BE}${getChannelTypesEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function createChannelType(data: PostType): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_CTAPP_BE}${createChannelTypeEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return postData(url, token, data);
}

export async function updateChannelType(data: PutType): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_CTAPP_BE}${updateChannelTypeEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return putData(url, token, data);
}
