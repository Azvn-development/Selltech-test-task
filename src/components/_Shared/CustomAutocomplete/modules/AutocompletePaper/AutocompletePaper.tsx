import React, { HTMLAttributes } from 'react';
import { Paper } from '@mui/material';
import AddItemButton from '../AddItemButton/AddItemButton';
import styles from './AutocompletePaper.scss';
import AddItemModal from '../AddItemModal/AddItemModal';
import { useModal } from '@/hooks/useModal';

type Props = {
    id: string;
    label: string;
    needAddItem: boolean;
    handleAddItemSubmit: (item: string) => void;
}

const AutocompletePaper = (
    props: HTMLAttributes<HTMLElement>, 
    { id, label, needAddItem, handleAddItemSubmit }: Props
):React.ReactElement => {
    const { isOpen, open, close } = useModal();

    return (
        <>
            <div>
                <div className={styles.autocompletePaperWrapper} />

                <Paper
                    elevation={1}
                    {...props}
                    className={styles.autocompletePaper}
                />

                {needAddItem && (
                    <>
                        <AddItemButton
                            openAddItemModal={open}
                        />

                        <AddItemModal
                            isOpen={isOpen}
                            label={label}
                            handleSubmit={handleAddItemSubmit}
                            close={() => {
                                const autocomplete = document.getElementById(id);
                                if(autocomplete) {
                                    autocomplete.focus();
                                } // if

                                close()
                            }}
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default AutocompletePaper;