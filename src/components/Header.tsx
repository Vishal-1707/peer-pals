import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Home, User, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  isAuthenticated: boolean;
  user?: { name: string; email: string; avatar?: string };
  onSignOut: () => void;
}

export const Header = ({ isAuthenticated, user, onSignOut }: HeaderProps) => {
  const location = useLocation();

  if (!isAuthenticated) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b border-border bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary-hover transition-colors">
            PeerPals
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all hover:bg-accent ${
                isActive('/') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Home size={20} />
              <span>Feed</span>
            </Link>
            <Link 
              to="/profile" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all hover:bg-accent ${
                isActive('/profile') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <User size={20} />
              <span>Profile</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-medium">{user?.name}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onSignOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};