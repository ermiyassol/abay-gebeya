"use server"; 
import { auth } from "@/auth";
 
import { fetchData, postData, putData } from "../baseAction";
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import { createCategoryEndpoint, getCategoriesEndpoint, updateCategoryEndpoint } from "@/utils/backendEndpoints/route";

interface PostType {
  name: string,
}

interface PutType {
  id: number,
  name?: string,
  isActive?: boolean
}

export async function getCategoriesList(): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_CTAPP_BE}${getCategoriesEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function createCategory(data: PostType): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_CTAPP_BE}${createCategoryEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return postData(url, token, data);
}

export async function updateCategory(data: PutType): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_CTAPP_BE}${updateCategoryEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return putData(url, token, data);
}
