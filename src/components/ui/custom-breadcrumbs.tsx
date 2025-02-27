import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";

import React from 'react'
interface CustomBreakCrumbProps {
    data: Array<{
        name: string;
        link?: string;
    }>;
}

export default function CustomBreadCrumb({ data }: CustomBreakCrumbProps) {
    const breadCrumbKey = data.map((item) => item.name).join("-");
    return (
        <Breadcrumb>
            <BreadcrumbList key={breadCrumbKey}>
                {data.map((item, index) => (
                    <React.Fragment key={breadCrumbKey + index}>
                        <BreadcrumbItem>
                            {index === data.length - 1 ? (
                                <span>{item.name}</span>
                            ) : (
                                <BreadcrumbLink href={item.link || "#"} className="text-black">{item.name}</BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {index < data.length - 1 && (
                            // Use a <span> for the separator instead of <li>
                            <span aria-hidden="true">
                                &gt;
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
