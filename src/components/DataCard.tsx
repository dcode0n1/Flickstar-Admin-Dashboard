import React from 'react';
import Link from 'next/link';
import { MoveRight } from "lucide-react"
import { cn } from '@/utils/utils';
import { ReactElement, HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    title: string;
    link?: string;
    imageComponent: ReactElement;
    className?: string;
    key?: number;
}

export default function DataCard({ value, title, link, imageComponent, className , key}: CardProps) {
    return (
        <div className={cn("p-3 min-h-32 bg-white rounded-sm shadow-md transform transition-transform duration-500 ease-out hover:-translate-y-1 group ", className)} key={key}>
            <div className="flex items-start justify-between">
                <div className="my-auto px-5">
                    {imageComponent}
                </div>
                <div className="text-right text-slate-600">
                    <h4 className="text-2xl font-bold  font-secondary mb-2">{value}</h4>
                    <p className="uppercase font-semibold text-black-100 mb-3 text-wrap ">{title}</p>
                    {link && (<Link
                        href={link}
                        className="flex items-center justify-end gap-1  text-blue-600 hover:text-blue-800"
                    >
                        View All
                        <MoveRight size={15} />
                    </Link>)}

                </div>
            </div>
        </div>
    );
};

