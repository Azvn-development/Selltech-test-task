import { OptionType } from '@/data/types/OptionType';
import { useCallback, useState } from 'react'

export const useCustomAutocompleteOptions = <TData>(
    id: keyof TData,
    onChange: (field: keyof TData, value: string | number) => void,
    options: OptionType[]
) => {
    const [autocompleteOptions, setAutocompleteOptions] = useState(options.map(o => o.name));

    const addAutocompleteOption = useCallback((option: string) => {
        setAutocompleteOptions(prev => [ ...prev, option ]);
        onChange(id, option);
    }, [setAutocompleteOptions, onChange]);

    return {
        autocompleteOptions,
        setAutocompleteOptions,
        addAutocompleteOption,
    }
}