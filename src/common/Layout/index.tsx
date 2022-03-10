import { layoutStyle } from './layoutStyle';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import { Breadcrumbs, IconButton, InputBase, Link, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { BreadcrumbsType } from '@type/layout';
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector } from '@redux/store';
import { getWalletSlice } from '@redux/slices/walletSlice';
import Helper from '@services/helper';

interface LayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbsType[];
}

export const Layout: FC<LayoutProps> = ({ children, breadcrumbs }) => {
  const classes = layoutStyle();
  const { address } = useAppSelector(getWalletSlice);

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
        <div className={classes.logoWrap}>{Helper.splitString(address)}</div>
      </div>
      {children}
    </>
  );
};
