"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const EditFieldDialog = ({
  open,
  onOpenChange,
  label,
  value,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
  value: string | number | null | undefined;
  onSave: (newValue: string) => void;
}) => {
  const [inputValue, setInputValue] = useState(value?.toString() ?? "");

  useEffect(() => {
    setInputValue(value?.toString() ?? "");
  }, [value]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {label}</DialogTitle>
        </DialogHeader>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <Button
            onClick={() => {
              onSave(inputValue);
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditFieldDialog;
