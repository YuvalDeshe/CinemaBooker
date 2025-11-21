"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import BackgroundReel from "@/app/components/BackgroundReel";
import { EmailVerificationController } from "@/controllers/EmailVerificationController";
import { EmailVerificationState } from "@/types/EmailVerification";

function VerifyEmailContent() {
  const [verificationState, setVerificationState] = useState<EmailVerificationState>({
    status: "loading",
    message: "Verifying your email address...",
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    const token = searchParams.get("token");
    
    const performVerification = async () => {
      // Use controller to handle the verification process
      const result = await EmailVerificationController.verifyEmail(token);
      
      setVerificationState(result);

      // Handle automatic redirect for successful verification
      if (result.status === "success" && result.redirectTo) {
        setTimeout(() => {
          router.push(result.redirectTo!);
        }, 3000);
      }

      // Handle redirect for expired tokens
      if (result.status === "expired") {
        setTimeout(() => {
          router.push("/register");
        }, 5000);
      }
    };

    performVerification();
  }, [searchParams, router]);

  // Get status-specific messages and styling
  const statusMessages = EmailVerificationController.getStatusMessages(verificationState.status);
  
  const getStatusColor = () => {
    switch (verificationState.status) {
      case "success":
        return "from-green-500/60 via-green-400/20";
      case "expired":
        return "from-yellow-500/60 via-yellow-400/20";
      case "error":
        return "from-red-500/60 via-red-400/20";
      default:
        return "from-blue-500/60 via-blue-400/20";
    }
  };

  const getStatusIcon = () => {
    switch (verificationState.status) {
      case "success":
        return (
          <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case "expired":
        return (
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        );
      case "error":
        return (
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
          </div>
        );
    }
  };

  const getActionButtons = () => {
    switch (verificationState.status) {
      case "success":
        return (
          <div className="space-y-3">
            <Link 
              href="/login" 
              className="inline-block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-md transition-all duration-200 text-center"
            >
              Go to Login
            </Link>
            <p className="text-sm text-gray-400">You will be redirected automatically in a few seconds...</p>
          </div>
        );
        
      case "expired":
        return (
          <div className="space-y-3">
            <Link 
              href="/register" 
              className="inline-block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-md transition-all duration-200 text-center"
            >
              Register New Account
            </Link>
            <p className="text-sm text-gray-400">You will be redirected automatically in a few seconds...</p>
          </div>
        );
        
      case "error":
        return (
          <div className="space-y-3">
            <Link 
              href="/register" 
              className="inline-block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-md transition-all duration-200 text-center"
            >
              Register Again
            </Link>
            <Link 
              href="/login" 
              className="inline-block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2.5 px-6 rounded-md transition-all duration-200 text-center"
            >
              Try Login
            </Link>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0b1221] text-white">
      <BackgroundReel />

      <div className={`relative z-10 w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-b ${getStatusColor()} to-transparent`}>
        <div className="bg-[#1b2235]/85 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/60 p-8">
          <div className="text-center">
            {getStatusIcon()}
            
            <h1 className="text-2xl font-semibold mb-2">
              {statusMessages.title}
            </h1>
            
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              {verificationState.message || statusMessages.description}
            </p>

            {getActionButtons()}

            {verificationState.status !== "loading" && (
              <div className="mt-6 pt-4 border-t border-gray-700/60">
                <p className="text-xs text-gray-400">
                  Need help?{" "}
                  <Link href="/contact" className="text-blue-300 hover:text-blue-200 underline">
                    Contact Support
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}