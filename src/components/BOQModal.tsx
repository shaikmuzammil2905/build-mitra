import React, { useEffect } from 'react';
import { X, FileSpreadsheet, Download, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';

export interface BOQItem {
  id: string;
  item: string;
  quantity: number;
  unit: string;
  rate: number;
  total: number;
}

interface BOQModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: BOQItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export const BOQModal: React.FC<BOQModalProps> = ({ isOpen, onClose, items, onRemoveItem, onClearAll }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, it) => sum + it.total, 0);
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  // Real CSV export
  const downloadCSV = () => {
    const headers = ['Item Description', 'Quantity', 'Unit', 'Rate (INR)', 'Total Amount (INR)'];
    const rows = items.map(it => [
      `"${it.item.replace(/"/g, '""')}"`,
      it.quantity,
      it.unit,
      it.rate,
      it.total
    ]);
    rows.push(['"Subtotal"', '', '', '', subtotal]);
    rows.push(['"GST (18%)"', '', '', '', gst]);
    rows.push(['"Grand Total Landed Cost"', '', '', '', grandTotal]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BuildMitra_BOQ_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Real printable PDF / print sheet
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl z-10 border border-slate-100 flex flex-col max-h-[90vh] animate-scale-in">
        
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  IS 1200 Compliant
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Dynamic Project Estimation
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-bm-navy">
                Project Bill of Quantities (BOQ)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs font-bold text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 rounded-full bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <FileSpreadsheet className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-700">Your Project BOQ is Empty</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Use any of our 19 engineering calculators (Concrete, Steel, Tiles, Masonry, Paint) and click <strong className="text-slate-800">"Add to Dynamic BOQ"</strong> to build an instant bill.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Line Item Description</th>
                      <th className="py-3 px-4 text-center">Quantity</th>
                      <th className="py-3 px-4 text-center">Unit</th>
                      <th className="py-3 px-4 text-right">Unit Rate (₹)</th>
                      <th className="py-3 px-4 text-right">Total Amount (₹)</th>
                      <th className="py-3 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((it) => (
                      <tr key={it.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900">{it.item}</td>
                        <td className="py-3 px-4 text-center font-mono">{it.quantity}</td>
                        <td className="py-3 px-4 text-center text-slate-500">{it.unit}</td>
                        <td className="py-3 px-4 text-right font-mono">₹ {it.rate.toLocaleString('en-IN')}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                          ₹ {it.total.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => onRemoveItem(it.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Summary Breakdown */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Standardized Rates Based on Active Yard Benchmarks</span>
                  </div>
                  <div>Rates exclude transport freight to unpaved sites and municipal offloading permits.</div>
                </div>

                <div className="w-full sm:w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Materials Subtotal:</span>
                    <span className="font-mono font-bold text-slate-900">₹ {subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Applicable GST (18%):</span>
                    <span className="font-mono font-bold text-slate-900">₹ {gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-bm-navy pt-2 border-t border-slate-200">
                    <span>Grand Total:</span>
                    <span className="font-mono text-blue-700">₹ {grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer with Real Export Buttons */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>

          {items.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={downloadCSV}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Export Excel / CSV</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
