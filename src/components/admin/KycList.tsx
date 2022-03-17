import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { getAdminKycSlice } from '@redux/slices/adminKycSlice';
import { useAppSelector } from '@redux/store';
import { TableHelper } from '@services/table';
import { useState } from 'react';

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
  const [pageSize, setPageSize] = useState(5);
  const { paging } = useAppSelector(getAdminKycSlice);

  return (
    <div style={{ height: 550, width: '100%' }}>
      <DataGrid
        {...TableHelper.propsParamsTable(paging)}
        rows={rows}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        columns={columns}
      />
    </div>
  );
};
