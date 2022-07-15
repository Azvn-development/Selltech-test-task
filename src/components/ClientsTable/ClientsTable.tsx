import React from 'react';
import { useClientsTableColumns } from './hooks/useClientsTableColumns';
import CustomTable from '../_Shared/CustomTable/CustomTable';
import { ClientModel } from '@/data/models/ClientModel';

type Props = {
    clients: ClientModel[];
}

const ClientsTable = ({ clients }:Props):React.ReactElement => {
    const columns = useClientsTableColumns();

    return (
        <CustomTable
            rowKey={'id'}
            rows={clients}
            columns={columns}
        />
    )
}

export default React.memo(ClientsTable);