import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import axios from "axios";

/**
 *
 * @param {Error} error - The Axios error object.
 * @returns {Object} - The formatted error response with status and message.
 */
export const handleAxiosError = (error: any): AxiosErrorResponse => {
  let status = "500";
  let message = "An unknown error occurred";

  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with a status other than 2xx
      status = `${error.response.status}`;
      message = error.response.data || error.message;
    } else if (error.request) {
      // Request Timeout
      status = "408";
      message = "No response received from the server";
    } else {
      // Something happened in setting up the request that triggered an error
      message = error.message;
    }
  } else {
    // Non-Axios error
    message = error.message || message;
  }

  return {
    status,
    message,
  };
};
