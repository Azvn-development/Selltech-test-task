import { OptionType } from '@/data/types/OptionType';
import { DocumentNode, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';

export const useCustomAutocompleteLazyLoad = (setAutocompleteOptions: (options: string[]) => void, dataKey?: string, query?: DocumentNode) => {
    if(!dataKey || !query) return null;

    const [execFunction, { data, loading, error }] = useLazyQuery(query);

    useEffect(() => {
        if(data) {
            setAutocompleteOptions(data?.[dataKey].data.map((i: OptionType) => i.name));
        } // if
    }, [data])

    return {
        data,
        loading,
        execFunction,
        error
    }
}