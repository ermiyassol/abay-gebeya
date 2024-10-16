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
import { orderEndpoint } from "@/utils/backendEndpoints/route";

interface PostType {
  quantity: number;
  productId: number;
}

export async function getAllOrders(): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${orderEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function getOrder(
  id: number
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${orderEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function createOrder(
  data: PostType
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${orderEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return postData(url, token, data);
}

export async function confirmOrder(id: number): Promise<
  any | AxiosErrorResponse
> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${orderEndpoint}/${id}/confirm`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return patchData(url, token, {});
}

export async function completeOrder(id: number): Promise<
  any | AxiosErrorResponse
> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${orderEndpoint}/${id}/complete`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return patchData(url, token, {});
}

export async function cancelOrder(id: number): Promise<
  any | AxiosErrorResponse
> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${orderEndpoint}/${id}/cancel`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return patchData(url, token, {});
}

export async function deleteOrder(
  id: number
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${orderEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return deleteData(url, token);
}
