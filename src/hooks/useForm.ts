import { useCallback, useState } from 'react';
import * as yup from 'yup';

export const useForm = <TData extends object>(
    defaultValues: TData, 
    handleSubmit: (data: TData) => void,
    rules: { [x: string]: yup.AnySchema }
) => {
    // Form state
    const [formData, setFormData] = useState<TData>(defaultValues);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    // Validation schema
    const schema = yup.object().shape(rules);

    // Form onchange callback
    const onChange = useCallback((field: keyof TData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }, []);

    // Form onsubmit callback
    const onSubmit = useCallback((e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        schema.validate(formData, { abortEarly: false })
            .then(() => {
                handleSubmit(formData);
            })
            .catch((error) => {
                setFormErrors(error.errors);
            });
    }, [schema, formData, handleSubmit, setFormErrors])

    return {
        formData,
        formErrors,
        onChange,
        onSubmit
    }
}