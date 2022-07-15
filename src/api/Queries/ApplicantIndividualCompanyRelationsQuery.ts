import { gql } from '@apollo/client';

export const APPLICANT_INDIVIDUAL_COMPANY_RELATIONS = gql`
    query applicantIndividualCompanyRelations($name: String!) {
        applicantIndividualCompanyRelations(name:$name) {
            data {
                id
                name
            }
        }
    }
`