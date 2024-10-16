"use server";
import { auth } from "@/auth";

import {
  deleteData,
  fetchData,
  patchData,
  postData,
  putData,
} from "../baseAction";
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import { changePasswordEndpoint, getUserOrdersEndpoint, userEndpoint } from "@/utils/backendEndpoints/route";

interface PatchType {
  currentPassword: string;
  newPassword: string;
  confirmationPassword: string;
}

export async function changePassword(
  data: PatchType
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${changePasswordEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return patchData(url, token, data);
}

export async function getUsersOrder(
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${getUserOrdersEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function getUsers(
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${userEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function getUserOrders(id: string
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${getUserOrdersEndpoint}/${id}/orders`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}
