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

export interface RowActionMenuProps {
  id: number;
  refresh: () => void;
}

export interface ViewInquiryDialogProps {
  id: number;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}

export interface DeleteInquiryDialogProps {
  id: number;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  refresh: () => void;
}

export interface UpdateInquiryDialogProps {
  id: number;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}

export interface SingleInquiryResponse {
  success: boolean;
  data: SinqleInquiryData;
}

export interface SinqleInquiryData {
  career_transition_reason: string;
  cgpa: number;
  course_duration: string;
  course_selection: string;
  created_at: string;
  current_address: string;
  date_of_birth: string;
  email: string;
  expected_package: string;
  full_name: string;
  future_goal: string;
  gender: string;
  id: number;
  job_assistance: string;
  job_guarentee: string;
  job_location: string;
  passing_year: number;
  permanent_address: string;
  phone_number: number;
  recent_education: string;
  reference: string;
  user_availability: string;
}
