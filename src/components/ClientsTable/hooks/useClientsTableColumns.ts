import { ClientModel } from '@/data/models/ClientModel'
import { ColumnType } from '@/data/types/ColumnType'
import { useMemo } from 'react'

export const useClientsTableColumns = () => {
    return useMemo(():ColumnType<ClientModel>[] => {
        return [
            {
                key: 'clientId',
                name: 'Client ID',
            },
            {
                key: 'entity',
                name: 'Entity',
            },
            {
                key: 'companyName',
                name: 'Company Name'
            },
            {
                key: 'firstName',
                name: 'First Name'
            },
            {
                key: 'lastName',
                name: 'Last Name'
            },
            {
                key: 'relationToTheCompany',
                name: 'Relation to the Company'
            },
            {
                key: 'positionInTheCompany',
                name: 'Position in the Company'
            }
        ]
    }, [])
}