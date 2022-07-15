import { FocusEvent, SyntheticEvent } from 'react';
import { useCallback, useState } from 'react'
import { CustomAutocompleteItemId } from '../utils/CustomAutocompleteItemId';

export const useCustomAutocompleteOpenHandler = <TData>(
    id: keyof TData,
    options: string[],
    reset: () => void
) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => {
        setIsOpen(true);
    }, [])

    const close = useCallback((event?: SyntheticEvent<Element, Event>) => {
        if(event) {
            // Check add item button click
            const relatedTarget = (event as FocusEvent).relatedTarget;
            if(relatedTarget?.id === CustomAutocompleteItemId.AddItemButton || relatedTarget?.id === CustomAutocompleteItemId.AddItemModal) {
                return;
            } // if

            // Check selected item in input
            const target = document.getElementById(id as string) as HTMLInputElement;
            if(target && target.value.length && !options.includes(target.value)) {
                reset();
            } // if
        } // if

        setIsOpen(false);
    }, [id, reset, options]);

    return {
        isOpen,
        open,
        close
    }
}