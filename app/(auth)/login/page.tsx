"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Github from "@/components/icons/Github";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    signIn("github", { callbackUrl: "/" });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Login with your GitHub account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full flex items-center space-x-3"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <span>Loading...</span>
            ) : (
              <>
                <Github />
                <span>Sign up with GitHub</span>
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
