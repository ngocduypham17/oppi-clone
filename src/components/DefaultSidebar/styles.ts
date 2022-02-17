import styled from 'styled-components';
import Drawer from '@mui/material/Drawer';

const drawerWidth = '150px';

export const Sidebar = styled.div`
  display: flex;
  .MuiAppBar-colorPrimary {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  .MuiListItemIcon-root {
    color: white;
    min-width: 0;
  }
  .MuiDrawer-paperAnchorLeft {
    width: ${drawerWidth};
  }
`;

export const SidebarDrawer = styled(Drawer)`
  width: ${drawerWidth};
  flex-shrink: 0;
  z-index: 1;
  transition: margin-left 0.25s, margin-right 0.25s, width 0.25s, flex 0.25s;
  .menu_title {
    padding-left: 15px;
  }
  .menu_icon {
    color: ${({ theme }) => theme.colors.text.primary};
  }
  .MuiDrawer-paperAnchorLeft {
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: #0b3534;
  }
  .sidebar_container {
    /* overflow: auto; */
  }
  .MuiListItem-button.Mui-selected {
    background: rgba(255, 255, 255, 0.2);
  }

  .MuiListItem-button.Mui-selected:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  .MuiListItem-button:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  @media only screen and (max-width: 768px) {
    width: ${({ open }) => (open ? drawerWidth : '56px')};
    transition: margin-left 0.25s, margin-right 0.25s, width 0.25s, flex 0.25s;
    .MuiDrawer-paperAnchorLeft {
      width: ${({ open }) => (open ? drawerWidth : '56px')};
    }
    .menu_title {
      display: ${({ open }) => (open ? 'block' : 'none')};
    }
  }

  @media only screen and (max-width: 480px) {
    display: ${({ open }) => (open ? 'block' : 'none')};
    transition: margin-left 0.25s, margin-right 0.25s, width 0.25s, flex 0.25s;
  }
`;

export const Title = styled.div`
  display: ${({ open }: { open: boolean }) => (open ? 'block' : 'none')};
  font-family: ${({ theme }) => theme.font.NotoSans};
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  padding: 20px 0 0 16px;
`;

export const Footer = styled.div`
  display: ${({ open }: { open: boolean }) => (open ? 'block' : 'none')};
  position: absolute;
  left: 15px;
  bottom: 20px;
  font-family: ${({ theme }) => theme.font.NotoSans};
  font-style: normal;
  font-weight: normal;
  font-size: 8px;
`;

export const Content = styled.div`
  /* width: 100%; */
  width: calc(100% - 150px);
  @media only screen and (max-width: 768px) {
    width: calc(100% - 56px);
  }
`;
