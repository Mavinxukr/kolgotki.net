import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import createStore from '../redux/store';

const MyApp = ({ Component, pageProps, store }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  return { pageProps };
};

export default withRedux(createStore)(MyApp);