import styled from 'styled-components';
import { Breadcrumbs, Typography } from '@mui/material';

export const Container = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const StyledBreadcrumbs = styled(Breadcrumbs)`


  .MuiBreadcrumbs-separator {
    margin: 0;
` as typeof Breadcrumbs;

export const Text = styled(Typography)`
  font-size: 16px;
  color: #212121;
` as typeof Typography;

export const LinkText = styled(Text)`

  text-decoration-line: none;
  font-weight: 600;
` as typeof Typography;
