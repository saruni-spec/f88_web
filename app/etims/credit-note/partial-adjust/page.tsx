'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Card, Button } from '../../_components/Layout';
import { getCreditNote, saveCreditNote, CreditNoteData, calculateTotals } from '../../_lib/store';
import { Minus, Plus, Send, ArrowLeft, RefreshCw } from 'lucide-react';

export default function CreditNotePartialAdjust() {
  const router = useRouter();
  const [creditNote, setCreditNote] = useState<CreditNoteData | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getCreditNote();
    if (!saved || !saved.invoice || saved.type !== 'partial' || !saved.items) {
      router.push('/etims/credit-note/search');
      return;
    }
    setCreditNote(saved);
    
    // Initialize quantities
    const initialQuantities: Record<string, number> = {};
    saved.items.forEach(({ item }) => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [router]);

  const updateQuantity = (itemId: string, delta: number) => {
    const maxQty = creditNote?.items?.find(i => i.item.id === itemId)?.item.quantity || 0;
    const currentQty = quantities[itemId] || 0;
    const newQty = Math.min(Math.max(1, currentQty + delta), maxQty);
    setQuantities({
      ...quantities,
      [itemId]: newQty,
    });
  };

  const setQuantityDirect = (itemId: string, value: string) => {
    const numValue = parseInt(value) || 1;
    const maxQty = creditNote?.items?.find(i => i.item.id === itemId)?.item.quantity || 0;
    setQuantities({
      ...quantities,
      [itemId]: Math.min(Math.max(1, numValue), maxQty),
    });
  };

  const handleSubmit = () => {
    const updatedItems = creditNote!.items!.map(({ item }) => ({
      item,
      quantity: quantities[item.id] || 0,
    })).filter(({ quantity }) => quantity > 0);

    saveCreditNote({ items: updatedItems });
    router.push('/etims/credit-note/review');
  };

  if (!mounted || !creditNote?.items) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  // Calculate totals
  const creditItems = creditNote.items.map(({ item }) => ({
    ...item,
    quantity: quantities[item.id] || 0,
  })).filter(item => item.quantity > 0);

  const totals = calculateTotals(creditItems);

  return (
    <Layout 
      title=""
      showHeader={false}
      onBack={() => router.push('/etims/credit-note/partial-select')}
    >
      <div className="space-y-4">
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-center">
          <h1 className="text-xl font-bold text-white mb-1">Edit Credit Note</h1>
          <p className="text-blue-100 text-sm">Adjust quantities for selected items</p>
        </div>

        {/* Items to Edit */}
        <div className="space-y-4">
          {creditNote.items.map(({ item }, index) => {
            const maxQty = item.quantity;
            const currentQty = quantities[item.id] || 0;
            
            return (
              <Card key={item.id}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-gray-900 font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">KES {item.unitPrice.toLocaleString()} per unit</p>
                  </div>
                  <span className="text-xs text-gray-400">Item {index + 1}</span>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">Adjust Quantity</p>
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mb-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={currentQty <= 1}
                    className="w-12 h-12 border-2 border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      value={currentQty}
                      onChange={(e) => setQuantityDirect(item.id, e.target.value)}
                      min={1}
                      max={maxQty}
                      className="w-full text-center py-3 border-2 border-gray-200 rounded-lg text-lg font-medium focus:outline-none focus:border-blue-500"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    disabled={currentQty >= maxQty}
                    className="w-12 h-12 border-2 border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Min: 1</span>
                  <span>Max: {maxQty}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Credit Note Summary */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 text-white">
          <p className="text-gray-400 text-sm mb-1">Credit Note Summary</p>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-medium">Total Credit Amount</p>
            <p className="text-2xl font-bold">KES {totals.total.toLocaleString()}</p>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{creditItems.length} item{creditItems.length !== 1 ? 's' : ''}</span>
            <span>Invoice: {creditNote.invoice?.invoiceNumber}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:from-blue-900 hover:to-gray-900 transition-colors"
        >
          <Send className="w-4 h-4" />
          Submit Credit Note
        </button>

        {/* Back Button */}
        <button
          onClick={() => router.push('/etims/credit-note/partial-select')}
          className="w-full py-4 border-2 border-gray-200 rounded-full text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Details
        </button>
      </div>
    </Layout>
  );
}
