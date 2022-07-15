import { ClientEntity } from '@/data/enums/ClientEntity';
import { ClientModel } from '@/data/models/ClientModel';
import { useForm } from '@/hooks/useForm';
import { useId } from 'react';
import * as yup from 'yup';

export type FormData = ClientModel;

export const useClientForm = (handleSubmit: (data: FormData) => void) => {
    const id = useId();

    const { formData, formErrors, onChange, onSubmit } = useForm<FormData>(
        {
            id: id,
            clientId: '',
            entity: ClientEntity.Individual,
            relationToTheCompany: '',
            positionInTheCompany: ''
        },
        handleSubmit,
        {
            clientId: yup.number().required(),
            entity: yup.string().required(),
            firstName: yup
                .string()
                .when('entity', {
                    is: ClientEntity.Individual,
                    then: yup.string().required()
                }),
            lastName: yup
                .string()
                .when('entity', {
                    is: ClientEntity.Individual,
                    then: yup.string().required()
                }),
            companyName: yup
                .string()
                .when('entity', {
                    is: ClientEntity.Company,
                    then: yup.string().required()
                }),
            relationToTheCompany: yup.string().required(),
            positionInTheCompany: yup.string().required()
        });

    return {
        formData,
        formErrors,
        onChange,
        onSubmit
    }
}