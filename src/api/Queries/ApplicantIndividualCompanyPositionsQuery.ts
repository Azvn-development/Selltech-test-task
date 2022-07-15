import { gql } from '@apollo/client';

export const APPLICANT_INDIVIDUAL_COMPANY_POSITION = gql`
    query applicantIndividualCompanyPositions($name: String!) {
        applicantIndividualCompanyPositions(where: {name: {_eq: $name}}) {
            data {
                id
                name
            }
        }
    }
`