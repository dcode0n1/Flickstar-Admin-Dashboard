import React, { forwardRef } from 'react';

interface InputProps {
    icon?: JSX.Element;
    type?: string;
    placeholder?: string;
    name?: string;
    options?: { value: any; text: string, selected?: boolean }[] | undefined;
    inputBoxValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    labelValue?: string
    labelValueDir?: string
    selectDisabled?: boolean
}

const CusInput = forwardRef<HTMLInputElement, InputProps>(
    ({ icon, placeholder, type = "text", options, name, onChange, inputBoxValue, labelValue, selectDisabled, labelValueDir='left' }, ref) => {
        return (
            <div className="relative flex items-center w-full h-9 bg-white border rounded-sm focus-within:ring-1 focus-within:ring-purple-700">
                {icon && <span className="mr-2">{icon}</span>}
                {type === "select" && options ? (
                    <select
                        ref={ref as React.Ref<HTMLSelectElement>} // Forward the ref to the select element
                        name={name}
                        className="w-full px-2 py-1 text-sm text-gray-700 placeholder-gray-500 bg-transparent border-none focus:outline-none"
                        onChange={onChange}
                        disabled={selectDisabled}
                    >
                        <option value="">{placeholder}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value} selected={option.selected}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                ) : labelValue ? (
                    <div className='w-full flex'>
                        {labelValueDir === 'left' ? (
                            <div className='bg-gray-100 px-2 py-1 text-sm border-l p-2 h-9 text-nowrap items-center justify-center flex'>
                                <span>
                                    {labelValue}
                                </span>
                            </div>
                        ) : null}
                        <input
                            ref={ref} // Forward the ref to the input element
                            type={type}
                            name={name}
                            className="w-full px-2 py-1 text-sm text-gray-700 placeholder-gray-500 bg-transparent border-none focus:outline-none"
                            value={inputBoxValue}
                            placeholder={placeholder}
                            onChange={onChange}
                        />
                        {labelValueDir === 'right' ? (
                            <div className='bg-gray-100 px-2 py-1 text-sm border-l p-2 h-9 text-nowrap items-center justify-center flex'>
                                <span>
                                    {labelValue}
                                </span>
                            </div>
                        ) : null
                        }
                    </div>
                ) : (
                    <input
                        ref={ref} // Forward the ref to the input element
                        type={type}
                        name={name}
                        className="w-full px-2 py-1 text-sm text-gray-700 placeholder-gray-500 bg-transparent border-none focus:outline-none"
                        value={inputBoxValue}
                        placeholder={placeholder}
                        onChange={onChange}
                    />
                )}
            </div>
        );
    }
);

CusInput.displayName = "CusInput"; // Helps for debugging

export default CusInput;
