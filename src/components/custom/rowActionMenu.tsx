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
import DeleteDialog from "./deleteDialog";

const RowActionMenu = ({ id, refresh }: RowActionMenuProps) => {
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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
            <DropdownMenuItem onSelect={() => setOpenViewDialog(true)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setOpenDeleteDialog(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewInquiryDialog
        id={id}
        openDialog={openViewDialog}
        setOpenDialog={setOpenViewDialog}
      />
      <DeleteDialog
        id={id}
        openDialog={openDeleteDialog}
        setOpenDialog={setOpenDeleteDialog}
        refresh={refresh}
      />
    </>
  );
};

export default RowActionMenu;
