"use client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  isSubmitting: boolean;
  children?: React.ReactNode;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  isSubmitting,
  children,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 mb-6 whitespace-pre-wrap">{message}</p>
        <div className="max-h-[60vh] overflow-y-auto">{children}</div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 disabled:opacity-50"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            {isSubmitting ? "処理中..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
