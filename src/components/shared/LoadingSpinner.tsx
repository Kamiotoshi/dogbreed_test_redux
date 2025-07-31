// components/LoadingSpinner.tsx
import React from 'react';
import { Loader } from 'lucide-react';
import { LoadingSpinnerProps } from '../../types';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                           size = 24,
                                                           color = 'text-blue-500',
                                                           className = ''
                                                       }) => (
    <div className={`flex items-center justify-center ${className}`}>
        <Loader size={size} className={`animate-spin ${color}`} />
    </div>
);

export default LoadingSpinner;