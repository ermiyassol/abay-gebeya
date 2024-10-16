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
import { inventoryEndpoint } from "@/utils/backendEndpoints/route";

interface PostType {
  quantity: number;
  price: number;
  vendorName: string;
  vendorPhoneNumber: string;
  productId: number;
}

interface PutType {
  quantity?: number;
  price?: number;
  vendorName?: string;
  vendorPhoneNumber?: string;
  productId?: number;
}

export async function getAllInventories(): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${inventoryEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function getInventory(
  id: string
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${inventoryEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function createInventory(
  data: PostType
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${inventoryEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return postData(url, token, data);
}

export async function updateInventory(
  id: number,
  data: PutType
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${inventoryEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return putData(url, token, data);
}

export async function deleteInventory(
  id: number
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${inventoryEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return deleteData(url, token);
}
