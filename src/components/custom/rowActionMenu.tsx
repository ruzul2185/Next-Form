"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import type { RowActionMenuProps } from "@/app/(protected)/inquiry/type";
import ViewInquiryDialog from "./viewInquiryDialog";

const RowActionMenu = ({ id }: RowActionMenuProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Row actions">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setOpenDialog(true)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem>Update</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewInquiryDialog
        id={id}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
};

export default RowActionMenu;
