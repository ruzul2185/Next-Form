import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import Link from "next/link";

const DrawerMenu = () => {
  return (
    <Drawer>
      <DrawerTrigger className="cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors">
        Menu
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-lg">Menu</DrawerTitle>
        </DrawerHeader>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4 px-6 pb-6">
          <Link
            href="/dashboard"
            className="text-base font-bold hover:bg-gray-300 p-3 rounded-2xl"
          >
            Dashboard
          </Link>
          <Link
            href="/inquiry?page=1&limit=10"
            className="ext-base font-bold hover:bg-gray-300 p-3 rounded-2xl"
          >
            Inquiry
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;
