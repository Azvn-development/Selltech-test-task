import { useCallback } from 'react';

export const useCustomAutocompleteAddItemSubmitHandler = (
    addAutocompleteOption: (option: string) => void,
    closeAutocomplete: () => void,
) => {
    const handleAddItemSubmit = useCallback((value: string) => {
        addAutocompleteOption(value);
        closeAutocomplete();
    }, [addAutocompleteOption, closeAutocomplete])

    return {
        handleAddItemSubmit
    }
}