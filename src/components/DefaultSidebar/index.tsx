/* eslint-disable */
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BreadcrumbsHeader from "../../components/BreadcrumbsHeader";
import Drawer from "@mui/material/Drawer";
import MenuHeader from "../../components/MenuHeader";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { Switch, Link, useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Profile from "../../containers/Profile";
import Dashboard from "../../containers/Dashboard";
import Books from "../../containers/Books";
import { Sidebar, SidebarDrawer, Content } from "./styles";

const routes = [
  {
    path: '/dashboad',
    exact: true,
    main: () => <Dashboard />,
  },
  {
    path: '/dashboad/books',
    exact: true,
    main: () => <Books />,
  },
  {
    path: '/profile',
    main: () => <Profile />,
  },
];

const array = ["1", "2", "3"];

const menuUser = [
  {
    icon: <HomeIcon />,
    title: 'Dashboad',
    path: '/dashboad',
  },
  {
    icon: <PersonIcon />,
    title: 'Profile',
    path: '/profile',
  },
];

const DefaultSidebar = () => {
  const [statusMenu, setStatusMenu] = React.useState(false);
  const [statusMenuMobile, setStatusMenuMobile] = React.useState(false);

  const location = useLocation();
  const pathname = `/${location.pathname.split('/')[1]}`;

  const handleDrawerToggle = () => {
    setStatusMenu(!statusMenu);
  };

  const handleDrawerToggleMobile = () => {
    setStatusMenuMobile(!statusMenuMobile);
  };

  React.useLayoutEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        setStatusMenu(false);
      } else {
        setStatusMenu(true);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Sidebar>
      <MenuHeader
        handleDrawerToggle={handleDrawerToggle}
        handleDrawerToggleMobile={handleDrawerToggleMobile}
      />
      <SidebarDrawer
        variant="permanent"
        open={statusMenu}
        onClose={handleDrawerToggle}
      >
        <Toolbar />
        <div className="sidebar_container">
          {menuUser.map((item) => (
            <List key={`${item.path}+_menu`}>
              <ListItem
                selected={pathname === item.path}
                button
                component={Link}
                to={item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText className="menu_title" primary={item.title} />
              </ListItem>
            </List>
          ))}
        </div>
      </SidebarDrawer>
      <Drawer
        open={statusMenuMobile}
        onClose={handleDrawerToggleMobile}
      >
        {menuUser.map((item) => (
          <List key={`${item.path}+_menu`}>
            <ListItem
              selected={pathname === item.path}
              onClick={handleDrawerToggleMobile}
              button
              component={Link}
              to={item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText className="menu_title" primary={item.title} />
            </ListItem>
          </List>
        ))}
      </Drawer>
      <Content>
        <Toolbar />
        <BreadcrumbsHeader data={array} />
        <Switch>
          {routes.map((route) => (
            <ProtectedRoute
              key={`${route.path}_routes`}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </Switch>
      </Content>
    </Sidebar>
  );
};

export default DefaultSidebar;
