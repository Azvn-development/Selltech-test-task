import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useClientEntityOptions } from '@/hooks/opitions/useClientEntityOptions';
import { ClientEntity } from '@/data/enums/ClientEntity';
import CustomTextField from '../_Shared/CustomTextField/CustomTextField';
import CustomSelect from '../_Shared/CustomSelect/CustomSelect';
import { ClientModel } from '@/data/models/ClientModel';
import CustomAutocomplete from '../_Shared/CustomAutocomplete/CustomAutocomplete';
import { FormData, useClientForm } from './hooks/useClientForm';
import { useClientIdOptions } from '@/hooks/opitions/useClientIdOptions';
import styles from './ClientForm.scss';
import { APPLICANT_INDIVIDUAL_COMPANY_RELATIONS } from '@/api/Queries/ApplicantIndividualCompanyRelationsQuery';
import { APPLICANT_INDIVIDUAL_COMPANY_POSITION } from '@/api/Queries/ApplicantIndividualCompanyPositionsQuery';
import { DataKey } from '@/api/DataKey';

type Props = {
    handleSubmit: (data: ClientModel) => void;
    onClose: () => void;
}

export const ClientForm = ({ handleSubmit, onClose }:Props): React.ReactElement => {
    const { formData, formErrors, onChange, onSubmit } = useClientForm(handleSubmit);

    const clientIds = useClientIdOptions();
    const clientEntities = useClientEntityOptions();

    return (
        <Grid
            container
            component={'form'} 
            autoComplete={'off'}
            width={600}
            gap={2}
            onSubmit={onSubmit}
        > 
            <Grid
                container
                item
                md={12}
                gap={1}
                direction={'column'}
                className={styles.clientFormFieldsWrapper}
            >
                <Typography variant="h6">
                    Details
                </Typography>

                <CustomSelect<FormData>
                    id={'entity'}
                    label={'Entity'}
                    options={clientEntities}
                    value={formData.entity}
                    onChange={onChange}
                    errors={formErrors}
                />

                <CustomAutocomplete<FormData>
                    id={'clientId'}
                    label={'Client ID'}
                    value={formData.clientId}
                    onChange={onChange}
                    options={clientIds}
                    errors={formErrors}
                />

                {{
                    [ClientEntity.Individual]:
                        <>
                            <CustomTextField<FormData>
                                id={'firstName'}
                                label={'First Name'}
                                value={formData.firstName ?? ''}
                                onChange={onChange}
                                errors={formErrors}
                            />

                            <CustomTextField<FormData>
                                id={'lastName'}
                                label={'Last Name'}
                                value={formData.lastName ?? ''}
                                onChange={onChange}
                                errors={formErrors}
                            />
                        </>,
                    [ClientEntity.Company]: 
                        <>
                            <CustomTextField<FormData>
                                id={'companyName'}
                                label={'Company Name'}
                                value={formData.companyName ?? ''}
                                onChange={onChange}
                                errors={formErrors}
                            />
                        </>
                }[formData.entity]}
            </Grid>
            
            <Grid
                item
                container
                md={12}
                gap={1}
                direction={'column'}
                className={styles.clientFormFieldsWrapper}
            >
                <CustomAutocomplete<FormData>
                    id={'relationToTheCompany'}
                    label={'Relation to the Company'}
                    options={[]}
                    value={formData.relationToTheCompany}
                    onChange={onChange}
                    errors={formErrors}
                    lazyLoadData={{
                        query: APPLICANT_INDIVIDUAL_COMPANY_RELATIONS,
                        dataKey: DataKey.APPLICANT_INDIVIDUAL_COMPANY_RELATIONS
                    }}
                    needAddItem
                />

                <CustomAutocomplete<FormData>
                    id={'positionInTheCompany'}
                    label={'Position in the Company'}
                    options={[]}
                    value={formData.positionInTheCompany}
                    onChange={onChange}
                    errors={formErrors}
                    lazyLoadData={{
                        query: APPLICANT_INDIVIDUAL_COMPANY_POSITION,
                        dataKey: DataKey.APPLICANT_INDIVIDUAL_COMPANY_POSITION
                    }}
                    needAddItem
                />
            </Grid>

            <Grid
                item
                container
                md={12}
                gap={1}
                direction={'row'}
                justifyContent={'flex-end'}
            >
                <Button
                    variant={'contained'}
                    color={'inherit'}
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    variant={'contained'}
                    color={'primary'}
                    type={'submit'}
                >
                    Add
                </Button>
            </Grid>
        </Grid>
    )
}