import { Link } from 'react-router-dom';
import logoImg from '@/assets/logo.png';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { shoppingHeaderMenuItems } from '@/config';
import HeaderRtContent from './headerRtContent';

export default function ShoppingHeader() {
  const MenuItems = () => {
    return (
      <nav className="flex flex-col lg:flex-row mb-3 lg:mb-0 lg:items-center gap-6 pl-4 lg:pl-0">
        {shoppingHeaderMenuItems.map((menuItem) => (
          <Link
            key={menuItem.id}
            to={menuItem.path}
            className="text-sm font-medium"
          >
            {menuItem.label}
          </Link>
        ))}
      </nav>
    );
  };
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <img src={logoImg} className="w-6" />
          <span className="font-bold">ThreadLab</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden cursor-pointer"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full max-w-xs [&>button]:cursor-pointer [&>button]:mt-[9px] [&>button>svg]:w-5 [&>button>svg]:h-5"
          >
            <SheetHeader className="flex justify-center">
              <SheetTitle className="text-2xl font-bold">
                Shopping Menu
              </SheetTitle>
            </SheetHeader>
            <MenuItems />
            <HeaderRtContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRtContent />
        </div>
      </div>
    </header>
  );
}
