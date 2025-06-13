export interface InquiryTableData {
  created_at: String;
  date_of_birth: String;
  full_name: String;
  gender: String;
  id: Number;
  phone_number: Number;
  reference: String;
}

export interface InquiryTableResponse {
  data: InquiryTableData[];
  pagination: InquiryTablePagination;
  success: Boolean;
}

export interface InquiryTablePagination {
  limit: Number;
  page: Number;
  total: Number;
  totalPages: Number;
}
