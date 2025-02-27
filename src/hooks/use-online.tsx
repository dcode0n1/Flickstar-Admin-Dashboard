import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { WifiOff } from 'lucide-react';
import useSWR from 'swr';

interface UseOnlineStatusProps {
    onOnline?: () => void;
    onOffline?: () => void;
    showToasts?: boolean;
}

export const useOnlineStatus = ({
    onOnline,
    onOffline,
    showToasts = true,
}: UseOnlineStatusProps = {}) => {
    const [isOnline, setIsOnline] = useState(
        typeof navigator !== 'undefined' ? navigator.onLine : true
    );

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            if (showToasts) {
                toast.success("Back online! Refreshing data...");
            }
            onOnline?.();
        };

        const handleOffline = () => {
            setIsOnline(false);
            if (showToasts) {
                toast.error("You're not connected to the internet", {
                    icon: <WifiOff className="w-4 h-4" />,
                });
            }
            onOffline?.();
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [onOnline, onOffline, showToasts]);

    const OfflineIndicator = () => {
        if (isOnline) return null;

        return (
            <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2">
                <WifiOff className="w-4 h-4" />
                <span>You are currently offline</span>
            </div>
        );
    };

    return {
        isOnline,
        OfflineIndicator,
    };
};

// Example usage with SWR:
export const useOnlineAwareSWR = (key: string | null, fetcher: any, options: any = {}) => {
    const { isOnline } = useOnlineStatus({
        showToasts: false, // Let the SWR handler manage toasts
    });

    const enhancedOptions = {
        ...options,
        onError: (err: any) => {
            if (!isOnline) {
                toast.error("You're not connected to the internet", {
                    icon: <WifiOff className="w-4 h-4" />,
                    duration: 4000,
                });
            } else {
                toast.error(options.errorMessage || "Failed to fetch data");
            }
            options.onError?.(err);
        },
        revalidateOnFocus: isOnline && (options.revalidateOnFocus ?? true),
        revalidateOnReconnect: isOnline && (options.revalidateOnReconnect ?? true),
        shouldRetryOnError: isOnline && (options.shouldRetryOnError ?? true),
    };

    return useSWR(isOnline ? key : null, fetcher, enhancedOptions);
};