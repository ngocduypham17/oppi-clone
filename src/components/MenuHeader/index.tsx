import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import history from '../../utils/history';
import { removeCachedUrl } from '../../utils/localStorage';
import { ACCESS_TOKEN } from '../../constants/localStorage';
import { MenuBar, UserName } from './styles';

const MenuHeader = ({ handleDrawerToggle, handleDrawerToggleMobile }:any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuDraw, setMenuDraw] = React.useState(true);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    removeCachedUrl();
    history.replace('/login');
  };

  React.useLayoutEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 480) {
        setMenuDraw(false);
      } else {
        setMenuDraw(true);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <MenuBar position="fixed" elevation={0}>
      <Toolbar className="menu_tool_bar">
        <div>
          {menuDraw
            ? (
              <IconButton
                className="mobile_button_menu"
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )
            : (
              <IconButton
                className="mobile_button_menu"
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggleMobile}
              >
                <MenuIcon />
              </IconButton>
            )
          }

          LOGO
        </div>

        <div>
          <IconButton
            disableRipple
            color="inherit"
          >
            <Badge badgeContent={69} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            disableRipple
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
            <UserName>
              <p className="name">Admin User</p>
              <p className="email">sample@sample</p>
            </UserName>
          </IconButton>
        </div>
      </Toolbar>

      <Menu
        style={{ marginTop: '10px' }}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

    </MenuBar>
  );
};

export default MenuHeader;
