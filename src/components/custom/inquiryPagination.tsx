"use client";

import { InquiryTablePagination } from "@/app/(protected)/inquiry/type";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useRouter } from "next/navigation";

const InquiryPagination: React.FC<InquiryTablePagination> = ({
  limit,
  page,
  total,
  totalPages,
}) => {
  const router = useRouter();

  return (
    <div className="mt-6 flex flex-col items-center space-y-3">
      <div className="text-sm text-gray-500">
        <span className="font-medium text-gray-700">Page {page}</span> of{" "}
        <span className="font-medium text-gray-700">{totalPages}</span> | Total{" "}
        <span className="font-medium text-gray-700">{total}</span> inquiries
      </div>

      <Pagination className="gap-2">
        <PaginationPrevious
          onClick={() =>
            router.push(`/inquiry?page=${page - 1}&limit=${limit}`)
          }
          className={`rounded-md px-3 py-2 text-sm font-medium transition ${
            page === 1
              ? "opacity-50 pointer-events-none bg-gray-200 text-gray-500"
              : "hover:bg-gray-100 bg-white border cursor-pointer"
          }`}
        >
          Previous
        </PaginationPrevious>

        <PaginationContent className="flex gap-1">
          {page > 2 && (
            <>
              <PaginationItem>
                <PaginationLink
                  onClick={() => router.push(`/inquiry?page=1&limit=${limit}`)}
                  className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {page > 3 && <PaginationEllipsis />}
            </>
          )}

          {page > 1 && (
            <PaginationItem>
              <PaginationLink
                onClick={() =>
                  router.push(`/inquiry?page=${page - 1}&limit=${limit}`)
                }
                className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100"
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink className="bg-gray-600 text-white rounded-md px-3 py-2 font-semibold">
              {page}
            </PaginationLink>
          </PaginationItem>

          {page < totalPages && (
            <PaginationItem>
              <PaginationLink
                onClick={() =>
                  router.push(`/inquiry?page=${page + 1}&limit=${limit}`)
                }
                className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100"
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {page < totalPages - 1 && (
            <>
              {page < totalPages - 2 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationLink
                  onClick={() =>
                    router.push(`/inquiry?page=${totalPages}&limit=${limit}`)
                  }
                  className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
        </PaginationContent>

        <PaginationNext
          onClick={() =>
            router.push(`/inquiry?page=${page + 1}&limit=${limit}`)
          }
          className={`rounded-md px-3 py-2 text-sm font-medium transition ${
            page === totalPages
              ? "opacity-50 pointer-events-none bg-gray-200 text-gray-500"
              : "hover:bg-gray-100 bg-white border cursor-pointer"
          }`}
        >
          Next
        </PaginationNext>
      </Pagination>
    </div>
  );
};

export default InquiryPagination;
