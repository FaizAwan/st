"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import { LOGIN_ROUTE, PROFILE_ROUTE } from "@/constants/routes";
import useAuthentication from "@/hooks/useAuthentication";
import { auth } from "@/services/firebase";
import { registerValidation } from "@/validationSchema/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import Image from 'next/image'

import { useRouter } from "next/navigation";

const Register = () => {
    const router = useRouter();
    useAuthentication();
    const { handleSubmit, register, formState:{errors}, reset} = registerValidation();
    const submitForm = async(values:any) => {
        console.log("Register form values",values)
        createUserWithEmailAndPassword(auth,values.email,values.password).then((response)=>{
            alert("User Register Successfully");
            reset();
            router.push(PROFILE_ROUTE)
        }).catch(e=>{
            console.log("catch ",e.message);
            alert("Something went wrong please try again");
        })
    }

    return (



        

<div>
  <section className="dashboard-area">
    <div className="dashboard-nav dashboard--nav">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="menu-wrapper">
              <div className="logo mr-5">
                <a href="index.html">SADAF TRADERS</a>
                <div className="menu-toggler">
                  <i className="la la-bars" />
                  <i className="la la-times" />
                </div>{/* end menu-toggler */}
                <div className="user-menu-open">
                  <i className="la la-user" />
                </div>{/* end user-menu-open */}
              </div>
              <div className="dashboard-search-box">
                <div className="contact-form-action">
                  <form action="#">
                    <div className="form-group mb-0">
                      <input className="form-control" type="text" name="text" placeholder="Search" />
                      <button className="search-btn"><i className="la la-search" /></button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="nav-btn ml-auto">
                <div className="notification-wrap d-flex align-items-center">
                  <div className="notification-item mr-2">
                    <div className="dropdown">
                      <a href="#" className="dropdown-toggle drop-reveal-toggle-icon" id="notificationDropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="la la-bell" />
                        <span className="noti-count">4</span>
                      </a>
                      <div className="dropdown-menu dropdown-reveal dropdown-menu-xl dropdown-menu-right">
                        <div className="dropdown-header drop-reveal-header">
                          <h6 className="title">You have <strong className="text-black">4</strong> notifications</h6>
                        </div>
                        <div className="list-group drop-reveal-list">
                          <a href="#" className="list-group-item list-group-item-action">
                            <div className="msg-body d-flex align-items-center">
                              <div className="icon-element flex-shrink-0 mr-3 ml-0"><i className="la la-bell" /></div>
                              <div className="msg-content w-100">
                                <h3 className="title pb-1">Your request has been sent</h3>
                                <p className="msg-text">2 min ago</p>
                              </div>
                            </div>{/* end msg-body */}
                          </a>
                          <a href="#" className="list-group-item list-group-item-action">
                            <div className="msg-body d-flex align-items-center">
                              <div className="icon-element bg-2 flex-shrink-0 mr-3 ml-0"><i className="la la-check" /></div>
                              <div className="msg-content w-100">
                                <h3 className="title pb-1">Your account has been created</h3>
                                <p className="msg-text">1 day ago</p>
                              </div>
                            </div>{/* end msg-body */}
                          </a>
                          <a href="#" className="list-group-item list-group-item-action">
                            <div className="msg-body d-flex align-items-center">
                              <div className="icon-element bg-3 flex-shrink-0 mr-3 ml-0"><i className="la la-user" /></div>
                              <div className="msg-content w-100">
                                <h3 className="title pb-1">Your account updated</h3>
                                <p className="msg-text">2 hrs ago</p>
                              </div>
                            </div>{/* end msg-body */}
                          </a>
                          <a href="#" className="list-group-item list-group-item-action">
                            <div className="msg-body d-flex align-items-center">
                              <div className="icon-element bg-4 flex-shrink-0 mr-3 ml-0"><i className="la la-lock" /></div>
                              <div className="msg-content w-100">
                                <h3 className="title pb-1">Your password changed</h3>
                                <p className="msg-text">Yesterday</p>
                              </div>
                            </div>{/* end msg-body */}
                          </a>
                        </div>
                        <a href="#" className="dropdown-item drop-reveal-btn text-center">View all</a>
                      </div>{/* end dropdown-menu */}
                    </div>
                  </div>{/* end notification-item */}
                  <div className="notification-item mr-2">
                    <div className="dropdown">
                      <a href="#" className="dropdown-toggle drop-reveal-toggle-icon" id="messageDropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="la la-envelope" />
                        <span className="noti-count">4</span>
                      </a>
                      <div className="dropdown-menu dropdown-reveal dropdown-menu-xl dropdown-menu-right">
                        <div className="dropdown-header drop-reveal-header">
                          <h6 className="title">You have <strong className="text-black">4</strong> messages</h6>
                        </div>
                        <div className="list-group drop-reveal-list">
                          <a href="#" className="list-group-item list-group-item-action">
                            <div className="msg-body d-flex align-items-center">
                              <div className="avatar flex-shrink-0 mr-3">
                                <Image alt="tagLine"src="/template/images/team8.jpg"  layout="fill" 
        objectFit="cover"/> 
                              </div>
                              <div className="msg-content w-100">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h3 className="title pb-1">Steve Wornder</h3>
                                  <span className="msg-text">3 min ago</span>
                                </div>
                                <p className="msg-text">Ancillae delectus necessitatibus no eam</p>
                              </div>
                            </div>{/* end msg-body */}
                          </a>
                          <a href="#" className="list-group-item list-group-item-action">
                            <div className="msg-body d-flex align-items-center">
                              <div className="avatar flex-shrink-0 mr-3">
                                <Image alt="tagLine"src="/template/images/team9.jpg" layout="fill" 
        objectFit="cover"   />
                              </div>
                              <div className="msg-content w-100">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h3 className="title pb-1">Marc Twain</h3>
                                  <span className="msg-text">1 hrs ago</span>
                                </div>
                                <p className="msg-text">Ancillae delectus necessitatibus no eam</p>
                              </div>
                            </div>{/* end msg-body */}
                          </a>
                          <a href="#" className="list-group-item list-group-item-action">
                            <div className="msg-body d-flex align-items-center">
                              <div className="avatar flex-shrink-0 mr-3">
                                <Image alt="tagLine"src="/template/images/team10.jpg"  layout="fill" 
        objectFit="cover"  />
                              </div>
                              <div className="msg-content w-100">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h3 className="title pb-1">Enzo Ferrari</h3>
                                  <span className="msg-text">2 hrs ago</span>
                                </div>
                                <p className="msg-text">Ancillae delectus necessitatibus no eam</p>
                              </div>
                            </div>{/* end msg-body */}
                          </a>
                          <a href="#" className="list-group-item list-group-item-action">
                            <div className="msg-body d-flex align-items-center">
                              <div className="avatar flex-shrink-0 mr-3">
                                <Image alt="tagLine"src="/template/images/team11.jpg"  layout="fill" 
        objectFit="cover" />
                              </div>
                              <div className="msg-content w-100">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h3 className="title pb-1">Lucas Swing</h3>
                                  <span className="msg-text">3 hrs ago</span>
                                </div>
                                <p className="msg-text">Ancillae delectus necessitatibus no eam</p>
                              </div>
                            </div>{/* end msg-body */}
                          </a>
                        </div>
                        <a href="#" className="dropdown-item drop-reveal-btn text-center">View all</a>
                      </div>{/* end dropdown-menu */}
                    </div>
                  </div>{/* end notification-item */}
                  <div className="notification-item">
                    <div className="dropdown">
                      <a href="#" className="dropdown-toggle" id="userDropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-sm flex-shrink-0 mr-2"><Image alt="tagLine"src="/template/images/team8.jpg"  layout="fill" 
        objectFit="cover"  /></div>
                          <span className="font-size-14 font-weight-bold">Royel Admin</span>
                        </div>
                      </a>
                      <div className="dropdown-menu dropdown-reveal dropdown-menu-md dropdown-menu-right">
                        <div className="dropdown-item drop-reveal-header user-reveal-header">
                          <h6 className="title text-uppercase">Welcome!</h6>
                        </div>
                        <div className="list-group drop-reveal-list user-drop-reveal-list">
                          <a href="admin-dashboard-settings.html" className="list-group-item list-group-item-action">
                            <div className="msg-body">
                              <div className="msg-content">
                                <h3 className="title"><i className="la la-user mr-2" /> Edit Profile</h3>
                              </div>
                            </div>{/* end msg-body */}
                          </a>
                          <a href="admin-dashboard-orders.html" className="list-group-item list-group-item-action">
                            <div className="msg-body">
                              <div className="msg-content">
                                <h3 className="title"><i className="la la-shopping-cart mr-2" />Customers</h3>
                              </div>
                            </div>{/* end msg-body */}
                          </a>
                          <a href="#" className="list-group-item list-group-item-action">
                            <div className="msg-body">
                              <div className="msg-content">
                                <h3 className="title"><i className="la la-bell mr-2" />Messages</h3>
                              </div>
                            </div>{/* end msg-body */}
                          </a>
                          <a href="admin-dashboard-settings.html" className="list-group-item list-group-item-action">
                            <div className="msg-body">
                              <div className="msg-content">
                                <h3 className="title"><i className="la la-gear mr-2" />Settings</h3>
                              </div>
                            </div>{/* end msg-body */}
                          </a>
                          <div className="section-block" />
                          <a href="index.html" className="list-group-item list-group-item-action">
                            <div className="msg-body">
                              <div className="msg-content">
                                <h3 className="title"><i className="la la-power-off mr-2" />Logout</h3>
                              </div>
                            </div>{/* end msg-body */}
                          </a>
                        </div>
                      </div>{/* end dropdown-menu */}
                    </div>
                  </div>{/* end notification-item */}
                </div>
              </div>{/* end nav-btn */}
            </div>{/* end menu-wrapper */}
          </div>{/* end col-lg-12 */}
        </div>{/* end row */}
      </div>{/* end container-fluid */}
    </div>{/* end dashboard-nav */}
    <div className="dashboard-content-wrap">
      <div className="dashboard-bread dashboard--bread dashboard-bread-2">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="breadcrumb-content">
                <div className="section-heading">
                  <h2 className="sec__title font-size-30 text-white">Add Customer</h2>
                </div>
              </div>{/* end breadcrumb-content */}
            </div>{/* end col-lg-6 */}
            <div className="col-lg-6">
              <div className="breadcrumb-list text-right">
                <ul className="list-items">
                  <li><a href="/" className="text-white">Home</a></li>
                  <li>Dashboard</li>
                  <li>Customers</li>
                </ul>
              </div>{/* end breadcrumb-list */}
            </div>{/* end col-lg-6 */}
          </div>{/* end row */}
        </div>
      </div>{/* end dashboard-bread */}
      <div   className="dashboard-main-content">
        <div className="container-fluid">
        <section className="listing-form section--padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-9 mx-auto">
          <div className="listing-header pb-4">
            <h3 className="title font-size-28 pb-2">Add Customer Form</h3>
          </div>
          <div className="form-box">
            <div className="form-title-wrap">
              <h3 className="title"><i className="la la-user mr-2 text-gray" />Customer information</h3>
            </div>{/* form-title-wrap */}
            <div className="form-content contact-form-action">

            <div className="">
                    <span className="">Welcome To Register</span>
                </div>
                <form onSubmit={handleSubmit(submitForm)} className="h-full w-1/2 mx-auto ">
                    <InputField
                        register={register}
                        error={errors.email}
                        type="text"
                        placeholder="Enter Your Email Here..."
                        name="email"
                        label="Email"
                    />
                    <InputField
                        register={register}
                        error={errors.password}
                        type="password"
                        placeholder="Enter Your Password Here..."
                        name="password"
                        label="Password"
                    />
                    <InputField
                        register={register}
                        error={errors.cnfPassword}
                        type="password"
                        placeholder="Enter Your Confirm Password Here..."
                        name="cnfPassword"
                        label="Confirm Password"
                    />
                    <SubmitButton label="Submit" />
                </form>
                <div className="h-20 mx-auto">
                    <span className="text-sm text-gray-600">Already have account?  
                        <Link href={LOGIN_ROUTE}><span className="text-blue-500 font-semibold text-md" > Login Here</span></Link>
                    </span>
                </div>
            </div>{/* end form-content */}
          </div>{/* end form-box */}
          

        </div>{/* end col-lg-9 */}
      </div>{/* end row */}
    </div>{/* end container */}
  </section>{/* end listing-form */}
          <div className="border-top mt-5" />
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="copy-right padding-top-30px">
                <p className="copy__desc">
                  © Copyright Sadaftraders 2024. Developed by
                  <a target="_blank" href="">Smartest Developers</a>
                </p>
              </div>{/* end copy-right */}
            </div>{/* end col-lg-7 */}
            <div className="col-lg-5">
              <div className="copy-right-content text-right padding-top-30px">
                <ul className="social-profile">
                  <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                  <li><a href="#"><i className="lab la-twitter" /></a></li>
                  <li><a href="#"><i className="lab la-instagram" /></a></li>
                  <li><a href="#"><i className="lab la-linkedin-in" /></a></li>
                </ul>
              </div>{/* end copy-right-content */}
            </div>{/* end col-lg-5 */}
          </div>{/* end row */}
        </div>{/* end container-fluid */}
      </div>{/* end dashboard-main-content */}
    </div>{/* end dashboard-content-wrap */}
  </section>{/* end dashboard-area */}
  {/* ================================
    END DASHBOARD AREA
================================= */}
  {/* start scroll top */}
  <div id="back-to-top">
    <i className="la la-angle-up" title="Go top" />
  </div>
</div>

    )
}

export default Register;