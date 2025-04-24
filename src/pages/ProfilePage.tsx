
import { UserProfile } from "@/components/profile/UserProfile";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <UserProfile />
      </main>
      <Footer />
    </div>
  );
}
