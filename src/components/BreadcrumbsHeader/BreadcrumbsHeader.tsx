import React from 'react';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Container,
  StyledBreadcrumbs,
  Text,
  LinkText,
} from './styles';

interface IBreadcrumbsHeaderItem {
  data: any
}

const BreadcrumbsHeader = ({ data }: IBreadcrumbsHeaderItem) => {
  return (
    <Container>
      <StyledBreadcrumbs separator={<NavigateNextIcon htmlColor="#212121" />} aria-label="breadcrumb">
        {data.map((item) => {
          if (item) {
            return (
              <Link key={item} to={item}>
                <LinkText>{item}</LinkText>
              </Link>
            );
          }
          return (
            <Text key={item}>{item}</Text>
          );
        })}
      </StyledBreadcrumbs>
    </Container>
  );
};

export default React.memo(BreadcrumbsHeader);
