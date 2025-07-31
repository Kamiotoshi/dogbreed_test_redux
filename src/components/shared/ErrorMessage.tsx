// components/ErrorMessage.tsx
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ErrorMessageProps } from '../../types';

const ErrorMessage: React.FC<ErrorMessageProps> = ({
                                                       message,
                                                       onRetry,
                                                       className = ''
                                                   }) => (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-2 text-red-700">
            <AlertCircle size={20} />
            <span className="font-medium">Error</span>
        </div>
        <p className="text-red-600 mt-2">{message}</p>
        {onRetry && (
            <button
                onClick={onRetry}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
                Try Again
            </button>
        )}
    </div>
);

export default ErrorMessage;