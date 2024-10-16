import { AxiosResponse } from "axios";

export interface ApiResponse extends AxiosResponse<any, any> {
  data: any;
}
