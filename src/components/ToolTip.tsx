import { cn } from "@/utils/utils";

interface TooltipProps {
    message: string;
    children: React.ReactNode;
    className?: string;
    direction?: 'top' | 'bottom';
}

export default function Tooltip({ message, children, className, direction = 'top' }: TooltipProps) {
    const tooltipPositionClass = direction === 'top'
        ? "bottom-1/2 mb-1"
        : "top-1/2 mt-1";

    return (
        <div className={cn("group relative flex max-w-max flex-col items-center justify-center z-1 hover:cursor-default", className)}>
            {children}
            <div className={cn("absolute p-3 left-1/2 -translate-x-1/2 scale-0 transform transition-all duration-300 group-hover:scale-100", tooltipPositionClass)}>
                <div className="flex flex-col items-center">
                    <div className={direction === 'bottom' ? "order-2" : ""}>
                        <div className="rounded bg-gray-600 p-2 text-center text-xs text-white font-light shadow-lg whitespace-nowrap">
                            {message}
                        </div>
                    </div>
                    <div className={cn("h-2 w-2 bg-gray-600", {
                        "clip-top": direction === 'top',
                        "clip-bottom order-1": direction === 'bottom'
                    })}></div>
                </div>
            </div>
        </div>
    );
}