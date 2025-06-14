import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    const data = {
      full_name: body["Full Name"],
      phone_number: body["Phone Number"] ? Number(body["Phone Number"]) : null,
      date_of_birth: new Date(body["Date of Birth"]),
      gender: body["Gender"],
      email: body["Email"] || body["Email Address"] || null,
      reference: body["Reference"],
      current_address: body["Current Address"] || null,
      permanent_address: body["Permanent Address"] || null,
      course_selection: body["Which course are you looking for?"] || null,
      course_duration: body["Course Duration"] || null,
      user_availability:
        body["How many hours can you invest daily / monthly?"] || null,
      job_guarentee: body["Are you looking for 100% Job guarantee?"] || null,
      job_assistance: body["Are you interested in Job Assistance?"] || null,
      job_location: body["Preferred Job Location"] || null,
      expected_package: body["How much package do you wish to have?"] || null,
      future_goal:
        body["Where do you want to see yourself after 5 years?"] || null,
      career_transition_reason:
        body[
          "Why do you want to shift into IT from any other field? (For Non - Technical)"
        ] || null,
      recent_education: body["Last Education"] || null,
      passing_year:
        body["Passing Year"] && !isNaN(Number(body["Passing Year"]))
          ? Number(body["Passing Year"])
          : null,
      cgpa:
        body["CGPA"] && !isNaN(Number(body["CGPA"]))
          ? Number(body["CGPA"])
          : null,
    };

    const { data: insertedData, error } = await supabase
      .from("inquiries")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, data: insertedData },
      { status: 201 }
    );
  } catch (err) {
    console.error("Unexpected server error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
