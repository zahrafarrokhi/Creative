import { wrapper } from '../lib/store'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

export default wrapper.withRedux(MyApp)
