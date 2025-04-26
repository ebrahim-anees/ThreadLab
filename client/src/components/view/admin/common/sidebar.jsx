import { adminSidebarMenuItems } from '@/config';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImg from '@/assets/logo.png';
import clsx from 'clsx';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export default function AdminSideBar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const MenuItems = ({ setOpen }) => {
    return (
      <nav className="mt-8 flex-col flex gap-2">
        {adminSidebarMenuItems.map((menuItem) => {
          const isActive = location.pathname === menuItem.path;
          return (
            <div
              key={menuItem.id}
              className={clsx(
                'flex items-center gap-2 text-xl rounded-md px-3 py-2 cursor-pointer',
                isActive
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
              onClick={() => {
                navigate(menuItem.path);
                setOpen ? setOpen(false) : null;
              }}
            >
              <menuItem.icon />
              <span className="">{menuItem.label}</span>
            </div>
          );
        })}
      </nav>
    );
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle
                className="flex gap-2 my-5 items-center cursor-pointer"
                onClick={() => {
                  navigate('/admin/dashboard');
                  setIsOpen(false);
                }}
              >
                <img
                  src={logoImg}
                  alt="ThreadLab_logo"
                  className="w-[35px] h-auto"
                />
                <span className="text-xl font-extrabold">Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setIsOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          className="flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => navigate('/admin/dashboard')}
        >
          <img src={logoImg} alt="ThreadLab_logo" className="w-[35px] h-auto" />
          <h3 className="text-xl font-extrabold">Admin Panel</h3>
        </div>
        <MenuItems />
      </aside>
    </>
  );
}
