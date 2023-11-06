import '@/styles/globals.css'
import '@/styles/closed-sidemenu.css'
import '@/styles/perfect-scrollbar.css'
import Layout from './Layout'


export default function App({ Component, pageProps }) {
  return(<>
  
  <Layout >
    
  <Component {...pageProps} /></Layout></>)
}
