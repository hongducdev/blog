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

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    signIn("github", { callbackUrl: "/" });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            Đăng nhập
          </CardTitle>
          <CardDescription>
            Đăng nhập bằng Github để tiếp tục
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
                <span>Đăng nhập với Github</span>
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
