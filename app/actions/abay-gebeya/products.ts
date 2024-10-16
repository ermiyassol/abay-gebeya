"use server";
import { auth } from "@/auth";

import { deleteData, fetchData, patchData, postData, putData } from "../baseAction";
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import { productEndpoint } from "@/utils/backendEndpoints/route";

interface PostType {
  name: string;
  image: string;
  fee: number;
  basePrice: number;
}

interface PutType {
  name?: string;
  fee?: number;
  basePrice?: number;
  description?: number;
}

export async function getAllProducts(): Promise<
  any | AxiosErrorResponse
> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${productEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function getProduct(id: string): Promise<
  any | AxiosErrorResponse
> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${productEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function createProduct(data: FormData): Promise<
  any | AxiosErrorResponse
> {
  console.log("data - ", data);
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${productEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return postData(url, token, data);
}

export async function updateProduct(id: string, data: PutType): Promise<
  any | AxiosErrorResponse
> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${productEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return putData(url, token, data);
}

export async function updateProductImage(id: string, data: PutType): Promise<
  any | AxiosErrorResponse
> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${productEndpoint}/${id}/image`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return patchData(url, token, data);
}

export async function deleteProduct(id: string): Promise<
  any | AxiosErrorResponse
> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${productEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return deleteData(url, token);
}
