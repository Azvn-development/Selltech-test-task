import React, { useState } from 'react';
import ClientsTable from './components/ClientsTable/ClientsTable';
import { Grid } from '@mui/material';
import ClientModal from './components/ClientModal/ClientModal';
import { ClientModel } from './data/models/ClientModel';
import { useAuthorization } from './hooks/useAuthorization';

const App = (): React.ReactElement => {
  const [clients, setClients] = useState<ClientModel[]>([]);

  useAuthorization();

  return (
    <Grid container spacing={1}>
      <Grid item md={12} sm={12}>
        <ClientModal addClient={(data) => setClients(prev => [ ...prev, data ])} />
      </Grid>

      <Grid item md={12} sm={12}>
        <ClientsTable clients={clients} />
      </Grid>
    </Grid>
  );
};

export default App;
