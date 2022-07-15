import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { InputProps } from '@/data/types/InputProps';

type Props<TData extends object> = {
    options: (string | number)[];
} & InputProps<TData>;

const CustomSelect = <TData extends object>({ 
    id, 
    label, 
    value, 
    onChange, 
    options,
    errors
}:Props<TData>):React.ReactElement => {
    return (
        <FormControl>
            <InputLabel id={`${id as string}-label`}>Entity</InputLabel>
            <Select
                id={id as string}
                labelId={`${id as string}-label`}
                label={label}
                value={value}
                onChange={(event) => onChange(id, event.target.value)}
                error={Boolean(errors.find(error => error.includes(id as string)))}
            >
                {options.map((option, idx) => (
                    <MenuItem key={idx} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default CustomSelect;