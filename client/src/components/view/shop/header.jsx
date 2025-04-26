import { Link, useNavigate } from 'react-router-dom';
import logoImg from '@/assets/logo.png';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingHeaderMenuItems } from '@/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { logoutUser } from '@/store/auth/authSlice';
import { toast } from 'sonner';
import { toastStyles } from '@/utils/toastStyles';

export default function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
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
  const HeaderRtContent = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
      dispatch(logoutUser()).then((action) => {
        const res = action.payload;
        if (res.success) {
          toast(res.msg, {
            duration: 4000,
            style: toastStyles.SUCCESS,
          });
        } else {
          toast.error(res.msg || 'Logout failed', {
            duration: 4000,
            style: toastStyles.ERROR,
          });
        }
      });
    };
    return (
      <div className="flex lg:items-center flex-row gap-4 justify-center lg:justify-normal">
        <Button variant="outline" size="icon" className="cursor-pointer">
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">User cart</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold cursor-pointer">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56">
            <DropdownMenuLabel>
              Logged in as <span className="font-bold">{user?.userName}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigate('/shop/account')}
            >
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
