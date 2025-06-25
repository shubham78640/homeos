import React from "react";

const PreviewModal = ({ isOpen, onClose, fileUrl }) => {
  if (!isOpen) return null;

   const isPDF = fileUrl?.toLowerCase().includes(".pdf");

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-2">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 max-w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-end mb-2">
          <button
            className="text-red-600 hover:text-red-800 dark:text-red-400"
            onClick={onClose}
          >
            ✕ Close
          </button>
        </div>
        {isPDF ? (
          <iframe
            src={fileUrl}
            title="PDF Preview"
            className="w-[90vw] h-[70vh] rounded border"
          />
        ) : (
          <img
            src={fileUrl}
            alt="Preview"
            className="max-w-full max-h-[70vh] rounded object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default PreviewModal;
