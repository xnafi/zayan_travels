import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Sign in to the Zayan Travels admin dashboard.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-primary to-brand-dark px-4">
      <div className="w-full max-w-md">
        <Suspense
          fallback={
            <div className="flex items-center justify-center rounded-xl bg-white p-8">
              <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}