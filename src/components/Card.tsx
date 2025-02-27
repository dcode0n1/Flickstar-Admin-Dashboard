"use client";
import { cn } from "@/utils/utils";
import { Plus } from "lucide-react";
import Link from 'next/link'
import { FieldDataProps, ModalBox } from "./check/modalBox";

interface CardProps {
    name: string;
    children: React.ReactNode;
    modalBtnText?: string;
    viewBtnLink?: string;
    viewBtn?: Boolean;
    className?: string;
    btnText?: React.ReactNode;
    btnLink?: string;
    icon?: JSX.Element;
    modalBoxTitle?: string;
    btnTrigger?: () => void;
    btnClassName?: string;
    btn2Text?: string;
    btn2Link?: string;
    modalBoxData?: FieldDataProps[];
    tableNameClassName?: string;
    onClickHandlerModal?: () => void;
}

export default function CardWrapper({ name, className, btnLink = "#", btnText, children, btnClassName, viewBtnLink = "#", viewBtn = false,  icon, tableNameClassName }: CardProps) {
    return (<div className={cn("bg-white  rounded-sm", className)}>
        <div className="flex justify-between flex-wrap items-center text-black-500 border-b border-dashed font-semibold">
            <span className={cn("p-4", tableNameClassName)}>
                {name}
            </span>
            <div className="flex flex-wrap items-center p-2">
                {viewBtn && (
                    <Link href={viewBtnLink} passHref>
                        <span className="text-blue-500 p-4 underline font-normal cursor-pointer">View All</span>
                    </Link>
                )}

                {btnText && (
                    <Link href={btnLink} passHref>
                        <span className={cn("relative inline-flex items-center px-2 py-1 text-white bg-green-500 rounded-sm shadow-sm text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-green-600 focus:outline-none", btnClassName)}>
                            <Plus className="w-4 mr-2" />
                            {btnText}
                        </span>
                    </Link>
                )}
            </div>
            {icon && <span className="mr-2">{icon}</span>}
        </div>
        {children}
    </div >)
}