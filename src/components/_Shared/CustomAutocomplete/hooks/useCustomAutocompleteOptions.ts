import { OptionType } from '@/data/types/OptionType';
import { useCallback, useState } from 'react'

export const useCustomAutocompleteOptions = <TData>(
    id: keyof TData,
    onChange: (field: keyof TData, value: string | number) => void,
    options: OptionType[]
) => {
    const [autocompleteOptions, setAutocompleteOptions] = useState(options);

    const addAutocompleteOption = useCallback((option: string) => {
        if(!autocompleteOptions.find(o => o.name === option)) {
            setAutocompleteOptions(prev => [ ...prev, { id: 0, name: option, isCustom: true } ]);
        } // if

        onChange(id, option);
    }, [autocompleteOptions, setAutocompleteOptions, onChange]);

    return {
        autocompleteOptions,
        setAutocompleteOptions,
        addAutocompleteOption,
    }
}