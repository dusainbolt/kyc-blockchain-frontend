import { TableGrid } from '@common/TableGrid';
import { Avatar, Button, Divider, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { getKycSharedSlice, searchKycSharedStart } from '@redux/slices/kycSharedSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import Date from '@services/date';
import Helper from '@services/helper';
import { TableHelper } from '@services/table';
import { useEffect } from 'react';

export const KycSharedHistory = () => {
  const { paging, loadingData, data } = useAppSelector(getKycSharedSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchKycSharedStart({ ...TableHelper.queryDefault }));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'STT', width: 50 },
    {
      field: 'projectId_1',
      headerName: 'Avatar',
      width: 80,
      renderCell: ({ row: { projectId } }) => <Avatar alt={projectId?.name} src={projectId?.avatar} />,
    },
    {
      field: 'projectId_2',
      headerName: 'Business name',
      minWidth: 250,
      maxWidth: 350,
      renderCell: ({ row: { projectId } }) => projectId?.name,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated at',
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      renderCell: ({ value: updatedAt }) => <div>{Date.toDateHoursStr(updatedAt)}</div>,
    },
    {
      field: 'transactionHash',
      headerName: '',
      flex: 1,
      maxWidth: 200,
      minWidth: 150,
      renderCell: ({ value: transactionHash }) => (
        <Button variant="contained" size="small" target="_blank" href={Helper.getEtherUrl(transactionHash)}>
          View Transaction
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h3" component="h3" gutterBottom>
        KYC Shared History
      </Typography>
      <Divider style={{ marginBottom: 30 }} />
      <div style={{ height: 550, width: '100%' }}>
        <TableGrid paging={paging} columns={columns} loadingData={loadingData} rows={data} />
      </div>
    </div>
  );
};
