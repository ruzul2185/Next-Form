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

function cleanFormData(form: Record<string, unknown>): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};

  const bigintKeys = new Set(["passing_year"]);

  for (const [key, value] of Object.entries(form)) {
    if (value === "") {
      cleaned[key] = null;
    } else if (bigintKeys.has(key)) {
      try {
        cleaned[key] =
          value != null && value !== ""
            ? BigInt(value as string | number)
            : null;
      } catch {
        cleaned[key] = null;
      }
    } else if (key === "cgpa") {
      const num = Number(value);
      cleaned[key] = isNaN(num) ? null : num;
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned;
}

export async function POST(req: Request) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const rawBody = await req.json();
    const body = cleanFormData(rawBody);

    // Validate required fields
    const requiredFields = [
      "full_name",
      "phone_number",
      "date_of_birth",
      "gender",
      "reference",
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("inquiries")
      .insert([body])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Error inserting inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
