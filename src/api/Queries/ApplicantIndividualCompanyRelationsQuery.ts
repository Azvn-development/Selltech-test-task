import { gql } from '@apollo/client';

export const APPLICANT_INDIVIDUAL_COMPANY_RELATIONS = gql`
    query applicantIndividualCompanyRelations($where: QueryApplicantIndividualCompanyPositionsWhereWhereConditions) {
        applicantIndividualCompanyRelations(where:$where) {
            data {
                id
                name
            }
        }
    }
`