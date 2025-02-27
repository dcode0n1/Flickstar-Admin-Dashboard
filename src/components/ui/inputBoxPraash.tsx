import { cn } from '@/utils/utils';
import React from 'react';


interface SearchInput {
    text: string;
    bgColor: string;
    parentClassName?: string;
    inputClassName?: string;
}
export default function InputBoxPraash({ text, bgColor, parentClassName, inputClassName }: SearchInput) {
    const SearchInputStyle = {
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'gray\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\' class=\'feather feather-search\'%3E%3Ccircle cx=\'11\' cy=\'11\' r=\'8\'/%3E%3Cline x1=\'21\' y1=\'21\' x2=\'16.65\' y2=\'16.65\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '5px 50%',
        backgroundSize: '20px 20px',
        backgroundColor: bgColor,
        border: '1px solid #e6e6e6',
    };
    return (
        <div className={cn("relative", parentClassName)}>
            <input
                type="text"
                style={SearchInputStyle}
                className={cn("w-full", inputClassName)}
                placeholder={text}
            />
        </div>
    );
};

