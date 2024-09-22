export type RequestMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type BaseResponseType<T> = {
  data: T;
};

export type PaginatedResponseType<T> = BaseResponseType<T[]> & {
  meta: {
    page: number;
    totalPage: number;
    totalData: number;
  };
};
