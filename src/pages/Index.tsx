import { PostCreator } from "@/components/PostCreator";
import { PostFeed } from "@/components/PostFeed";

interface User {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
}

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  likes?: number;
  comments?: number;
}

interface IndexProps {
  user: User;
  posts: Post[];
  onPostCreated: (post: Post) => void;
}

const Index = ({ user, posts, onPostCreated }: IndexProps) => {
  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Share your thoughts with the professional community
          </p>
        </div>
        
        <PostCreator user={user} onPostCreated={onPostCreated} />
        <PostFeed posts={posts} />
      </div>
    </main>
  );
};

export default Index;
