import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { Settings } from "@/common";
import { AuthService } from "@/services";
import { DialogUtil } from "./dialogUtil";

class HttpUtil {
  private readonly _axiosInstance: AxiosInstance;

  constructor() {
    this._axiosInstance = axios.create({
      baseURL: Settings.VITE_API_BASE_ADDRESS,
    });

    this._axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        DialogUtil.showProgressBar();
        const token = await this.getToken();

        if (token !== "") config.headers.setAuthorization(`Bearer ${token}`);

        return config;
      }
    );

    this._axiosInstance.interceptors.response.use(
      (value) => {
        DialogUtil.dismissProgressBar();

        return value;
      },
      (error) => {
        DialogUtil.dismissProgressBar();

        throw error;
      }
    );
  }

  public async get(url: string, queries?: any): Promise<any> {
    const { data } = await this._axiosInstance.get(url, {
      params: queries,
    });

    return data;
  }

  public async post(url: string, body: any): Promise<any> {
    const { data } = await this._axiosInstance.post(url, body);

    return data;
  }

  public async patch(url: string, body: any): Promise<any> {
    const { data } = await this._axiosInstance.patch(url, body);

    return data;
  }

  private async getToken(): Promise<string> {
    const user = await AuthService.getUser();
    if (user && user.access_token) return user.access_token;

    return "";
  }
}

const httpUtil = new HttpUtil();

export { httpUtil as HttpUtil };
