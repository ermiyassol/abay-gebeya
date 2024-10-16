import axios from "axios";
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import { ApiResponse } from "@/types/apiResponse";
import { handleAxiosError } from "./handleRequestError";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CTAPP_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosHelper = {
  get: async (url: string) => {
    try {
      const response = await axiosInstance.get(url);
      return response;
    } catch (error) {
      console.log("ERROR - ", error);
      return handleAxiosError(error);
    }
  },
  getAuth: async (
    url: string,
    token: string
  ): Promise<ApiResponse | AxiosErrorResponse> => {
    try {
      const response: ApiResponse = await axiosInstance.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response;
    } catch (error) {
      console.log("ERROR - ", error);
      return handleAxiosError(error);
    }
  },
  authPost: async (
    url: string,
    data: any,
    token: string
  ): Promise<ApiResponse | AxiosErrorResponse> => {
    try {
      const response: ApiResponse = await axiosInstance.post(url, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response;
    } catch (error) {
      console.log("ERROR - ", error);
      return handleAxiosError(error);
    }
  },
  authPut: async (
    url: string,
    data: any,
    token: string
  ): Promise<ApiResponse | AxiosErrorResponse> => {
    try {
      const response = await axiosInstance.put(url, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response;
    } catch (error) {
      console.log("ERROR - ", error);
      return handleAxiosError(error);
    }
  },
  authPatch: async (
    url: string,
    data: any,
    token: string
  ): Promise<ApiResponse | AxiosErrorResponse> => {
    try {
      const response = await axiosInstance.patch(url, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response;
    } catch (error) {
      console.log("ERROR - ", error);
      return handleAxiosError(error);
    }
  },
  authDelete: async (
    url: string,
    token: string
  ): Promise<ApiResponse | AxiosErrorResponse> => {
    try {
      const response = await axiosInstance.delete(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response;
    } catch (error) {
      console.log("ERROR - ", error);
      return handleAxiosError(error);
    }
  },
  post: async (
    url: string,
    data: any
  ): Promise<ApiResponse | AxiosErrorResponse> => {
    try {
      const response: ApiResponse = await axiosInstance.post(url, data);
      return response;
    } catch (error) {
      console.log("ERROR - ", error);
      return handleAxiosError(error);
    }
  },
  put: async (url: string, data: any) => {
    try {
      const response = await axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      console.log("ERROR - ", error);
      return handleAxiosError(error);
    }
  },
  patch: async (url: string, data: any) => {
    // Assuming 'update' is for patching data
    try {
      const response = await axiosInstance.patch(url, data);
      return response.data;
    } catch (error) {
      console.log("ERROR - ", error);
      return handleAxiosError(error);
    }
  },
  delete: async (url: string) => {
    try {
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      console.log("ERROR - ", error);
      return handleAxiosError(error);
    }
  },
};

export default axiosHelper;
