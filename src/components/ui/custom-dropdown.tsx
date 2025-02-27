
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
interface DropdownMenu {
    title?: string;
    header?: string;
    icon?: React.ReactNode;
    dropDownList: Array<{
        title: string
    }>
}

export default function DropDownMenuBox({ header, icon, title, dropDownList }: DropdownMenu): React.ReactElement {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-full rounded-full hover:bg-purple-50 text-xs p-2.5 gap-0.5 " title={title}>{header}
                    {icon && icon}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup>
                    {dropDownList && dropDownList.map((item, index) => (
                        <DropdownMenuRadioItem key={index} value={item.title}>{item.title}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}