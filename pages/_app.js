import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import store from '../data/store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import 'reset-css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </CookiesProvider>
    </Provider>
  );
}

export default MyApp;
