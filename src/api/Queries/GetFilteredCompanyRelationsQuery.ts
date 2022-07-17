import { gql } from '@apollo/client';

export const GET_FILTERED_COMPANY_RELATIONS = gql`
    query applicantIndividualCompanyRelations($where: QueryApplicantIndividualCompanyRelationsWhereWhereConditions) {
        applicantIndividualCompanyRelations(where:$where) {
            data {
                id
                name
            }
        }
    }
`