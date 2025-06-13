export interface InquiryTableData {
  created_at: string;
  date_of_birth: string;
  full_name: string;
  gender: string;
  id: number;
  phone_number: number;
  reference: string;
}

export interface InquiryTableResponse {
  data: InquiryTableData[];
  pagination: InquiryTablePagination;
  success: Boolean;
}

export interface InquiryTablePagination {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}
