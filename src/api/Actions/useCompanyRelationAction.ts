import { CompanyRelationModel } from '@/data/models/CompanyRelationModel';
import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';
import { ActionType } from '../ActionType';
import { GET_FILTERED_COMPANY_RELATIONS } from '../Queries/GetFilteredCompanyRelationsQuery';

export const useCompanyRelationAction = ():ActionType<CompanyRelationModel> => {
    const [queryFunction, { data, loading, error }] = useLazyQuery(GET_FILTERED_COMPANY_RELATIONS);

    const execFunction = useCallback((value?: string) => {
        return queryFunction({
            variables: value ? {
                where: {
                    column: 'NAME',
                    operator: 'LIKE',
                    value: `${value}%`
                }
            } : {},
        })
    }, [])

    return {
        execFunction,
        queryInfo: {
            data: data?.applicantIndividualCompanyRelations.data,
            loading,
            error
        }
    }
}