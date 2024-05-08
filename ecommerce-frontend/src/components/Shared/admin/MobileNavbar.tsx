import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { HiMenuAlt4 } from "react-icons/hi";
const MobileNavbar = () => {
  return (
    <Sheet>
    <SheetTrigger ><HiMenuAlt4 className="w-8 h-8 bg-black text-white rounded-lg"/></SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
  
  )
}

export default MobileNavbar