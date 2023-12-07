import Header from "@/components/Header";
import Footer from "@/components/Footer"
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Layout = ({children}) => {

    const router = useRouter()

   



    return ( <>
    {router.pathname =="/" || router.pathname == "/forgot"?<>{children}</> :<div class="page">
  <div class="page-main"><Header />
    <div>
    <Sidebar />{children}
    </div></div>
    <Footer />
    </div>}
    </> );
}
 
export default Layout;