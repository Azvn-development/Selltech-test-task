import { InputProps } from '@/data/types/InputProps';
import { TextField } from '@mui/material';
import React from 'react';

type Props<TData extends object> = InputProps<TData>;

const CustomTextField = <TData extends object>({ 
    id, 
    label, 
    value, 
    onChange,
    errors
}:Props<TData>):React.ReactElement => {
    return (
        <TextField
            id={id as string}
            label={label}
            variant={'outlined'}
            value={value}
            onChange={(e) => onChange(id, e.target.value)}
            error={Boolean(errors.find(error => error.includes(id as string)))}
        />
    )
}

export default CustomTextField;