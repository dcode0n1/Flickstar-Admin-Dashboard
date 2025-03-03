
import { LayoutDashboard, Bot, CircleParking, UserCog, Warehouse, BriefcaseConveyorBelt, Headset, FileText, Earth, Images, Volume1, Settings, ShieldCheck, RefreshCw, SlidersVertical, Info, Clapperboard, Disc2, FileAudio, MessageSquareMore, FilmIcon, HandCoinsIcon, Users2 } from "lucide-react";

export const data = {
    navMenu: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
        },
        {
            title: "Access Control",
            url: "#",
            icon: UserCog,
            items: [
                {
                    title: "Staffs",
                    url: "/staff/list",
                },
                {
                    title: "Roles",
                    url: "/role/list",
                },
            ],
        },
        {
            title: "Users",
            url: "/users/list",
            icon: Users2,
        },
    ],
    media: [
        {
            title: "Flick",
            url: "/media-control/flick/list",
            icon: Clapperboard,
        },
        {
            title: "Quest",
            url: "#",
            icon: HandCoinsIcon,
            items: [
                {
                    title: "Quests",
                    url: "/media-control/quest/list",
                },
                {
                    title: "Quest Applicants",
                    url: "/media-control/quest-applicant/list",
                },
            ],
        },
        {
            title: "Story",
            url: "/media-control/story/list",
            icon: FilmIcon
        },
        {
            title: "Song",
            url: "/media-control/song/list",
            icon: Disc2,
        },
        {
            title: "Audio",
            url: "/media-control/audio/list",
            icon: FileAudio,
        },
        {
            title: "Comment",
            url: "/media-control/comment/list",
            icon: MessageSquareMore,
        }
    ],
    navReport: [
        {
            title: "Feedbacks",
            url: "/feedback/list",
            icon: Headset,
        },
        {
            title: "Reports",
            url: "#",
            icon: FileText,
            items: [
                {
                    title: "User",
                    url: "/report/user/list",
                },
                {
                    title: "Flick",
                    url: "/report/flick/list",
                },
                {
                    title: "Quest",
                    url: "/report/quest/list",
                },
                {
                    title: "Story",
                    url: "/report/story/list",
                },
                {
                    title: "Comment",
                    url: "/report/comment/list",
                },
                {
                    title: "Audio",
                    url: "/report/audio/list",
                },
                
            ]
        }
    ],
    navSystemSettings: [
        {
            title: "Setup & Configuration",
            url: "#",
            icon: Settings,
            items: [
                {
                    title: "System Setting",
                    url: "/setting/setup/system-setting",
                },
                {
                    title: "Vendor KYC Settings",
                    url: "/setting/setup/vendor-kyc-setting",
                },
                {
                    title: "Customer APP Settings",
                    url: "/setting/setup/customer-app-setting",
                },
                {
                    title: "SEO",
                    url: "/setting/setup/seo",
                },
                {
                    title: "Languages",
                    url: "/setting/setup/language",
                },
                {
                    title: "Payment Methods",
                    url: "/setting/setup/payment-method/list",
                },
                {
                    title: "Withdrawal Methods",
                    url: "/setting/setup/withdrawal-method/list",
                },
                {
                    title: "Notification Templates",
                    url: "/setting/setup/notification-template/list",
                },
                {
                    title: "Email Configuration",
                    url: "#",
                    items: [
                        {
                            title: "Mail Gateway",
                            url: "/setting/setup/email-configuration/mail-gateway",
                        },
                        {
                            title: "Global Template",
                            url: "/setting/setup/email-configuration/global-template",
                        },
                    ]
                },
                {
                    title: "SMS Configuration",
                    url: "#",
                    items: [
                        {
                            title: "SMS Gateway",
                            url: "/setting/setup/sms-configuration/sms-gateway",
                        },
                        {
                            title: "Global Template",
                            url: "/setting/setup/sms-configuration/global-template",
                        },
                    ]
                },
                {
                    title: "Shipping",
                    url: "#",
                    items: [
                        {
                            title: "Configuration",
                            url: "/setting/setup/shipping/configuration",
                        },
                        {
                            title: "Shipping Country",
                            url: "/setting/setup/shipping/country",
                        },
                        {
                            title: "Shipping State",
                            url: "/setting/setup/shipping/state",
                        },
                        {
                            title: "Shipping Cities",
                            url: "/setting/setup/shipping/cities",
                        },
                        {
                            title: "Shipping Zone",
                            url: "/setting/setup/shipping/zone",
                        },
                        {
                            title: "Shipping Delivery",
                            url: "/setting/setup/shipping/delivery/list",
                        },
                    ]
                },
                {
                    title: "Currencies",
                    url: "/setting/setup/currency",
                },
            ]
        },
        {
            title: "AI Configuration",
            url: "/setting/ai-config",
            icon: Bot
        },
        {
            title: "Security Settings",
            url: "#",
            icon: ShieldCheck,
            items: [
                {
                    title: "Visitors",
                    url: "/setting/security/visitor",
                },
                {
                    title: "DOS Security",
                    url: "/setting/security/dos-security",
                },
            ]
        },
        {
            title: "System Upgrade",
            url: "/setting/upgrade",
            icon: RefreshCw
        },
        {
            title: "Addon Manager",
            url: "/setting/add-on",
            icon: SlidersVertical
        },
        {
            title: "System Information",
            url: "/setting/information",
            icon: Info
        },
    ],

}


