import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Auth } from "@/components/Auth";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface User {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  location?: string;
  joinedDate?: Date;
}

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  likes?: number;
  comments?: number;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      content: "Welcome to PeerPals! This is a demo post to show how the platform works. Once you connect Supabase, all posts will be stored in a real database with user authentication.",
      author: "PeerPals Team",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 5,
      comments: 2
    },
    {
      id: "2", 
      content: "Just built an amazing React component! The satisfaction of clean, reusable code never gets old. What's everyone working on today?",
      author: "Sarah Chen",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      likes: 12,
      comments: 4
    }
  ]);

  const handleAuth = (userData: User) => {
    setUser({ ...userData, joinedDate: new Date() });
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Auth onAuth={handleAuth} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header 
              isAuthenticated={!!user} 
              user={user} 
              onSignOut={handleSignOut} 
            />
            <Routes>
              <Route 
                path="/" 
                element={
                  <Index 
                    user={user} 
                    posts={posts} 
                    onPostCreated={handlePostCreated} 
                  />
                } 
              />
              <Route 
                path="/profile" 
                element={<ProfilePage user={user} posts={posts} />} 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
