"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Tooltip from "@/components/ToolTip";
import CardWrapper from "./Card";
import { cn } from "@/utils/utils";
import { FaSignIn } from "./icons/FaSignIn";
import { Store, Trash2, List, Star, Languages, LanguagesIcon } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { RiDeleteBinLine } from "./icons/RiDeleteBinLine";
import { RiPencilFill } from "./icons/RiPencilFill";
import { StarFilledIcon } from "@radix-ui/react-icons";
const NotFound = dynamic(() => import("./TableNoData/noDataFound"), { ssr: false });

export interface TablesProps {
    headings: { display: string; key: string }[];
    data: Array<{ [key: string]: any }>;
    tableName?: string;
    cardClassName?: string;
    tableHeaderClassName?: string;
    tableCellClassName?: string;
    wrapped?: Boolean;
    viewBtn?: Boolean;
    toggler?: Boolean;
    fnDelete?: (deleteId: string) => void;
}

export default function TableResuse({
    data,
    headings,
    tableName = "",
    wrapped = false,
    cardClassName,
    tableHeaderClassName,
    tableCellClassName,
    viewBtn = true,
    toggler = false,
    fnDelete,
}: TablesProps) {
    const tableContent = (
        <div className="overflow-x-auto grid grid-cols-1">
        <Table>
            <TableHeader>
                <TableRow>
                    {headings.map((heading, index) => (
                        <TableHead key={index} className={`text-xs font-semibold ${tableHeaderClassName} text-gray-600`}>
                            {heading.display}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={headings.length} className="text-center py-6">
                        <NotFound />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </div>
    );

    return wrapped ? (
        <CardWrapper name={tableName} className={cardClassName} viewBtn={viewBtn}>
            {tableContent}
        </CardWrapper>
    ) : (
        tableContent
    );
}
