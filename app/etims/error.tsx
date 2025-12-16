'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to console for debugging
    console.error('eTIMS Error:', error);
    console.error('Error digest:', error.digest);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
        {/* KRA Logo */}
        <div className="flex justify-center mb-4">
          <img src="/kra_logo.png" alt="KRA Logo" className="h-10 w-auto" />
        </div>

        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          We encountered an unexpected error. Please try again or go back to the home page.
        </p>

        {/* Error digest for debugging (hidden in UI but available in console) */}
        {error.digest && (
          <p className="text-xs text-gray-400 mb-4">
            Error ID: {error.digest}
          </p>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => reset()}
            className="w-full py-2.5 bg-[#C8102E] text-white rounded-lg text-sm font-medium hover:bg-[#a00d24] transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/etims')}
            className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
