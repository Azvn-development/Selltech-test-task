import React from 'react';
import CustomModal from '@/components/_Shared/CustomModal/CustomModal';
import CustomTextField from '@/components/_Shared/CustomTextField/CustomTextField';
import {  Button } from '@mui/material';
import { FormData, useAddItemModalForm } from './hooks/useAddItemModalForm';
import styles from './AddItemModal.scss';
import { CustomAutocompleteItemId } from '../../utils/CustomAutocompleteItemId';

type Props = {
    isOpen: boolean;
    label: string;
    handleSubmit: (value: string) => void;
    close: () => void;
}

const AddItemModal = ({ isOpen, label, handleSubmit, close }:Props):React.ReactElement => {
    const { formData, formErrors, onChange, onSubmit } = useAddItemModalForm(handleSubmit);

    return (
        <CustomModal id={CustomAutocompleteItemId.AddItemModal} isOpen={isOpen} title={'Add new item'} close={close}>
            <div className={styles.addItemModalFields}>
                <CustomTextField<FormData>
                    id={'item'}
                    value={formData.item}
                    onChange={onChange}
                    errors={formErrors}
                    label={label}
                />

                <Button
                    variant={'contained'}
                    color={'primary'}
                    className={styles.addItemModalButton}
                    onClick={() => onSubmit()}
                >
                    Add
                </Button>
            </div>
        </CustomModal>
    )
}

export default AddItemModal;