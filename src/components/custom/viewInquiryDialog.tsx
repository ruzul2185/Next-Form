"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import type {
  ViewInquiryDialogProps,
  SingleInquiryResponse,
  SinqleInquiryData,
} from "@/app/(protected)/inquiry/type";
import { useEffect, useState } from "react";

const ViewInquiryDialog = ({
  id,
  openDialog,
  setOpenDialog,
}: ViewInquiryDialogProps) => {
  const [inquiry, setInquiry] = useState<SinqleInquiryData | null>(null);
  const [loading, setLoading] = useState(false);

  const getSingleInquiry = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/inquiry/${id}`);
      const parsedResult: SingleInquiryResponse = await response.json();
      setInquiry(parsedResult.data);
    } catch (error) {
      console.error("Failed to fetch inquiry", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (openDialog) {
      getSingleInquiry();
    }
  }, [openDialog]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Inquiry Details</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
          <Detail
            label="Full Name"
            value={inquiry?.full_name}
            loading={loading}
          />
          <Detail label="Email" value={inquiry?.email} loading={loading} />
          <Detail
            label="Phone Number"
            value={inquiry?.phone_number}
            loading={loading}
          />
          <Detail
            label="Date of Birth"
            value={inquiry?.date_of_birth}
            loading={loading}
          />
          <Detail label="Gender" value={inquiry?.gender} loading={loading} />
          <Detail
            label="Current Address"
            value={inquiry?.current_address}
            loading={loading}
          />
          <Detail
            label="Permanent Address"
            value={inquiry?.permanent_address}
            loading={loading}
          />
          <Detail
            label="Recent Education"
            value={inquiry?.recent_education}
            loading={loading}
          />
          <Detail label="CGPA" value={inquiry?.cgpa} loading={loading} />
          <Detail
            label="Passing Year"
            value={inquiry?.passing_year}
            loading={loading}
          />
          <Detail
            label="Course Selected"
            value={inquiry?.course_selection}
            loading={loading}
          />
          <Detail
            label="Course Duration"
            value={inquiry?.course_duration}
            loading={loading}
          />
          <Detail
            label="Expected Package"
            value={inquiry?.expected_package}
            loading={loading}
          />
          <Detail
            label="Job Assistance"
            value={inquiry?.job_assistance}
            loading={loading}
          />
          <Detail
            label="Job Guarantee"
            value={inquiry?.job_guarentee}
            loading={loading}
          />
          <Detail
            label="Preferred Job Location"
            value={inquiry?.job_location}
            loading={loading}
          />
          <Detail
            label="Career Transition Reason"
            value={inquiry?.career_transition_reason}
            loading={loading}
          />
          <Detail
            label="Future Goal"
            value={inquiry?.future_goal}
            loading={loading}
          />
          <Detail
            label="User Availability"
            value={inquiry?.user_availability}
            loading={loading}
          />
          <Detail
            label="Reference"
            value={inquiry?.reference}
            loading={loading}
          />
          <Detail
            label="Created At"
            value={inquiry ? new Date(inquiry.created_at).toLocaleString() : ""}
            loading={loading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Detail = ({
  label,
  value,
  loading,
}: {
  label: string;
  value: string | number | null | undefined;
  loading?: boolean;
}) => {
  const showSkeleton = loading || value === undefined || value === null;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-muted-foreground text-sm">{label}</span>
      {showSkeleton ? (
        <Skeleton className="h-5 w-3/4 rounded" />
      ) : (
        <span className="text-base">
          {value === "" ? "-" : value.toString()}
        </span>
      )}
    </div>
  );
};

export default ViewInquiryDialog;
