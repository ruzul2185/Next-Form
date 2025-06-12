import Link from "next/link";
import { Button } from "@/components/ui/button";

import DrawerMenu from "./drawerMenu";

import { signOut } from "@/app/(authenticated)/actions";

const Header = () => {
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
          onClick={signOut}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
