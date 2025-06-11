"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "../../utils/supabase/server";

import type { LoginData } from "./type";

export async function login(LoginData: LoginData) {
  const supabase = await createClient();

  const { email, password } = LoginData;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/", "layout");

  return { success: true, message: "Login Successful!" };
}
