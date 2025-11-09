import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-6 max-w-md">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="text-red-500" size={24} />
          <h3 className="text-lg font-semibold text-white">Error</h3>
        </div>
        <p className="text-gray-300">{message}</p>
      </div>
    </div>
  );
}
