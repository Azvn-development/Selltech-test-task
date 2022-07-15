import React, { PropsWithChildren } from 'react';
import { Box } from '@mui/system';
import { Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './CustomModal.scss';

type Props = {
    id?: string;
    isOpen: boolean;
    title: string;
    close: () => void;
}

const CustomModal = ({ id, isOpen, title, close, children }:PropsWithChildren<Props>):React.ReactElement => {
    return (
        <Modal
            open={isOpen}
        >
            <Box
                id={id}
                component={'div'}
                className={styles.customModalBody}
            >
                <Typography variant={'h6'} component={'h3'}>
                    {title}
                    <CloseIcon onClick={close} className={styles.customModalBodyCloseIcon} />
                </Typography>

                {children}
            </Box>
        </Modal>
    );
}

export default CustomModal;