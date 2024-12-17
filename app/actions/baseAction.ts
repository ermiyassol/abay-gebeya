"use server"; 
import axiosHelper from "@/utils/axiosHelper";
import { ApiResponse } from "@/types/apiResponse";  
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";

export async function postFormData(
  url: string,
  token: string,
  data: any
): Promise<any | AxiosErrorResponse> { 
  try { 
    let res: ApiResponse | AxiosErrorResponse = (await axiosHelper.authFormDataPost(
      url,
      data,
      token
    )) as ApiResponse | AxiosErrorResponse;
    if ("data" in res && res.data) {
      return res.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    // console.error(`Error in ${url}`, error);
    return { error: "An error occurred during the request." };
  }
}

export async function patchFormData(
  url: string,
  token: string,
  data: any
): Promise<any | AxiosErrorResponse> { 
  try { 
    let res: ApiResponse | AxiosErrorResponse = (await axiosHelper.authFormDataPatch(
      url,
      data,
      token
    )) as ApiResponse | AxiosErrorResponse;
    if ("data" in res && res.data) {
      return res.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    // console.error(`Error in ${url}`, error);
    return { error: "An error occurred during the request." };
  }
}

export async function fetchData(
  url: string,
  token: string
): Promise<any | AxiosErrorResponse> {
  try { 
 
    const res = await axiosHelper.getAuth(url,token) 
    if ("data" in res && res.data) {
      return res.data;
    } else {
      console.log("RESPONSE - ", res);
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    // console.error(`Error in ${url}`, error);
    return { error: "An error occurred during the request." };
  }
}

export async function putData(
  url: string,
  token: string,
  data: any
): Promise<any | AxiosErrorResponse> { 
  try {
    let res: ApiResponse | AxiosErrorResponse = (await axiosHelper.authPut(
      url,
      data,
      token
    )) as ApiResponse | AxiosErrorResponse;
    if ("data" in res && res.data) {
      return res.data;
    } else {
      
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    // console.error(`Error in ${url}`, error);
    return { error: "An error occurred during the request." };
  }
}

export async function postData(
  url: string,
  token: string,
  data: any
): Promise<any | AxiosErrorResponse> { 
  try { 
    let res: ApiResponse | AxiosErrorResponse = (await axiosHelper.authPost(
      url,
      data,
      token
    )) as ApiResponse | AxiosErrorResponse;
    if ("data" in res && res.data) {
      return res.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    // console.error(`Error in ${url}`, error);
    return { error: "An error occurred during the request." };
  }
}

export async function patchData(
  url: string,
  token: string,
  data?: any
): Promise<any | AxiosErrorResponse> { 
  try { 
    let res: ApiResponse | AxiosErrorResponse = (await axiosHelper.authPatch(
      url,
      data,
      token
    )) as ApiResponse | AxiosErrorResponse;
    if ("data" in res && res.data) {
      return res.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    // console.error(`Error in ${url}`, error);
    return { error: "An error occurred during the request." };
  }
}

export async function deleteData(
  url: string,
  token: string,
): Promise<any | AxiosErrorResponse> { 
  try { 
    let res: ApiResponse | AxiosErrorResponse = (await axiosHelper.authDelete(
      url,
      token
    )) as ApiResponse | AxiosErrorResponse;
    if ("data" in res && res.data) {
      return res.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    // console.error(`Error in ${url}`, error);
    return { error: "An error occurred during the request." };
  }
}