"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/navigation"; // Update to next/navigation for App Router
import React from "react";

export function AuthProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Fallback values in case env vars are not available at runtime
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

  // Get the origin for the redirect URI
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const onRedirectCallback = (appState: any) => {
    // Handle redirect after login
    if (process.env.NEXT_PUBLIC_NODE_ENV === "development")
      router.push(appState?.returnTo || "/dashboard");
    else
      router.push(appState?.returnTo || `/daily-logs-at-workspace/aabddhors`);
  };

  if (!domain || !clientId) {
    console.error("Auth0 configuration is missing!");
    // Return children without Auth0 to prevent app from crashing
    router.push("/login");
    return <>{children}</>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `${origin}/dashboard`,
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
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
