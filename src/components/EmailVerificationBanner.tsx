import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function EmailVerificationBanner() {
  const { user, resendVerificationEmail } = useAuth();

  if (!user || user.emailVerified) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border-b border-yellow-200">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-yellow-700">
              Please verify your email address to access all features.
            </p>
          </div>
          <button
            onClick={resendVerificationEmail}
            className="ml-4 px-4 py-1 text-sm text-yellow-800 hover:text-yellow-900 underline"
          >
            Resend verification email
          </button>
        </div>
      </div>
    </div>
  );
}