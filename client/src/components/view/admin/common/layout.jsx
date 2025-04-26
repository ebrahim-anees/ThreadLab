import { Outlet } from 'react-router-dom';
import AdminSideBar from './sidebar';
import AdminHeader from './header';
import { useState } from 'react';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      <AdminSideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <AdminHeader setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 flex flex-col bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
