import { OptionType } from '@/data/types/OptionType';
import { useMemo } from 'react'

export const useClientIdOptions = () => {
    return useMemo(():OptionType[] => {
        return Array
            .from(Array(99000).keys())
            .map(i => ({
                id: i + 1,
                name: String(i + 1)
            }));
    }, [])
}