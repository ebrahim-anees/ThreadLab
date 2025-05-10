import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { logoutUser } from '@/store/auth/authSlice';
import { toastStyles } from '@/utils/toastStyles';
import { LogOut, ShoppingCart, UserCog } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import CartWrapper from '../cart/cartWrapper';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useEffect, useMemo, useState } from 'react';
import { fetchCartItems } from '@/store/shop/cartSlice';

export default function HeaderRtContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const itemsCount =
    useMemo(() => cartItems?.items?.length, [cartItems.items]) || 0;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
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
  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch, user?.id]);
  return (
    <div className="flex lg:items-center flex-row gap-4 justify-center lg:justify-normal">
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <span
              className={`rounded-full bg-red-600 text-white w-4 h-4 text-xs absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
                itemsCount === 0 ? 'opacity-50' : ''
              }`}
            >
              {itemsCount}
            </span>
            <span className="sr-only">User cart</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">Your Cart</SheetTitle>
          </SheetHeader>
          <CartWrapper cartItems={cartItems} setIsCartOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>
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
            onClick={() => {
              navigate('/shop/account');
            }}
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
}
