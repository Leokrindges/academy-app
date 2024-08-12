interface AcademyAPIPagination {
  limit: number;
  page: number;
  count: number;
  totalPages: number;
}

export interface ResponseAPI<Type> {
  ok: boolean;
  message: string;
  data?: Type;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  pagination?: AcademyAPIPagination;
}
