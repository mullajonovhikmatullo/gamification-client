import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderTree,
  FileQuestion,
  Users,
  GraduationCap,
  UsersRound,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {cn} from "@/features/admin/lib/utils.ts";

interface AdminSidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Boshqaruv paneli', exact: true },
  { to: '/admin/categories', icon: FolderTree, label: 'Kategoriyalar' },
  { to: '/admin/quizzes', icon: FileQuestion, label: 'Testlar' },
  { to: '/admin/users', icon: Users, label: "O'quvchilar" },
  { to: '/admin/teachers', icon: GraduationCap, label: "O'qituvchilar" },
  { to: '/admin/groups', icon: UsersRound, label: 'Guruhlar' },
];

export function AdminSidebar({ onCollapsedChange }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('adminSidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('adminSidebarCollapsed', JSON.stringify(collapsed));
    onCollapsedChange?.(collapsed);
  }, [collapsed, onCollapsedChange]);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-white border-r transition-all duration-300 flex flex-col shadow-sm',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-sm">
            <Gamepad2 className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-primary">
              Webstar
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          let isActive = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);

          // Keep Categories active when on question pages
          if (item.to === '/admin/categories' && location.pathname.startsWith('/admin/questions')) {
            isActive = true;
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive: navLinkActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  (isActive || navLinkActive)
                    ? 'bg-primary text-primary-foreground shadow-sm font-semibold'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Yig'ish</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
