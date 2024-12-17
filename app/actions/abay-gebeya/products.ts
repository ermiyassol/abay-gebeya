"use server";
import { auth } from "@/auth";

import {
  deleteData,
  fetchData,
  patchData,
  patchFormData,
  postData,
  postFormData,
  putData,
} from "../baseAction";
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import { productEndpoint } from "@/utils/backendEndpoints/route";
import { GetQueryParams } from "@/types/next-auth";
import { objectToString } from "@/utils/paramTransformer";

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

export async function getAllProducts(
  queryData?: GetQueryParams
): Promise<any | AxiosErrorResponse> {
  const params = queryData ? objectToString(queryData) : "";
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${productEndpoint}?${params}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function getProduct(
  id: string
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${productEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function createProduct(
  data: FormData
): Promise<any | AxiosErrorResponse> {
  console.log("data - ", data);
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${productEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return postFormData(url, token, data);
}

export async function updateProduct(
  id: string,
  data: PutType
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${productEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return putData(url, token, data);
}

export async function updateProductImage(
  id: string,
  data: FormData
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${productEndpoint}/${id}/image`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return patchFormData(url, token, data);
}

export async function updateProductFeatured(
  id: string,
  value: boolean
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${productEndpoint}/${id}/featured?featured=${value}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return patchData(url, token, {});
}

export async function deleteProduct(
  id: string
): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${productEndpoint}/${id}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return deleteData(url, token);
}
