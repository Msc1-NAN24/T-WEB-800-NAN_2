export type Result<T = any, Z = any> = {
  ok?: ApiResponse<T>;
  error?: ApiError<Z>;
};

export type ApiResponse<T> = Response<T>;

export type ApiError<T = any> = {
  body: {
    message: string;
    code: string;
  },
  status: number;
};

export type Response<T> = {
  body: T;
  status: number;
}

export type User = {
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  firstName: string;
  lastName: string;
  picture: string;
  phone: string;
  _id: string;
}

