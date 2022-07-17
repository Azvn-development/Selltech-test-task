import { gql } from '@apollo/client';

export const GET_FILTERED_COMPANY_POSITIONS = gql`
    query applicantIndividualCompanyPositions($where: QueryApplicantIndividualCompanyPositionsWhereWhereConditions) {
        applicantIndividualCompanyPositions(where:$where) {
            data {
                id
                name
            }
        }
    }
`