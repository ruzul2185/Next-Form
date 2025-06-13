"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import DrawerMenu from "./drawerMenu";
import { logout } from "@/utils/supabase/client";

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        router.push("/login");
        toast.success(result.message); // optional
      } else {
        toast.error(result.message || "Logout failed"); // optional
        console.error(result.message);
      }
    } catch (err) {
      console.error("Unexpected logout error:", err);
      toast.error("Something went wrong during logout."); // optional
    }
  };

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16">
        <DrawerMenu />
        <Link href="/" className="text-xl font-bold">
          MyLogo
        </Link>
        <Button
          variant="destructive"
          className="px-6 py-2 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 rounded-full border border-red-600 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
