"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { DeleteInquiryDialogProps } from "@/app/(protected)/inquiry/type";

const DeleteDialog = ({
  id,
  openDialog,
  setOpenDialog,
  refresh,
}: DeleteInquiryDialogProps) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/inquiry/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Delete failed:", error);
        // Optionally use toast here
        return;
      }

      // Optionally use toast("Deleted successfully")
      toast.success("Deleted successfully");
      refresh();
      setOpenDialog(false);
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            inquiry and remove all its data from our records.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setOpenDialog(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
