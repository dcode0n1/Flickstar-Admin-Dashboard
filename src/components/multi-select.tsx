import React, { forwardRef } from 'react';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, MultiValue } from 'react-select';

interface Option {
    label: string;
    value: string;
}

interface MultiSelectProps {
    options: Option[];
    value?: string[];
    onChange: (values: string[]) => void;
    name?: string;
}

const customStyles = {
    multiValue: (base: any) => ({
        ...base,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: '#9400ff',
        borderRadius: '5px',
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        borderLeft: '1px solid #ccc',
        borderColor: "white",
        color: 'white',
    }),
    multiValueRemove: (base: any) => ({
        ...base,
        color: 'white',
        padding: '2px 5px',
        ':hover': {
            backgroundColor: '#9400ff',
        },
    }),
    control: (base: any) => ({
        ...base,
        backgroundColor: 'white',
        borderColor: '#9400ff',
        color: 'white',
        '&:hover': {
            borderColor: '#9400ff',
            color: "white"
        },
    }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: 'white',
        color: 'white',
        borderRadius: '5px',
    }),
    option: (base: any, state: { isFocused: boolean; isSelected: boolean }) => ({
        ...base,
        backgroundColor: state.isFocused ? 'rgb(248 250 252)' : state.isSelected ? 'white' : 'white',
        color: state.isFocused || state.isSelected ? 'black' : 'black',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#9400ff',
            color: 'white'
        },
    }),
};

const MultiSelect = forwardRef<any, MultiSelectProps>(({
    options,
    onChange,
    value = [],
    name
}, ref) => {
    // Convert string array to option array for the select
    // Ensure we have an array to work with
    const arrayValue = Array.isArray(value) ? value : [];
    const selectValue = arrayValue.map(v => ({
        label: v,
        value: v
    }));

    const handleChange = (
        newValue: MultiValue<Option>,
    ) => {
        // Convert the readonly array to a mutable array and extract values
        const values = Array.from(newValue || []).map(option => option.value);
        onChange(values);
    };

    return (
        <CreatableSelect
            isMulti
            styles={customStyles}
            options={options}
            onChange={handleChange}
            value={selectValue}
            name={name}
            ref={ref}
        />
    );
});

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;