import { ButtonIcon } from '@common/Button/ButtonIcon';
import { StatusKYC } from '@common/Chip/StatusKyc';
import { TableGrid } from '@common/TableGrid';
import { Preview } from '@mui/icons-material';
import { Divider, Stack, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { getAdminKycSlice, searchKycStart } from '@redux/slices/adminKycSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import Date from '@services/date';
import Helper from '@services/helper';
import { TableHelper } from '@services/table';
import { Profile } from '@type/profile';
import { useEffect, useState } from 'react';
import { KycModal } from './KycModal';

export const KycList = () => {
  const { paging, loadingData, data } = useAppSelector(getAdminKycSlice);
  const dispatch = useAppDispatch();
  const [visibleKycModal, setVisibleKycModal] = useState<boolean>(false);
  const [kycDetail, setKycDetail] = useState<Profile>();
  const [node, setNode] = useState<number>(0);

  const onOpenKycModal = (value: GridRenderCellParams) => () => {
    setVisibleKycModal(true);
    setKycDetail(value.row);
    setNode(TableHelper.recoverIndex(value.id as number, paging.currentPage as number, paging.pageSize as number));
  };

  const onCloseKycModal = () => {
    setVisibleKycModal(false);
    setKycDetail({});
  };

  useEffect(() => {
    dispatch(searchKycStart({ ...TableHelper.queryDefault }));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'STT', width: 50 },
    {
      field: 'userId',
      headerName: 'Address',
      flex: 1,
      minWidth: 150,
      renderCell: ({ value: userId }) => <div>{Helper.splitString(userId.address, 10, 6)}</div>,
    },
    { field: 'fullName', headerName: 'Full name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 150 },
    {
      field: 'birthday',
      headerName: 'Birthday',
      flex: 1,
      minWidth: 150,
      renderCell: ({ value: birthday }) => <div>{Date.toDateStr(birthday)}</div>,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: ({ value: status }) => <StatusKYC status={status} />,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated at',
      flex: 1,
      minWidth: 150,
      renderCell: ({ value: updatedAt }) => <div>{Date.toDateHoursStr(updatedAt)}</div>,
    },
    {
      field: 'action',
      width: 150,
      headerName: 'Action',
      renderCell: (value) => (
        <Stack direction="row" spacing={1}>
          <ButtonIcon helpText="view" icon={<Preview />} onClick={onOpenKycModal(value)} color="success" />
          {/* <IconButton aria-label="fingerprint" color="secondary">
            <Fingerprint />
          </IconButton>
          <IconButton aria-label="fingerprint" >
            <Preview />
          </IconButton> */}
        </Stack>
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h3" component="h3" gutterBottom>
        KYC Management
      </Typography>
      <Divider style={{ marginBottom: 30 }} />
      <div style={{ height: 550, width: '100%' }}>
        <TableGrid paging={paging} columns={columns} loadingData={loadingData} rows={data} />
      </div>
      <KycModal
        index={node}
        loadingAction={loadingData}
        kyc={kycDetail}
        open={visibleKycModal}
        onCloseModal={onCloseKycModal}
      />
    </div>
  );
};
