"use client";
import { HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { AuthContext } from "@/provider/AuthProvider";
import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Script from "next/script";

const Footer = () => {
  const { user }: any = AuthContext();
  const router = useRouter();
  const logOut = () => {
    signOut(auth)
      .then((response) => {
        router.push(LOGIN_ROUTE);
      })
      .catch((e) => {
        console.log("Logout Catch ", e.message);
      });
  };

  return (
    <div>
      <footer className="iq-footer">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <a href="privacy-policy.html">Privacy Policy</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="terms-of-service.html">Terms of Use</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6 text-right">
                  <span className="mr-1">©</span> <a href="#">SadafTraders Dashboard</a>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Script src="template/assets/js/backend-bundle.min.js" strategy="lazyOnload" />
      <Script src="template/assets/js/table-treeview.js" strategy="lazyOnload" />
      <Script src="template/assets/js/customizer.js" strategy="lazyOnload" />
      <Script src="template/assets/js/chart-custom.js" strategy="lazyOnload" />
      <Script src="template/assets/js/app.js" strategy="lazyOnload" />
    </div>
  );
};

export default Footer;
