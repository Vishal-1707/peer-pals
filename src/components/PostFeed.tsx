import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share } from "lucide-react";
import { useState } from "react";

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  likes?: number;
  comments?: number;
}

interface PostFeedProps {
  posts: Post[];
}

export const PostFeed = ({ posts }: PostFeedProps) => {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (posts.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <p className="text-muted-foreground">No posts yet. Be the first to share something!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {post.author.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-sm">{post.author}</h3>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(post.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Professional</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm leading-relaxed mb-4">{post.content}</p>
            
            <div className="flex items-center justify-between pt-2 border-t border-border/30">
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={`h-8 px-3 ${
                    likedPosts.has(post.id) 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Heart 
                    size={16} 
                    className={likedPosts.has(post.id) ? 'fill-current' : ''} 
                  />
                  <span className="ml-1 text-xs">
                    {(post.likes || 0) + (likedPosts.has(post.id) ? 1 : 0)}
                  </span>
                </Button>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-muted-foreground hover:text-foreground"
                >
                  <MessageCircle size={16} />
                  <span className="ml-1 text-xs">{post.comments || 0}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-muted-foreground hover:text-foreground"
                >
                  <Share size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};