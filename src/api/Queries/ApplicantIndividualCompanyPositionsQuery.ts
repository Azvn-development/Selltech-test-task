import { gql } from '@apollo/client';

export const APPLICANT_INDIVIDUAL_COMPANY_POSITION = gql`
    query applicantIndividualCompanyPositions($where: QueryApplicantIndividualCompanyRelationsWhereWhereConditions) {
        applicantIndividualCompanyPositions(where:$where) {
            data {
                id
                name
            }
        }
    }
`