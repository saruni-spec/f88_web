'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Menu, Home, LogOut, Headphones } from 'lucide-react';


interface LayoutProps {
  children: ReactNode;
  title: string;
  step?: string;
  onBack?: () => void;
  showMenu?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  phone?: string;
}

/**
 * F88 Layout
 */
export function Layout({ children, title, step, onBack, showMenu = false, showHeader = true, showFooter = true, phone }: LayoutProps) {
  const router = useRouter();

  const handleMenuClick = () => {
    window.location.href = `https://webviewmenu.vercel.app?phone=${phone}`;
  };

  const handleLogout = async () => {
  
    handleMenuClick();
      
  };

  const handleConnectAgent = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const message = encodeURIComponent('Connect to agent');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

   const handleMainMenu = () => {
   window.location.href = `https://webviewmenu.vercel.app?phone=${phone}`;
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - KRA Dark Theme */}
      {showHeader && (
        <div className="bg-[var(--kra-black)] text-white sticky top-0 z-10 shadow-md">
          <div className="max-w-4xl mx-auto px-3 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h1 className="text-base font-medium">{title}</h1>
                {step && <p className="text-xs text-gray-400">{step}</p>}
              </div>
            </div>
            {showMenu && (
              <button
                onClick={handleMenuClick}
                className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Content - Compact padding */}
      <div className="flex-1 max-w-4xl mx-auto px-3 py-3 w-full">
        {children}
      </div>

      {/* Footer Navigation */}
      {showFooter && (
        <div className="bg-white border-t border-gray-200 sticky bottom-0 z-10">
          <div className="max-w-4xl mx-auto px-3 py-2">
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={handleMainMenu}
                className="flex flex-col items-center justify-center gap-0.5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium text-[10px]"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              <button 
                onClick={handleConnectAgent}
                className="flex flex-col items-center justify-center gap-0.5 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium text-[10px]"
              >
                <Headphones className="w-4 h-4" />
                Connect Agent
              </button>
              <button 
                onClick={handleLogout}
                className="flex flex-col items-center justify-center gap-0.5 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-700 font-medium text-[10px]"
              >
                <LogOut className="w-4 h-4" />
               Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
