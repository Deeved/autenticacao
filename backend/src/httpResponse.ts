export interface HTTPResponse<T> {
  error?: {
    message: string;
    erro: any;
  };
  data?: T[];
}
