// "use client";

// import { Auth0Provider } from "@auth0/auth0-react";
// import { useRouter } from "next/navigation"; // Update to next/navigation for App Router
// import React from "react";

// export function AuthProviders({ children }: { children: React.ReactNode }) {
//   const router = useRouter();

//   // Fallback values in case env vars are not available at runtime
//   const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
//   const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

//   // Get the origin for the redirect URI
//   const origin = typeof window !== "undefined" ? window.location.origin : "";

//   const onRedirectCallback = (appState: any) => {
//     // Handle redirect after login
//     if (process.env.NEXT_PUBLIC_NODE_ENV === "development")
//       router.push(appState?.returnTo || "/dashboard");
//     else
//       router.push(appState?.returnTo || `/daily-logs-at-workspace/aabddhors`);
//   };

//   if (!domain || !clientId) {
//     console.error("Auth0 configuration is missing!");
//     // Return children without Auth0 to prevent app from crashing
//     router.push("/login");
//     return <>{children}</>;
//   }

//   return (
//     <Auth0Provider
//       domain={domain}
//       clientId={clientId}
//       authorizationParams={{
//         redirect_uri: `${origin}/dashboard`,
//         audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
//         scope: "openid profile email",
//       }}
//       onRedirectCallback={onRedirectCallback}
//       cacheLocation="localstorage"
//       useRefreshTokens={true}
//     >
//       {children}
//     </Auth0Provider>
//   );
// }

"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export function AuthProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Environment variables
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;
  const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === "development";

  // Get the origin safely
  const getOrigin = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    // Fallback for SSR - you might want to set this via env var
    return process.env.NEXT_PUBLIC_BASE_URL || "";
  };

  const onRedirectCallback = (appState: any) => {
    // Handle redirect after login
    const targetPath =
      appState?.returnTo ||
      (isDevelopment ? "/dashboard" : "/daily-logs-at-workspace/dashboard");

    router.push(targetPath);
  };

  useEffect(() => {
    // Check configuration on mount
    if (!domain || !clientId) {
      console.error("Auth0 configuration is missing!", {
        domain: !!domain,
        clientId: !!clientId,
      });

      // Redirect to login page
      router.push("/login");
      setIsConfigured(false);
    } else {
      setIsConfigured(true);
    }

    setIsLoading(false);
  }, [domain, clientId, router]);

  // Show loading state while checking configuration
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  // Return children without Auth0 if not configured
  if (!isConfigured) {
    return <>{children}</>;
  }

  const origin = getOrigin();
  const redirectUri = isDevelopment
    ? `${origin}/dashboard`
    : `${origin}/daily-logs-at-workspace/auth/callback`;

  return (
    <Auth0Provider
      domain={domain!}
      clientId={clientId!}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: "openid profile email",
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
}
