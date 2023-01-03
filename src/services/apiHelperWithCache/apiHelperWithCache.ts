export interface ResponseType<T = any> {
  isSuccess: boolean;
  data: T;
  headers?: Record<string, string>;
  statusCode?: number;
}
