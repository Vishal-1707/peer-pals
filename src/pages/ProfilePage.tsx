import { Profile } from "@/components/Profile";

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

interface ProfilePageProps {
  user: User;
  posts: Post[];
}

const ProfilePage = ({ user, posts }: ProfilePageProps) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <Profile user={user} posts={posts} isOwnProfile={true} />
    </main>
  );
};

export default ProfilePage;