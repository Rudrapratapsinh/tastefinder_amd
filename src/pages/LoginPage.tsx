
import { LoginForm } from "@/components/auth/LoginForm";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-food-light/50">
        <div className="container mx-auto px-4 py-16">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
