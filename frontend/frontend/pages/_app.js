import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { setupInterceptors } from '../lib/axios'
import { wrapper } from '../lib/store'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  const store = useStore();
  setupInterceptors(store)

  return <PersistGate persistor={store.__PERSISTOR} loading={null}>

   {getLayout(<Component {...pageProps} />)}
   </PersistGate>
}

export default wrapper.withRedux(MyApp)
