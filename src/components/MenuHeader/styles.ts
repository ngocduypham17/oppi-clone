import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';


export const MenuBar = styled(AppBar)`
  .menu_tool_bar {
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.primary};
  };
  .MuiIconButton-root:hover {
    border-radius: 0;
    background-color: rgba(0, 0, 0, 0);
  };
  .mobile_button_menu {
    @media only screen and (min-width: 768px) {
    display: none;
    }
  };
  .user_menu{
    display: block;
  };
`;

export const UserName = styled.div`
  padding-left: 10px;
  box-sizing: border-box;
  .name {
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
  };
  .email {
    font-size: 9px;
    font-style: normal;
    font-weight: 300;
    line-height: 12px;
    letter-spacing: 0.01em;
    text-align: left;
  }
`;
