import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { closeDialogApp, getLayoutSlice } from '@redux/slices/layoutSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';

export const AppDialog = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { dialog } = useAppSelector(getLayoutSlice);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeDialogApp());
  };

  const handleOk = () => {
    dialog?.callbackOk();
    dispatch(closeDialogApp());
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={dialog?.open || false}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{dialog?.title || ''}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialog?.description || ''}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Disagree
        </Button>
        <Button onClick={handleOk} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
