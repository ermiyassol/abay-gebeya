"use server";
import { auth } from "@/auth";

import {
  patchData,
} from "../baseAction";
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import { blockUserEndpoint, changePasswordEndpoint, downgradeUserEndpoint, getUserOrdersEndpoint, unblockUserEndpoint, upgradeUserEndpoint, userEndpoint } from "@/utils/backendEndpoints/route";

export async function upgradeUsers(id: number
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${upgradeUserEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return patchData(url, token);
}

export async function downgradeUsers(id: number
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${downgradeUserEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return patchData(url, token);
}

export async function blockUsers(id: number
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${blockUserEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return patchData(url, token);
}

export async function unblockUsers(id: number
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${unblockUserEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return patchData(url, token);
}

