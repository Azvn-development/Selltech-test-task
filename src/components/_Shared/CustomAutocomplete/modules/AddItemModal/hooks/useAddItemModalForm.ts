import { useForm } from '@/hooks/useForm';
import * as yup from 'yup';

export type FormData = {
    item: string
}

export const useAddItemModalForm = (handleSubmit: (item: string) => void) => {
    const { formData, formErrors, onChange, onSubmit } = useForm<FormData>(
        {
            item: ''
        },
        (data) => handleSubmit(data.item),
        {
            item: yup.string().required()
        }
    );

    return {
        formData,
        formErrors,
        onChange,
        onSubmit
    }
}