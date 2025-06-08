"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, LockIcon } from "lucide-react";
import Image from "next/image";
import { useNotes } from "@/contexts/notes-context";

export default function AuthPage() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (isAuthenticated && !isLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Don't render anything during server-side rendering to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center p-4">
      <div className="max-w-md w-full mx-auto">
        {/* Logo and App Name */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
              <CalendarIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Logs</h1>
          <p className="mt-2 text-gray-600">Log your activities, day by day</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="p-6 bg-blue-600 text-white">
            <h2 className="text-xl font-semibold">Welcome Back</h2>
            <p className="text-blue-100 text-sm mt-1">
              Choose a sign in method
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center py-6">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              </div>
            ) : (
              <LoginScreen />
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex justify-center items-center text-xs text-gray-500">
            <LockIcon className="h-3 w-3 mr-1" />
            <span>Secured with Auth0 authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginScreen() {
  const { loginWithRedirect } = useAuth0();

  // Handler for Google sign-in
  const handleGoogleSignIn = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: "google-oauth2",
      },
    });
  };

  // Handler for phone number sign-in
  const handlePhoneSignIn = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: "sms",
      },
    });
  };

  // Handler for standard email/password sign-in
  const handleStandardSignIn = () => {
    loginWithRedirect();
  };

  return (
    <div className="space-y-4">
      {/* Google Sign-in Button */}
      <Button
        onClick={handleGoogleSignIn}
        variant="outline"
        className="w-full flex items-center justify-center gap-2 py-5 border-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span>Continue with Google</span>
      </Button>

      <div className="text-center text-sm text-gray-500 mt-4 pt-4 border-t">
        <p>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
