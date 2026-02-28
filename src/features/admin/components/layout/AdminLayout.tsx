import { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children?: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('adminSidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar onCollapsedChange={setSidebarCollapsed} />
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <AdminHeader />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
