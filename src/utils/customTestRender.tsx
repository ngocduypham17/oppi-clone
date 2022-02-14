import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import ThemeProvider from '../themes';
import GlobalStyles from '../themes/GlobalStyles';
import store from '../store';

const AllTheProviders: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
