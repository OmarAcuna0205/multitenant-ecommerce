import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-auto pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              onClick={() => onOpenChange(false)}
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            <Link
              onClick={() => onOpenChange(false)}
              href="/sign-in"
              className="w-full p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              Sign in
            </Link>
            <Link
              onClick={() => onOpenChange(false)}
              href="/sign-up"
              className="w-full p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              Sign up
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
