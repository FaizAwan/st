"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import useAuthentication from "@/hooks/useAuthentication";
import Link from "next/link";
import Image from 'next/image'

import { AuthContext } from "@/provider/AuthProvider";
import { useProfilePasswordValidation, useProfileValidation } from "@/validationSchema/profile";
import { updatePassword, updateProfile } from "firebase/auth";
import { useState } from "react";

const ReturnSales = () => {
    useAuthentication();
    const {handleSubmit,register, formState:{errors}} = useProfileValidation();

    const {handleSubmit:passwordHandleSubmit, register: registerPassword, formState:{errors:passwordErrors}} = useProfilePasswordValidation();
    const {user}:any = AuthContext();

    const [visibleForm, setVisibility] = useState<any>();

    const userInfo = user.user;

    const submitForm = async({name, photo}:{name ?:string | null, photo ?:string | null }) => {
        if(name && photo){
            updateProfile(userInfo,{
                displayName:name,
                photoURL:photo
            }).then((response)=>{
                console.log("profile updated");
                setVisibility("");
            }).catch((e)=>{
                console.log("failed to update profile ",e.message)
            })
        }
    }

    const submitPasswordForm  = ({password}:{password?:string|null}) =>{
        if(password){
            updatePassword(userInfo,password).then((response)=>{
                console.log("password changed");
                setVisibility("");
            }).catch((e)=>{
                console.log("failed to changes password ",e.message)
            })
        }
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
                          <a href="" className="list-group-item list-group-item-action">
                            <div className="msg-body">
                              <div className="msg-content">
                                <h3 className="title"><i className="la la-shopping-cart mr-2" />Return Sales List</h3>
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
                  <h2 className="sec__title font-size-30 text-white">Return Sales List</h2>
                </div>
              </div>{/* end breadcrumb-content */}
            </div>{/* end col-lg-6 */}
            <div className="col-lg-6">
              <div className="breadcrumb-list text-right">
                <ul className="list-items">
                  <li><a href="index.html" className="text-white">Home</a></li>
                  <li>Dashboard</li>
                  <li>Return Sales List</li>
                </ul>
              </div>{/* end breadcrumb-list */}
            </div>{/* end col-lg-6 */}
          </div>{/* end row */}
        </div>
      </div>{/* end dashboard-bread */}
      <div  className="dashboard-main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-box">
                <div className="form-title-wrap">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h3 className="title">Return Sale Lists</h3>
                      <p className="font-size-14">Showing 1 to 8 of 20 results</p>
                    </div>
                    <div className="select-contain">
                        <Link href="addSale" className="btn btn-primary">Add ReturnSales</Link>
                    </div>
                  </div>
                </div>
                <div className="form-content">
                  <div className="table-form table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Reference No</th>
                          <th scope="col">Bill No</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Bill Amount</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">alexsmith@gmail.com</th>
                          <td>
                            <div className="table-content">
                              <h3 className="title">Alex Smith</h3>
                            </div>
                          </td>
                          <td>Trip of New York – Discover America</td>
                          <td>$399</td>
                          <td>PayPal</td>
                          <td><span className="badge badge-success py-1 px-2">Completed</span></td>
                          <td>
                            <div className="table-content">
                              <a href="admin-dashboard-orders-details.html" className="theme-btn theme-btn-small mr-2" data-toggle="tooltip" data-placement="top" title="View details"><i className="la la-eye" /></a>
                              <a href="#" className="theme-btn theme-btn-small" data-toggle="modal" data-target="#modalPopup"><i className="la la-envelope" /></a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">markhardson@gmail.com</th>
                          <td>
                            <div className="table-content">
                              <h3 className="title">Mark Hardson</h3>
                            </div>
                          </td>
                          <td>America’s National Parks with Denver</td>
                          <td>$399</td>
                          <td>Payoneer</td>
                          <td><span className="badge badge-warning text-white py-1 px-2">Pending</span></td>
                          <td>
                            <div className="table-content">
                              <a href="admin-dashboard-orders-details.html" className="theme-btn theme-btn-small mr-2" data-toggle="tooltip" data-placement="top" title="View details"><i className="la la-eye" /></a>
                              <a href="#" className="theme-btn theme-btn-small" data-toggle="modal" data-target="#modalPopup"><i className="la la-envelope" /></a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">davidmartin@gmail.com</th>
                          <td>
                            <div className="table-content">
                              <h3 className="title">David Martin</h3>
                            </div>
                          </td>
                          <td>Eastern Discovery Start New Orleans</td>
                          <td>$399</td>
                          <td>Skrill</td>
                          <td><span className="badge badge-info py-1 px-2">On Hold</span></td>
                          <td>
                            <div className="table-content">
                              <a href="admin-dashboard-orders-details.html" className="theme-btn theme-btn-small mr-2" data-toggle="tooltip" data-placement="top" title="View details"><i className="la la-eye" /></a>
                              <a href="#" className="theme-btn theme-btn-small" data-toggle="modal" data-target="#modalPopup"><i className="la la-envelope" /></a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">johndoe@gmail.com</th>
                          <td>
                            <div className="table-content">
                              <h3 className="title">John Doe</h3>
                            </div>
                          </td>
                          <td>New york to Beijing</td>
                          <td>$399</td>
                          <td>PayPal</td>
                          <td><span className="badge badge-danger py-1 px-2">Delayed</span></td>
                          <td>
                            <div className="table-content">
                              <a href="admin-dashboard-orders-details.html" className="theme-btn theme-btn-small mr-2" data-toggle="tooltip" data-placement="top" title="View details"><i className="la la-eye" /></a>
                              <a href="#" className="theme-btn theme-btn-small" data-toggle="modal" data-target="#modalPopup"><i className="la la-envelope" /></a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">joshpurdil@gmail.com</th>
                          <td>
                            <div className="table-content">
                              <h3 className="title">Josh Purdila</h3>
                            </div>
                          </td>
                          <td>Los Angeles to San Francisco Express</td>
                          <td>$399</td>
                          <td>PayPal</td>
                          <td><span className="badge badge-success py-1 px-2">Completed</span></td>
                          <td>
                            <div className="table-content">
                              <a href="admin-dashboard-orders-details.html" className="theme-btn theme-btn-small mr-2" data-toggle="tooltip" data-placement="top" title="View details"><i className="la la-eye" /></a>
                              <a href="#" className="theme-btn theme-btn-small" data-toggle="modal" data-target="#modalPopup"><i className="la la-envelope" /></a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">kamranadi@gmail.com</th>
                          <td>
                            <div className="table-content">
                              <h3 className="title">Kamran Adi</h3>
                            </div>
                          </td>
                          <td>Istanbul to Dhaka</td>
                          <td>$399</td>
                          <td>PayPal</td>
                          <td><span className="badge badge-success py-1 px-2">Completed</span></td>
                          <td>
                            <div className="table-content">
                              <a href="admin-dashboard-orders-details.html" className="theme-btn theme-btn-small mr-2" data-toggle="tooltip" data-placement="top" title="View details"><i className="la la-eye" /></a>
                              <a href="#" className="theme-btn theme-btn-small" data-toggle="modal" data-target="#modalPopup"><i className="la la-envelope" /></a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">markdoe@gmail.com</th>
                          <td>
                            <div className="table-content">
                              <h3 className="title">Mark Doe</h3>
                            </div>
                          </td>
                          <td>London to Dubai</td>
                          <td>$399</td>
                          <td>Neteller</td>
                          <td><span className="badge badge-success py-1 px-2">Completed</span></td>
                          <td>
                            <div className="table-content">
                              <a href="admin-dashboard-orders-details.html" className="theme-btn theme-btn-small mr-2" data-toggle="tooltip" data-placement="top" title="View details"><i className="la la-eye" /></a>
                              <a href="#" className="theme-btn theme-btn-small" data-toggle="modal" data-target="#modalPopup"><i className="la la-envelope" /></a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">brendoneich@gmail.com</th>
                          <td>
                            <div className="table-content">
                              <h3 className="title">Brendon Eich</h3>
                            </div>
                          </td>
                          <td>New York: Museum of Modern Art</td>
                          <td>$399</td>
                          <td>Stripe</td>
                          <td><span className="badge badge-success py-1 px-2">Completed</span></td>
                          <td>
                            <div className="table-content">
                              <a href="admin-dashboard-orders-details.html" className="theme-btn theme-btn-small mr-2" data-toggle="tooltip" data-placement="top" title="View details"><i className="la la-eye" /></a>
                              <a href="#" className="theme-btn theme-btn-small" data-toggle="modal" data-target="#modalPopup"><i className="la la-envelope" /></a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>{/* end form-box */}
            </div>{/* end col-lg-12 */}
          </div>{/* end row */}
          <div className="row">
            <div className="col-lg-12">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link page-link-nav" href="#" aria-label="Previous">
                      <span aria-hidden="true"><i className="la la-angle-left" /></span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link page-link-nav" href="#">1</a></li>
                  <li className="page-item active">
                    <a className="page-link page-link-nav" href="#">2 <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="page-item"><a className="page-link page-link-nav" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link page-link-nav" href="#" aria-label="Next">
                      <span aria-hidden="true"><i className="la la-angle-right" /></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="border-top mt-5" />
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="copy-right padding-top-30px">
                <p className="copy__desc">
                  © Copyright SadafTraders. Made with
                  <span className="la la-hand-rock-o" /> by <a href="https://smartestdevelopers.com">SmartestDevelopers</a>
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

export default ReturnSales;