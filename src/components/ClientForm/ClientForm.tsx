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
import { useCompanyRelationAction } from '@/api/Actions/useCompanyRelationAction';
import { useCompanyPositionAction } from '@/api/Actions/useCompanyPositionAction';
import styles from './ClientForm.scss';

type Props = {
    handleSubmit: (data: ClientModel) => void;
    onClose: () => void;
}

export const ClientForm = ({ handleSubmit, onClose }:Props): React.ReactElement => {
    const { formData, formErrors, onChange, onSubmit } = useClientForm(handleSubmit);

    const clientIds = useClientIdOptions();
    const clientEntities = useClientEntityOptions();

    const companyRelationAction = useCompanyRelationAction();
    const companyPositionAction = useCompanyPositionAction();

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
                    lazyLoadData={companyRelationAction}
                    needAddItem
                />

                <CustomAutocomplete<FormData>
                    id={'positionInTheCompany'}
                    label={'Position in the Company'}
                    options={[]}
                    value={formData.positionInTheCompany}
                    onChange={onChange}
                    errors={formErrors}
                    lazyLoadData={companyPositionAction}
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