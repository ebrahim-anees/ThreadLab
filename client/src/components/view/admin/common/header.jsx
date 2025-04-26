import { Button } from '@/components/ui/button';
import { logoutUser } from '@/store/auth/authSlice';
import { toastStyles } from '@/utils/toastStyles';
import { AlignJustify, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

export default function AdminHeader({ setIsOpen }) {
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
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button
        className="lg:hidden cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium  cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}
