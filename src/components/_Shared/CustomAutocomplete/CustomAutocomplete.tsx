import React from 'react';
import { InputProps } from '@/data/types/InputProps';
import { Autocomplete, TextField } from '@mui/material';
import AutocompletePaper from './modules/AutocompletePaper/AutocompletePaper';
import { useCustomAutocompleteOpenHandler } from './hooks/useCustomAutocompleteOpenHandler';
import VirtualizedList from './modules/VirtualizedList/VirtualizedList';
import { useCustomAutocompleteAddItemSubmitHandler } from './hooks/useCustomAutocompleteAddItemSubmitHandler';
import { useCustomAutocompleteOptions } from './hooks/useCustomAutocompleteOptions';
import { useCustomAutocompleteReset } from './hooks/useCustomAutocompleteReset';
import { OptionType } from '@/data/types/OptionType';
import { useCustomAutocompleteLazyLoad } from './hooks/useCustomAutocompleteLazyLoad';
import { DocumentNode } from 'graphql';
import { DataKey } from '@/api/DataKey';

type Props<TData extends object> = {
    needAddItem?: boolean;
    options: OptionType[];
    lazyLoadData?: {
        dataKey: DataKey,
        query: DocumentNode,
    }
} & InputProps<TData>;

const CustomAutocomplete = <TData extends object>({
    id,
    options,
    errors,
    label,
    value,
    onChange,
    needAddItem = false,
    lazyLoadData
} :Props<TData>):React.ReactElement | null => {
    const { 
        autocompleteOptions,
        setAutocompleteOptions,
        addAutocompleteOption,
    } = useCustomAutocompleteOptions(id, onChange, options);
    const { needReset, reset } = useCustomAutocompleteReset();
    const { isOpen, open, close } = useCustomAutocompleteOpenHandler(id, autocompleteOptions, reset);
    const { handleAddItemSubmit } = useCustomAutocompleteAddItemSubmitHandler(addAutocompleteOption, close);
    const lazyLoadInfo = useCustomAutocompleteLazyLoad(setAutocompleteOptions, lazyLoadData?.dataKey, lazyLoadData?.query);

    return (
        <Autocomplete
            id={id as string}
            key={Number(needReset)}
            open={isOpen}
            loading={lazyLoadInfo?.loading}
            onOpen={open}
            onClose={close}
            onInputChange={(_e, value, reason) => {
                if(lazyLoadInfo && value.length && reason === 'input') {
                    lazyLoadInfo.execFunction({
                        variables: {
                            where: {
                                column: 'NAME',
                                operator: 'LIKE',
                                value: value
                            }
                        }
                    })
                } // if
            }}
            clearOnBlur={false}
            value={value ? value as string : null}
            onChange={(_e, value) => onChange(id, value ?? '')}
            PaperComponent={(props) => AutocompletePaper(props, { id: id as string, label, needAddItem, handleAddItemSubmit })}
            ListboxComponent={VirtualizedList}
            options={autocompleteOptions}
            noOptionsText={'There are no options. Please start typing text.'}
            renderOption={(props, option) => [props, option] as React.ReactNode}
            renderInput={(props) => (
                <TextField
                    { ...props }
                    label={label}
                    error={Boolean(errors.find(error => error.includes(id as string)))}
                />
            )}
            disablePortal
        />
    )
}

export default CustomAutocomplete;