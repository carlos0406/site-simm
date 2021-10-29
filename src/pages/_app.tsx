import type { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/global'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HeaderComponent } from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <HeaderComponent/>
     <GlobalStyle/>
     <Component {...pageProps} />
      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable/>
    </>
  )
}
export default MyApp
