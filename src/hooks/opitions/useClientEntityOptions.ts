import { ClientEntity } from '@/data/enums/ClientEntity'
import { useMemo } from 'react'

export const useClientEntityOptions = (): ClientEntity[] => {
    return useMemo(() => {
        return [
            ClientEntity.Company,
            ClientEntity.Individual,
        ]
    }, [])
}