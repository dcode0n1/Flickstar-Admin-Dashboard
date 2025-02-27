import React from "react";
import CardWrapper from "./Card";

interface CardProps {
    children: React.ReactNode;
    boxName: string;
    className?: string;
}
interface Card {
    title: string;
    items?: Array<{
        imageUrl: string;
        title: string;
        timeAgo: string;
        count: number;
    }>
}

import Image from 'next/image';

export default function TopCategoryDashboard({ title, items }: Card) {
    return (
        <CardWrapper name={title} viewBtn={false}>
            <div className="card-body p-4 max-h-96 overflow-y-auto">
                <ul className="list-group space-y-4">
                    {items && items.map((item, index) => (
                        <li key={index} className="list-group-item flex items-center">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Image
                                        className="rounded-full"
                                        src={item.imageUrl}
                                        alt={item.title}
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <div className="ml-4">
                                    <p className="text-base font-semibold text-gray-800">{item.title}</p>
                                    <small className="text-gray-500">{item.timeAgo}</small>
                                </div>
                            </div>
                            <div className="ml-auto">
                                <p className="text-blue-500 font-semibold">{item.count}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </CardWrapper>
    );
}
