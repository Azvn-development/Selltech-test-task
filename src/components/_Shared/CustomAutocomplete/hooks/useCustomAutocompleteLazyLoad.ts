import { ActionType } from '@/api/ActionType';
import { OptionType } from '@/data/types/OptionType';
import { useEffect } from 'react';

export const useCustomAutocompleteLazyLoad = (setAutocompleteOptions: (options: string[]) => void, lazyLoadInfo?: ActionType<OptionType>) => {
    if(!lazyLoadInfo) return;

    const { execFunction, queryInfo: { data, loading, error } } = lazyLoadInfo;

    useEffect(() => {
        if(data) {  
            setAutocompleteOptions(data.map((i) => i.name));
        } // if
    }, [data])

    return {
        data,
        loading,
        execFunction,
        error
    }
} // useCompanyRelationAction