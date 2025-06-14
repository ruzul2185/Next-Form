import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Export this if needed elsewhere
export function createClient() {
  return supabase;
}

// Sign in with email + password
export async function signIn(email: string, password: string) {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: "Login successful" };
  } catch (err: unknown) {
    console.error("Sign-in error:", err);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// Logout
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: "Logged out successfully" };
  } catch (err: unknown) {
    console.error("Logout error:", err);
    return { success: false, message: "Something went wrong during logout." };
  }
}
