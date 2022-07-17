import { ActionType } from '@/api/ActionType';
import { OptionType } from '@/data/types/OptionType';
import { Dispatch, SetStateAction, useEffect } from 'react';

export const useCustomAutocompleteLazyLoad = (setAutocompleteOptions: Dispatch<SetStateAction<OptionType[]>>, lazyLoadInfo?: ActionType<OptionType>) => {
    if(!lazyLoadInfo) return;

    const { execFunction, queryInfo: { data, loading, error } } = lazyLoadInfo;

    useEffect(() => {
        if(data) {  
            setAutocompleteOptions(prev => ([
                ...data.map((i) => ({ 
                    id: i.id, 
                    name: i.name,
                    isCustom: false
                })),
                ...prev.filter(p => p.isCustom)
            ]));
        } // if
    }, [data])

    return {
        data,
        loading,
        execFunction,
        error
    }
} // useCompanyRelationAction