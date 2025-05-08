
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search } from 'lucide-react';
import ProfileMenu from '@/components/layout/ProfileMenu';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="border-b px-6 py-3 bg-white flex items-center justify-between">
      <div className="flex items-center gap-2 w-full max-w-md">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search assets, licenses, users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-none shadow-none focus-visible:ring-0 text-sm"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;
