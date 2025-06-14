"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";

import type {
  InquiryTableData,
  InquiryTableResponse,
  InquiryTablePagination,
} from "@/app/(protected)/inquiry/type";

import InquiryListLoading from "@/app/(protected)/inquiry/loading";
import InquiryPagination from "./inquiryPagination";
import RowActionMenu from "./rowActionMenu";

import { useSearchParams } from "next/navigation";

const InquiryTable = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  const [inquiries, setInquiries] = useState<InquiryTableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<InquiryTablePagination>({
    limit: 10,
    page: currentPage,
    totalPages: 0,
    total: 0,
  });

  const getAllInquiries = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/inquiry?page=${page}&limit=${pagination.limit}`
      );
      const parsedResult: InquiryTableResponse = await res.json();
      setInquiries(parsedResult.data);
      setPagination(parsedResult.pagination);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllInquiries(currentPage);
  }, [currentPage]);

  const refreshDataAfterChange = async () => {
    getAllInquiries(currentPage);
  };

  if (loading) return <InquiryListLoading />;

  return (
    <div className="w-full overflow-x-auto px-4 py-6 ">
      <div className="inline-block min-w-full rounded-2xl shadow-md border border-gray-200 bg-white overflow-hidden">
        <Table className="min-w-full text-sm text-gray-700">
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-800">
              <TableHead className="px-4 py-3 text-center font-semibold">
                ID
              </TableHead>
              <TableHead className="px-4 py-3 text-center font-semibold">
                Full Name
              </TableHead>
              <TableHead className="px-4 py-3 text-center font-semibold">
                Phone Number
              </TableHead>
              <TableHead className="px-4 py-3 text-center font-semibold">
                Date of Birth
              </TableHead>
              <TableHead className="px-4 py-3 text-center font-semibold">
                Gender
              </TableHead>
              <TableHead className="px-4 py-3 text-center font-semibold">
                Reference
              </TableHead>
              <TableHead className="px-4 py-3 text-center font-semibold">
                Created At
              </TableHead>
              <TableHead className="px-4 py-3 text-center font-semibold">
                {" "}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <TableRow
                  key={inquiry.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="px-4 py-4 text-center">
                    {inquiry.id}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center">
                    {inquiry.full_name}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center">
                    {inquiry.phone_number}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center">
                    {inquiry.date_of_birth}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center">
                    {inquiry.gender}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center">
                    {inquiry.reference}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <RowActionMenu
                      id={inquiry.id}
                      refresh={refreshDataAfterChange}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
                  No inquiries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {inquiries.length > 0 && (
        <div>
          <InquiryPagination {...pagination} />
        </div>
      )}
    </div>
  );
};

export default InquiryTable;
