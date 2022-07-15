import React from 'react';
import { Button } from '@mui/material';
import { ClientForm } from '../ClientForm/ClientForm';
import { useModal } from '@/hooks/useModal';
import { ClientModel } from '@/data/models/ClientModel';
import CustomModal from '../_Shared/CustomModal/CustomModal';

type Props = {
    addClient: (data: ClientModel) => void;
}

const ClientModal = ({ addClient }:Props):React.ReactElement => {
    const { isOpen, open, close } = useModal();

    return (
        <>
            <Button
                onClick={open}
                variant={'contained'}
                color={'primary'}
            >
                Add
            </Button>
            
            <CustomModal isOpen={isOpen} title={'Add'} close={close} >
                <ClientForm 
                    handleSubmit={(data) => {
                        addClient(data);
                        close();
                    }}
                    onClose={close}
                />
            </CustomModal>
        </>
    )
}

export default React.memo(ClientModal);