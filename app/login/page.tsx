"use client";

import { CardFooter } from "@/components/ui/card";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import GoogleIcon from "@/components/icon/google-icon";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const { onAuthenticateGoogle, loading } = useAuth();

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (tokenResponse) => {
      return onAuthenticateGoogle(tokenResponse);
    },
    onError: (tokenResponse) => console.error(tokenResponse),
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Login to Ekspresi
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your portfolio editor
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <button
              type="submit"
              onClick={() => login()}
              className="flex justify-center items-center w-full space-x-2 bg-white py-2 text-gray-700 rounded-md border border-gray-200 hover:bg-blue-600/5 transition"
            >
              <GoogleIcon size={20} />
              <span className="text-sm">Sign in with Google</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
