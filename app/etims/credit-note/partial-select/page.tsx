'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Card, Button } from '../../_components/Layout';
import { getCreditNote, saveCreditNote, CreditNoteData } from '../../_lib/store';
import { FileText, Edit2, ArrowLeft } from 'lucide-react';

export default function CreditNotePartialSelect() {
  const router = useRouter();
  const [creditNote, setCreditNote] = useState<CreditNoteData | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getCreditNote();
    if (!saved || !saved.invoice || saved.type !== 'partial') {
      router.push('/etims/credit-note/search');
      return;
    }
    setCreditNote(saved);
  }, [router]);

  const toggleItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleEditItems = () => {
    if (selectedItems.size === 0) {
      alert('Please select at least one item');
      return;
    }

    const items = creditNote!.invoice!.items
      .filter(item => selectedItems.has(item.id))
      .map(item => ({ item, quantity: item.quantity }));

    saveCreditNote({ items });
    router.push('/etims/credit-note/partial-adjust');
  };

  if (!mounted || !creditNote?.invoice) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  const { invoice } = creditNote;

  return (
    <Layout 
      title=""
      showHeader={false}
      onBack={() => router.push('/etims/credit-note/search')}
    >
      <div className="space-y-4">
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Invoice Details</h1>
          <p className="text-blue-100 text-sm">Select items to include in credit note</p>
        </div>

        {/* Invoice Info Card */}
        <Card>
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-gray-500">invoice number</p>
              <p className="text-gray-900 font-medium">{invoice.invoiceNumber}</p>
            </div>
            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
              partial
            </span>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-500">invoice total amount</p>
            <p className="text-xl font-bold text-gray-900 flex items-center gap-1">
              <span className="text-sm">💳</span> KES {invoice.total.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">reason</p>
            <p className="text-blue-600 text-sm">{creditNote.reason || 'Not specified'}</p>
          </div>
        </Card>

        {/* Instruction */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <p className="text-sm text-blue-800">Tap items below to select for credit note</p>
        </div>

        {/* Items List */}
        <div className="space-y-3">
          {invoice.items.map((item) => {
            const isSelected = selectedItems.has(item.id);
            const itemTotal = item.unitPrice * item.quantity;
            
            return (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-white shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    {isSelected && <span className="text-white text-xs">✓</span>}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × KES {item.unitPrice.toLocaleString()} = KES {itemTotal.toLocaleString()}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Edit Selected Items Button */}
        <button
          onClick={handleEditItems}
          disabled={selectedItems.size === 0}
          className={`w-full py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-colors ${
            selectedItems.size > 0
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Edit2 className="w-4 h-4" />
          Edit Selected Items
        </button>

        {/* Go Back Button */}
        <button
          onClick={() => router.push('/etims/credit-note/search')}
          className="w-full py-4 border-2 border-gray-200 rounded-full text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </Layout>
  );
}
