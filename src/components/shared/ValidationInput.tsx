// components/ValidationInput.tsx
import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { ValidationInputProps } from '../../types';

const ValidationInput: React.FC<ValidationInputProps> = ({
                                                             label,
                                                             value,
                                                             onChange,
                                                             validation,
                                                             placeholder,
                                                             type = 'text',
                                                             icon,
                                                             className = ''
                                                         }) => {
    const [error, setError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if (validation && touched) {
            setError(validation(value));
        }
    }, [value, validation, touched]);

    return (
        <div className={`flex flex-col space-y-2 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-gray-700">{label}</label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={() => setTouched(true)}
                    placeholder={placeholder}
                    className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        error ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
            </div>
            {error && touched && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                </p>
            )}
        </div>
    );
};

export default ValidationInput;