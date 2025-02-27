import { cn } from "@/utils/utils";

interface CardProps {
    tableName: string;
    children: React.ReactNode;
    viewBtn?: Boolean
    className?: string;
}

export default function CardWrapper({ tableName, viewBtn = true, className, children }: CardProps) {
    return (<div className={cn("bg-white rounded-sm ", className)}>
        <div className="flex justify-between align-center text-black-500 border-b border-dashed font-semibold">
            <span className="p-4">
                {tableName}
            </span>
            {viewBtn && < button className="text-blue-500 p-4 underline font-normal">View All</button>}
        </div>
        {children}
    </div >)
}