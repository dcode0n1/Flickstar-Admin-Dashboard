import { RiDiscLine } from "@/components/icons/RiDiscLine";
import { RiProductHuntFill } from "@/components/icons/RiProductHuntFill";
import { RiAirplayLine } from "@/components/icons/RiAirplayLine";
import { RiMoneyDollarCircleFill } from "@/components/icons/RiMoneyDollarCircleFill";
import { RiFlightLandLine } from "@/components/icons/RiFlightLandLine";
import { RiRefreshLine } from "@/components/icons/RiRefreshLine";
import { RiShip2Line } from "@/components/icons/RiShip2Line";
import { RiCheckDoubleLine } from "@/components/icons/RiCheckDoubleLine";
import { CardProps } from "@/components/DataCard";


export const shopAnalyticsCardData :CardProps[]= [
    {
        value: "32",
        title: "Total Products",
        link: "/product/manage-product/seller-product",
        imageComponent: <RiProductHuntFill />,
    },
    {
        value: "6",
        title: "Digital Products",
        link: "/product/manage-product/digital-product/seller-product",
        imageComponent: <RiDiscLine />,
    },
    {
        value: "54",
        title: "Digital Orders",
        link: "/product/manage-order/digital-order/seller-order",
        imageComponent: <RiAirplayLine />,
    },
    {
        value: "0",
        title: "Withdraws Amount",
        link: "/report/reports/withdraw",
        imageComponent: <RiMoneyDollarCircleFill />,
    },
    {
        value: "329",
        title: "Placed Orders",
        link: "/product/manage-order/seller-order?q=placed",
        imageComponent: <RiFlightLandLine />,
    },
    {
        value: "28",
        title: "Processing Orders",
        link: "/product/manage-order/seller-order?q=processing",
        imageComponent: <RiRefreshLine />,
    },
    {
        value: "2",
        title: "Shipped Orders",
        link: "/product/manage-order/seller-order?q=shipped",
        imageComponent: <RiShip2Line />,
    },
    {
        value: "5",
        title: "Delivered Orders",
        link: "/product/manage-order/seller-order?q=delivered",
        imageComponent: <RiCheckDoubleLine />,
    },
];