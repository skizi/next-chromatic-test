import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';

if (process.env.NODE_ENV === 'development') {
  if (typeof window === 'undefined') {
    const { server } = require('../mocks/server');
    server.listen();
  } else {
    const { worker } = require('../mocks/browser');
    worker.start();
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
