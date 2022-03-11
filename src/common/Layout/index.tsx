import { layoutStyle } from './layoutStyle';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import {
  Backdrop,
  Breadcrumbs,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  ListItemText,
} from '@mui/material';
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
import { getAuthSlice } from '@redux/slices/authSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InboxIcon from '@mui/icons-material/Inbox';

interface LayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbsType[];
}

export const Layout: FC<LayoutProps> = ({ children, breadcrumbs }) => {
  const classes = layoutStyle();
  const { address } = useAppSelector(getWalletSlice);
  const { token } = useAppSelector(getAuthSlice);
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

  const showContentAuth = token && address;

  return showContentAuth ? (
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
          <div className={classes.walletAddress}>
            <AccountCircleIcon /> <span>{Helper.splitString(address)}</span>
          </div>
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
      <div className={classes.body}>
        <div className={classes.sidebar}>
          <div className={classes.sidebarWrap}>
            <List style={{ width: '100%' }}>
              <ListItem className={classes.navWrap} selected disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem className={classes.navWrap} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="History" />
                </ListItemButton>
              </ListItem>
              <ListItem className={classes.navWrap} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Share History" />
                </ListItemButton>
              </ListItem>
            </List>
          </div>
        </div>
        <div className={classes.bodyContent}>{children}</div>
      </div>
    </>
  ) : (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
