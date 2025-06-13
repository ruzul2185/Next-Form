"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const InquiryListLoading = () => {
  return (
    <div className="w-full overflow-x-auto px-4 py-6">
      <div className="inline-block min-w-full rounded-2xl shadow-md border border-gray-200 bg-white">
        <Table className="min-w-full text-sm text-gray-700">
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-800">
              {[
                "ID",
                "Full Name",
                "Phone Number",
                "Date of Birth",
                "Gender",
                "Reference",
                "Created At",
              ].map((label, idx) => (
                <TableHead
                  key={idx}
                  className="px-4 py-3 text-center font-semibold text-gray-500"
                >
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, rowIdx) => (
              <TableRow key={rowIdx} className="border-t animate-pulse">
                {Array.from({ length: 7 }).map((_, colIdx) => (
                  <TableCell key={colIdx} className="px-4 py-4 text-center">
                    <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InquiryListLoading;
