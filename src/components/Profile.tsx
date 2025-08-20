import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Mail, Edit } from "lucide-react";

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
}

interface ProfileProps {
  user: User;
  posts: Post[];
  isOwnProfile?: boolean;
}

export const Profile = ({ user, posts, isOwnProfile = true }: ProfileProps) => {
  const userPosts = posts.filter(post => post.author === user.name);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="shadow-lg border-border/50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                  <p className="text-lg text-muted-foreground mt-1">
                    {user.bio || "Professional on PeerPals"}
                  </p>
                </div>
                
                {isOwnProfile && (
                  <Button variant="outline" size="sm">
                    <Edit size={16} className="mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
              
              <div className="flex items-center space-x-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </div>
                {user.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>Joined {formatDate(user.joinedDate || new Date())}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card className="shadow-sm border-border/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{userPosts.length}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Connections</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Section */}
      <Card className="shadow-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Posts</span>
            <Badge variant="secondary">{userPosts.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userPosts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No posts yet.</p>
              {isOwnProfile && (
                <p className="text-sm text-muted-foreground mt-2">
                  Share your first post to get started!
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {userPosts.slice(0, 5).map((post, index) => (
                <div key={post.id}>
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {post.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {post.content}
                      </p>
                    </div>
                  </div>
                  {index < userPosts.slice(0, 5).length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};