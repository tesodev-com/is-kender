import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

class HttpClient {
   private static instance: HttpClient;
   private axiosInstance: AxiosInstance;
   private authToken: string | undefined;

   private constructor() {
      this.axiosInstance = axios.create({});
      this.setupInterceptors();
   }

   public static getInstance() {
      if (!HttpClient.instance) {
         HttpClient.instance = new HttpClient();
      }
      return HttpClient.instance;
   }

   public setBaseUrl(baseUrl: string): void {
      this.axiosInstance.defaults.baseURL = baseUrl;
   }

   public addAuthToken(token: string): void {
      this.authToken = token;
      this.setupInterceptors();
   }

   public deleteAuth() {
      this.authToken = undefined;
   }

   public isAuthenticated() {
      return this.authToken !== undefined;
   }

   private setupInterceptors(): void {
      this.axiosInstance.interceptors.request.use(
         (config: any) => {
            const token = this.authToken;
            if (token) {
               config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
         },
         (error: any) => {
            return Promise.reject(error);
         }
      );
   }

   public async get<T>(url: string, config?: AxiosRequestConfig) {
      return this.axiosInstance.get<T>(url, config);
   }

   public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
      return this.axiosInstance.post<T>(url, data, config);
   }

   public async delete<T>(url: string, config?: AxiosRequestConfig) {
      return this.axiosInstance.delete<T>(url, config);
   }

   public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
      return this.axiosInstance.put<T>(url, data, config);
   }
}

export default HttpClient.getInstance();
