"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type {
  ViewInquiryDialogProps,
  SingleInquiryResponse,
  SinqleInquiryData,
} from "@/app/(protected)/inquiry/type";
import { useEffect, useState } from "react";
import InputSkeleton from "./inputSkeleton";
import EditFieldDialog from "./editFieldDialog";

const ViewInquiryDialog = ({
  id,
  openDialog,
  setOpenDialog,
}: ViewInquiryDialogProps) => {
  const [inquiry, setInquiry] = useState<SinqleInquiryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingField, setEditingField] = useState<{
    label: string;
    key: keyof SinqleInquiryData;
  } | null>(null);

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

  const handleFieldUpdate = async (
    key: keyof SinqleInquiryData,
    value: string
  ) => {
    try {
      await fetch(`/api/inquiry/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      await getSingleInquiry(); // Refresh data
    } catch (error) {
      console.error("Failed to update field", error);
    }
  };

  useEffect(() => {
    if (openDialog) {
      getSingleInquiry();
    }
  }, [openDialog]);

  const editableField = (label: string, key: keyof SinqleInquiryData) => {
    const value = inquiry?.[key];

    return (
      <InputSkeleton
        key={key}
        label={label}
        value={
          loading
            ? undefined
            : value === null || value === undefined
            ? "Not Provided"
            : value
        }
        loading={loading}
        onEdit={() => {
          setEditingField({ label, key });
          setEditDialogOpen(true);
        }}
      />
    );
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
            {editableField("Full Name", "full_name")}
            {editableField("Email", "email")}
            {editableField("Phone Number", "phone_number")}
            {editableField("Date of Birth", "date_of_birth")}
            {editableField("Gender", "gender")}
            {editableField("Current Address", "current_address")}
            {editableField("Permanent Address", "permanent_address")}
            {editableField("Recent Education", "recent_education")}
            {editableField("CGPA", "cgpa")}
            {editableField("Passing Year", "passing_year")}
            {editableField("Course Selected", "course_selection")}
            {editableField("Course Duration", "course_duration")}
            {editableField("Expected Package", "expected_package")}
            {editableField("Job Assistance", "job_assistance")}
            {editableField("Job Guarantee", "job_guarentee")}
            {editableField("Preferred Job Location", "job_location")}
            {editableField(
              "Career Transition Reason",
              "career_transition_reason"
            )}
            {editableField("Future Goal", "future_goal")}
            {editableField("User Availability", "user_availability")}
            {editableField("Reference", "reference")}

            <InputSkeleton
              label="Created At"
              value={
                loading
                  ? undefined
                  : inquiry?.created_at
                  ? new Date(inquiry.created_at).toLocaleString()
                  : "Not Provided"
              }
              loading={loading}
            />
          </div>
        </DialogContent>
      </Dialog>

      {editingField && (
        <EditFieldDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          label={editingField.label}
          value={inquiry?.[editingField.key] ?? ""}
          onSave={(val) => handleFieldUpdate(editingField.key, val)}
        />
      )}
    </>
  );
};

export default ViewInquiryDialog;
