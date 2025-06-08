'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button 
      onClick={() => loginWithRedirect()} 
      className="bg-blue-600 hover:bg-blue-700"
    >
      Log In
    </Button>
  );
}

export function LogoutButton({ className }: { className?: string }) {
  const { logout } = useAuth0();
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const handleLogout = () => {
    try {
      logout({ 
        logoutParams: { 
          returnTo: origin 
        } 
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button 
      onClick={handleLogout}
      variant="outline"
      className={className || "text-gray-600 hover:text-gray-800"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="mr-2"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      Sign out
    </Button>
  );
}

export function AuthStatus() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        {user.picture && (
          <img 
            src={user.picture} 
            alt={user.name || 'User'} 
            className="h-8 w-8 rounded-full"
          />
        )}
        <span className="text-sm font-medium">{user.name}</span>
      </div>
    );
  }

  return null;
}