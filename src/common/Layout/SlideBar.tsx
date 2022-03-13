import InboxIcon from '@mui/icons-material/Inbox';
import { Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { Role } from '@type/user';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { layoutStyle } from './layoutStyle';

interface SidebarProps {
  activeLink?: string;
}

export const Sidebar: FC<SidebarProps> = () => {
  const classes = layoutStyle();
  const { role } = useAppSelector(getAuthSlice);
  const router = useRouter();

  const menu = {
    [Role.USER]: [
      { text: 'Profile', icon: <InboxIcon />, href: '/user' },
      { text: 'Edit Profile', icon: <InboxIcon />, href: '/user/edit' },
      { text: 'History', icon: <InboxIcon />, href: '/user/request' },
      { text: 'Share History', icon: <InboxIcon />, href: 'user/share-history' },
    ],
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarWrap}>
        <List style={{ width: '100%' }}>
          {menu[role || Role.USER].map((item, index) => (
            <ListItem key={index} className={classes.navWrap} selected={item.href === router.route} disablePadding>
              <Link href={item.href}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};
