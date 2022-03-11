import { layoutStyle } from './layoutStyle';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import { Breadcrumbs, Divider, IconButton, InputBase, Link, ListItemIcon, Typography } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import { BreadcrumbsType } from '@type/layout';
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector } from '@redux/store';
import { getWalletSlice } from '@redux/slices/walletSlice';
import Helper from '@services/helper';
import MenuItem from '@mui/material/MenuItem';
import { MenuCustom } from '@common/Menu/MenuCustom';
import { Logout } from '@mui/icons-material';
import { useWeb3React } from '@web3-react/core';

interface LayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbsType[];
}

export const Layout: FC<LayoutProps> = ({ children, breadcrumbs }) => {
  const classes = layoutStyle();
  const { address } = useAppSelector(getWalletSlice);
  const [anchorEl, setAnchorEl] = useState(null);
  const { deactivate } = useWeb3React();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    deactivate();
  };

  return (
    <>
      <div className={classes.header}>
        <div className={classes.logoWrap}>
          <LogoDevIcon />
          <div>KYC Platform</div>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link underline="hover" key="-1" color="inherit" href="/"></Link>
            {breadcrumbs?.map((item, index) =>
              index === breadcrumbs.length - 1 ? (
                <Typography key={index}>{item.text}</Typography>
              ) : (
                <Link underline="hover" key={index} color="inherit" href={item.href}>
                  {item.text}
                </Link>
              )
            )}
          </Breadcrumbs>
        </div>
        <div className={classes.searchWrap}>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" inputProps={{ 'aria-label': 'search ...' }} />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
        <div onClick={handleMenu} className={classes.walletWrap}>
          {Helper.splitString(address)}
        </div>
        <MenuCustom id="account-wallet-menu" open={Boolean(anchorEl)} handleClose={handleClose} anchorEl={anchorEl}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </MenuCustom>
      </div>
      {children}
    </>
  );
};
