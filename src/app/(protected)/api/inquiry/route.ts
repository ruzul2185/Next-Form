// app/api/inquiries/route.ts

import { createClient } from "@/utils/supabase/server"; // or wherever your server supabase client is
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();

  // Get URL parameters
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // Calculate offset
  const offset = (page - 1) * limit;

  // Get total count first
  const { count } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true });

  // Get paginated data
  const { data, error } = await supabase
    .from("inquiries")
    .select(
      "id, full_name, phone_number, date_of_birth, gender, reference, created_at"
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit),
      },
    },
    { status: 200 }
  );
}
