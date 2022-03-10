import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { FC } from 'react';

interface ButtonIconProps extends IconButtonProps {
  icon: any;
  loading: boolean;
  onClick?: any;
}

export const ButtonIcon: FC<ButtonIconProps> = ({ icon, loading, onClick }) => {
  return (
    <IconButton onClick={onClick} disabled={loading} aria-label="delete" size="small">
      {icon}
    </IconButton>
  );
};
