import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import CusInput from "../CustomInput"
import { useForm } from "react-hook-form"
import { cn } from "@/utils/utils"

interface ModalBoxProps {
    modalBoxTitle?: string;
    modalBoxData?: FieldDataProps[];
    modalBtnText?: string;
    onClick?: () => void;
    onSubmit?: (data: unknown, isEdit: boolean) => void;
    initialData?: Record<string, any>;
    isEdit?: boolean;
    triggerButton?: React.ReactNode;
    fetchData?: () => Promise<any>;
    itemId?: string;
    className?: string;
}

export interface FieldDataProps {
    label: string;
    required: boolean;
    type: string;
    id?: string;
    labelBoxValue?: string;
    labelBoxDir?: string;
    options?: { value: any; text: string }[];
    validation?: {
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
        min?: number;
        max?: number;
    };
}

export function ModalBox({
    modalBtnText,
    onClick,
    modalBoxTitle,
    modalBoxData,
    onSubmit,
    initialData,
    isEdit = false,
    triggerButton,
    fetchData,
    itemId,
    className,
}: ModalBoxProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentItemId, setCurrentItemId] = useState<string | undefined>(itemId);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    // Handle both immediate data and fetched data
    useEffect(() => {
        const loadData = async () => {
            if (!open) return;
            // Set the ID if it exists
            if (itemId) {
                setCurrentItemId(itemId);
            }
            // Case 1: We have initialData directly
            if (initialData) {
                Object.entries(initialData).forEach(([key, value]) => {
                    setValue(key, value);
                });
                if (initialData._id) {
                    setCurrentItemId(initialData._id);
                }
                return;
            }

            // Case 2: We need to fetch data
            if (fetchData && isEdit) {
                try {
                    setIsLoading(true);
                    const data = await fetchData();
                    Object.entries(data).forEach(([key, value]) => {
                        setValue(key, value);
                    });
                    if (data._id) {
                        setCurrentItemId(data._id);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadData();
    }, [open, initialData, fetchData, isEdit, setValue, itemId]);

    const onSubmitForm = async (data: any) => {
        try {
            setIsLoading(true);
            // Include the ID in the submitted data
            const submissionData = {
                ...data,
                _id: currentItemId
            };
            await onSubmit?.(submissionData, isEdit);
            setOpen(false);
            reset();
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Reset form and ID when modal closes
    useEffect(() => {
        if (!open) {
            reset();
            if (!itemId) {
                setCurrentItemId(undefined);
            }
        }
    }, [open, reset, itemId]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerButton ? (
                    triggerButton
                ) : (
                    <button className={cn("relative inline-flex items-center px-2 py-2 text-white bg-green-500 rounded-sm shadow-sm text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-green-600 focus:outline-none" , className )}>
                        {isEdit ? (
                            <Pencil size={18} />
                        ) : (
                            <Plus size={18} />
                        )}
                        {modalBtnText}
                    </button>
                )}
            </DialogTrigger>
            <DialogContent className="w-full bg-white">
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <DialogHeader className="w-full">
                        <DialogTitle className="mb-4">
                            {isEdit ? `Edit ${modalBoxTitle}` : modalBoxTitle}
                        </DialogTitle>
                    </DialogHeader>
                    {/* Hidden input for ID */}
                    <input
                        type="hidden"
                        {...register('_id')}
                        value={currentItemId}
                    />

                    {isLoading ? (
                        <div className="flex justify-center items-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin text-green-500" />
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {modalBoxData && modalBoxData.map((field: FieldDataProps) => (
                                <div key={field.id || field.label} className="space-y-1">
                                    <label htmlFor={field.id} className="text-gray-700 capitalize">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <CusInput
                                        type={field.type}
                                        {...register(field.id || field.label, {
                                            required: field.required ? `${field.label} is required.` : false,
                                            ...field.validation
                                        })}
                                        labelValue={field.labelBoxValue}
                                        labelValueDir={field.labelBoxDir || 'right'}
                                        options={field.options}
                                    />
                                    {errors[field.id || field.label] && (
                                        <span className="text-red-500 text-xs">
                                            {errors[field.id || field.label]?.message as string}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}  
                    <DialogFooter className="mt-5">
                        <Button
                            type="button"
                            className="bg-rose-500 hover:bg-rose-700"
                            onClick={() => {
                                onClick?.();
                                setOpen(false);
                                reset();
                            }}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                            {isEdit ? 'Update' : 'Add'} 
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}