export interface QueryReponse<T> {
  success: boolean;
  data?: T[] | T;
  message?: string;
}
