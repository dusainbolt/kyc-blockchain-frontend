import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'STT', width: 150 },
  { field: 'col1', headerName: 'Address', width: 150 },
  { field: 'col2', headerName: 'Full name', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'updatedAt', headerName: 'Updated at', width: 150 },
  { field: 'action', headerName: 'Action', width: 150 },
];

export const KycList = () => {
  return (
    <div style={{ height: 550, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};
