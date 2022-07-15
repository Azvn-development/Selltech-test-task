import React from 'react';
import { Button } from '@mui/material';
import { CustomAutocompleteItemId } from '../../utils/CustomAutocompleteItemId';
import styles from './AddItemButton.scss';

type Props = {
    openAddItemModal: () => void;
}

const AddItemButton = ({ openAddItemModal }:Props):React.ReactElement => {
    return (
        <div onMouseDown={(e) => e.preventDefault()} className={styles.addItemButtonWrapper}>
            <Button
                id={CustomAutocompleteItemId.AddItemButton}
                variant={'contained'}
                color={'primary'}
                onClick={openAddItemModal}
            >
                + Add new item
            </Button>
        </div>
    )
}

export default AddItemButton;