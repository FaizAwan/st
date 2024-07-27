"use client";
import { HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { AuthContext } from "@/provider/AuthProvider";
import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import LeftNavigation from "./LeftNavigation";

const Header = () => {
    const {user}:any = AuthContext();
    const router = useRouter();
    const logOut = () => {
        signOut(auth).then((response)=>{
            router.push(LOGIN_ROUTE);
        }).catch((e)=>{
            console.log("Logout Catch ",e.message)
        })
    }

    return (
  
  <div className="sidebar-nav sidebar--nav">
    <div className="sidebar-nav-body">
      <div className="side-menu-close">
        <i className="la la-times" />
      </div>{/* end menu-toggler */}
      <div className="author-content">
        <div className="d-flex align-items-center">
          <div className="author-img avatar-sm">
            
          </div>
          <div className="author-bio">
            <h4 className="author__title">SADAF-TRADERS</h4>
            <span className="author__meta">Admin</span>
          </div>
        </div>
      </div>
      <div className="sidebar-menu-wrap">
        <LeftNavigation/>
      </div>
    </div>
  </div>


    )
}

export default Header;