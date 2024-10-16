"use server";
import { auth } from "@/auth";

import { postData } from "../baseAction";
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import { authenticateEndPoint, registerUserEndPoint } from "@/utils/backendEndpoints/route";
import { RolesType } from "@/types/enums/roleEnums";

interface AuthPostType {
  email: string;
  password: string;
}

interface CreateUserPostType {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmationPassword: string;
  role: RolesType;
}

export async function authenticateUser(data: AuthPostType): Promise<
  any | AxiosErrorResponse
> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${authenticateEndPoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return postData(url, token, data);
}

export async function registerUser(data: CreateUserPostType): Promise<
  any | AxiosErrorResponse
> {
  let url = `${process.env.NEXT_ABAY_GEBEYA_BE}${registerUserEndPoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return postData(url, token, data);
}
