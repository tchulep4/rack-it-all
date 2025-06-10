
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  LayoutDashboard,
  Monitor,
  PackageCheck,
  Key,
  Users,
  Settings,
  BarChart3,
  Menu,
  X,
  Shield
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, hasRole } = useAuth();

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div
      className={cn(
        'bg-sidebar text-sidebar-foreground flex flex-col h-screen transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="font-bold text-xl">Rack-IT-All</div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <Menu /> : <X />}
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" collapsed={collapsed} />
        <NavItem to="/hardware" icon={<Monitor size={20} />} label="Hardware" collapsed={collapsed} />
        <NavItem to="/software" icon={<PackageCheck size={20} />} label="Software" collapsed={collapsed} />
        <NavItem to="/licenses" icon={<Key size={20} />} label="Licenses" collapsed={collapsed} />
        <NavItem to="/reports" icon={<BarChart3 size={20} />} label="Reports" collapsed={collapsed} />
        <NavItem to="/users" icon={<Users size={20} />} label="Users" collapsed={collapsed} />
        
        {hasRole('admin') && (
          <NavItem 
            to="/admin" 
            icon={<Shield size={20} />} 
            label="Administração" 
            collapsed={collapsed} 
          />
        )}
        
        <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" collapsed={collapsed} />
      </nav>

      {!collapsed && user && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-sm">
            <p className="font-medium">{user.name}</p>
            <p className="text-sidebar-foreground/70 capitalize">{user.role}</p>
          </div>
        </div>
      )}
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const NavItem = ({ to, icon, label, collapsed }: NavItemProps) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        cn(
          'flex items-center p-3 rounded-md transition-colors',
          collapsed ? 'justify-center' : 'space-x-3',
          isActive 
            ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
            : 'hover:bg-sidebar-accent/50'
        )
      }
    >
      <span>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
