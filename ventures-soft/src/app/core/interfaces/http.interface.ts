export interface HttpResponse<T> {
  error: boolean;
  codigo: string;
  message: string;
  menuItems: T;
}
