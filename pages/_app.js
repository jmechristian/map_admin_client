import '../styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import store from '../data/store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import '../styles/globals.css';

import 'reset-css';

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    colors: {
      brand: {
        900: '#d31b5d',
      },
    },
  });

  return (
    <Provider store={store}>
      <CookiesProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </CookiesProvider>
    </Provider>
  );
}

export default MyApp;
