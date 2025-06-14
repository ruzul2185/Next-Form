"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialForm = {
  full_name: "",
  phone_number: "",
  date_of_birth: "",
  gender: "",
  email: "",
  reference: "",
  current_address: "",
  permanent_address: "",
  course_selection: "",
  course_duration: "",
  user_availability: "",
  job_guarentee: "",
  job_assistance: "",
  job_location: "",
  expected_package: "",
  future_goal: "",
  career_transition_reason: "",
  recent_education: "",
  passing_year: "",
  cgpa: "",
};

const AddDialog = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Error:", err);
        return;
      }

      setOpen(false);
      setForm(initialForm);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Inquiry</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Inquiry</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {[
            { label: "Full Name", name: "full_name", required: true },
            { label: "Phone Number", name: "phone_number", required: true },
            {
              label: "Date of Birth",
              name: "date_of_birth",
              type: "date",
              required: true,
            },
            { label: "Gender", name: "gender", required: true },
            { label: "Email", name: "email", type: "email" },
            { label: "Reference", name: "reference", required: true },
            { label: "Current Address", name: "current_address" },
            { label: "Permanent Address", name: "permanent_address" },
            { label: "Course Selection", name: "course_selection" },
            { label: "Course Duration", name: "course_duration" },
            { label: "User Availability", name: "user_availability" },
            { label: "Job Guarantee", name: "job_guarentee" },
            { label: "Job Assistance", name: "job_assistance" },
            { label: "Job Location", name: "job_location" },
            { label: "Expected Package", name: "expected_package" },
            { label: "Future Goal", name: "future_goal" },
            {
              label: "Career Transition Reason",
              name: "career_transition_reason",
            },
            { label: "Recent Education", name: "recent_education" },
            { label: "Passing Year", name: "passing_year", type: "number" },
            { label: "CGPA", name: "cgpa", type: "number" },
          ].map(({ label, name, type = "text", required }) => (
            <div key={name} className="space-y-2">
              <Label htmlFor={name}>
                {label} {required ? "*" : ""}
              </Label>
              {name.includes("address") ||
              name.includes("goal") ||
              name.includes("reason") ? (
                <Textarea
                  id={name}
                  name={name}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={label}
                  required={required}
                />
              ) : (
                <Input
                  id={name}
                  name={name}
                  type={type}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={label}
                  required={required}
                />
              )}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
