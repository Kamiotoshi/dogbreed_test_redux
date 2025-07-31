// components/ConnectionStatus.tsx
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { ConnectionStatusProps } from '../../types';

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
                                                               isOnline,
                                                               className = ''
                                                           }) => (
    <div className={`flex items-center space-x-2 ${className}`}>
        {isOnline ? (
            <>
                <Wifi size={20} className="text-green-500" />
                <span className="text-green-600 font-medium">Online</span>
            </>
        ) : (
            <>
                <WifiOff size={20} className="text-red-500" />
                <span className="text-red-600 font-medium">Offline</span>
            </>
        )}
    </div>
);

export default ConnectionStatus;