import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PostCreatorProps {
  user: { name: string; email: string; avatar?: string };
  onPostCreated: (post: { id: string; content: string; author: string; timestamp: Date }) => void;
}

export const PostCreator = ({ user, onPostCreated }: PostCreatorProps) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    
    // Simulate posting - replace with Supabase database insert
    setTimeout(() => {
      const newPost = {
        id: Date.now().toString(),
        content: content.trim(),
        author: user.name,
        timestamp: new Date()
      };
      
      onPostCreated(newPost);
      setContent("");
      setIsLoading(false);
      
      toast({
        title: "Post shared!",
        description: "Your post has been shared with the community.",
      });
    }, 500);
  };

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="What's on your mind? Share your professional thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="resize-none border-border/50 focus:border-primary"
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {content.length}/500 characters
            </span>
            <Button 
              type="submit" 
              disabled={!content.trim() || isLoading || content.length > 500}
              className="bg-gradient-to-r from-primary to-primary-hover hover:shadow-md transition-all"
            >
              {isLoading ? (
                "Posting..."
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  Post
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};