"use client";
import Image from 'next/image'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import { database } from '../services/firebase'; // Ensure the path is correct
import { ref, push, set } from 'firebase/database';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter()
  const [cars, setCars] = useState<Car[]>([]);
  const makes = ['Toyota', 'Honda', 'Ford']; // Example list of makes

  interface Car {
    model_id: string;
    model_name: string;
    badge?: string;
    category: string;
    rating: number;
    numReviews: number;
    passengers: number;
    luggage: number;
    price: number;
  }

  interface FormValues {
    fromAddress: string;
    toAddress: string;
    pickUpDate: string;
    pickUpTime: string;
    dropOffDate: string;
    dropOffTime: string;
  }

  const [formValues, setFormValues] = useState<FormValues>({
    fromAddress: '',
    toAddress: '',
    pickUpDate: '',
    pickUpTime: '0900AM',
    dropOffDate: '',
    dropOffTime: '0900AM',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newPickupRef = ref(database, 'pickups');
      const newRef = push(newPickupRef); // Generate a new reference with a unique key
      await set(newRef, formValues);
      alert('Form submitted successfully!');
       router.push('/car-list');

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };


  return (


<section className="dashboard-area">
  <div className="dashboard-nav dashboard--nav">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="menu-wrapper">
            <div className="logo mr-5">
              <a href="/">Sadaf Traders</a>
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
        objectFit="cover"  />
                                  
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
                              <Image alt="tagLine"src="/template/images/team9.jpg"  layout="fill" 
        objectFit="cover" />
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
        objectFit="cover" />
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
                                  <Image alt="tagLine"src="/template/images/team11.jpg" layout="fill" 
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
                        <div className="avatar avatar-sm flex-shrink-0 mr-2"><Image alt="tagLine" layout="fill" 
        objectFit="cover"  src="/template/images/team8.jpg" /></div>
                        <span className="font-size-14 font-weight-bold">Admin</span>
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
                              <h3 className="title"><i className="la la-shopping-cart mr-2" />Orders</h3>
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
    <div className="dashboard-bread dashboard-bread-2">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="breadcrumb-content">
              <div className="section-heading">
                <h2 className="sec__title font-size-30 text-white">Dashboard</h2>
              </div>
            </div>{/* end breadcrumb-content */}
          </div>{/* end col-lg-6 */}
          <div className="col-lg-6">
            <div className="breadcrumb-list text-right">
              <ul className="list-items">
                <li><a href="index.html" className="text-white">Home</a></li>
                <li>Pages</li>
                <li>Dashboard</li>
              </ul>
            </div>{/* end breadcrumb-list */}
          </div>{/* end col-lg-6 */}
        </div>{/* end row */}
        <div className="row mt-4">
          <div className="col-lg-3 responsive-column-l">
            <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
              <div className="d-flex pb-3 justify-content-between">
                <div className="info-content">
                  <p className="info__desc">Total Sales</p>
                  <h4 className="info__title">55</h4>
                </div>{/* end info-content */}
                <div className="info-icon icon-element bg-4">
                  <i className="la la-shopping-cart" />
                </div>{/* end info-icon*/}
              </div>
              <div className="section-block" />
              <a href="saleListing" className="d-flex align-items-center justify-content-between view-all">View All <i className="la la-angle-right" /></a>
            </div>
          </div>{/* end col-lg-3 */}
          <div className="col-lg-3 responsive-column-l">
            <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
              <div className="d-flex pb-3 justify-content-between">
                <div className="info-content">
                  <p className="info__desc">Total Purchase</p>
                  <h4 className="info__title">22</h4>
                </div>{/* end info-content */}
                <div className="info-icon icon-element bg-3">
                  <i className="la la-star" />
                </div>{/* end info-icon*/}
              </div>
              <div className="section-block" />
              <a href="admin-dashboard-reviews.html" className="d-flex align-items-center justify-content-between view-all">View All <i className="la la-angle-right" /></a>
            </div>
          </div>{/* end col-lg-3 */}
          <div className="col-lg-3 responsive-column-l">
            <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
              <div className="d-flex pb-3 justify-content-between">
                <div className="info-content">
                  <p className="info__desc">Total Receivings</p>
                  <h4 className="info__title">27</h4>
                </div>{/* end info-content */}
                <div className="info-icon icon-element bg-2">
                  <i className="la la-envelope" />
                </div>{/* end info-icon*/}
              </div>
              <div className="section-block" />
              <a href="admin-dashboard-subscribers.html" className="d-flex align-items-center justify-content-between view-all">View All <i className="la la-angle-right" /></a>
            </div>
          </div>{/* end col-lg-3 */}
          <div className="col-lg-3 responsive-column-l">
            <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
              <div className="d-flex pb-3 justify-content-between">
                <div className="info-content">
                  <p className="info__desc">Total Profit</p>
                  <h4 className="info__title">25</h4>
                </div>{/* end info-content */}
                <div className="info-icon icon-element bg-1">
                  <i className="la la-bookmark-o" />
                </div>{/* end info-icon*/}
              </div>
              <div className="section-block" />
              <a href="admin-dashboard-wishlist.html" className="d-flex align-items-center justify-content-between view-all">View All <i className="la la-angle-right" /></a>
            </div>
          </div>{/* end col-lg-3 */}
        </div>{/* end row */}
      </div>
    </div>{/* end dashboard-bread */}
    <div  className="dashboard-main-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-7 responsive-column--m">
            <div className="form-box">
              <div className="form-title-wrap">
                <div className="d-flex align-items-center justify-content-between">
                  <ul className="chart-pagination d-flex">
                    <li><a href="#" className="theme-btn theme-btn-small mr-2">Day</a></li>
                    <li><a href="#" className="theme-btn theme-btn-small theme-btn-transparent mr-2">Week</a></li>
                    <li><a href="#" className="theme-btn theme-btn-small theme-btn-transparent">This year</a></li>
                  </ul>
                  <div className="select-contain">
                    <select className="select-contain-select">
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-content">
                <canvas id="line-chart" />
              </div>
            </div>{/* end form-box */}
          </div>{/* end col-lg-7*/}
          <div className="col-lg-5 responsive-column--m">
            <div className="form-box dashboard-card">
              <div className="form-title-wrap">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="title">Notifications</h3>
                  <button type="button" className="icon-element mark-as-read-btn ml-auto mr-0" data-toggle="tooltip" data-placement="left" title="Mark all as read">
                    <i className="la la-check-square" />
                  </button>
                </div>
              </div>
              <div className="form-content p-0">
                <div className="list-group drop-reveal-list">
                  <a href="#" className="list-group-item list-group-item-action border-top-0">
                    <div className="msg-body d-flex align-items-center">
                      <div className="icon-element flex-shrink-0 mr-3 ml-0"><i className="la la-bell" /></div>
                      <div className="msg-content w-100">
                        <h3 className="title pb-1">Status updated</h3>
                        <p className="msg-text">2 min ago</p>
                      </div>
                      <span className="icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0" data-toggle="tooltip" data-placement="left" title="Mark as read">
                        <i className="la la-check-square" />
                      </span>
                    </div>{/* end msg-body */}
                  </a>
                  <a href="#" className="list-group-item list-group-item-action">
                    <div className="msg-body d-flex align-items-center">
                      <div className="icon-element bg-1 flex-shrink-0 mr-3 ml-0"><i className="la la-bell" /></div>
                      <div className="msg-content w-100">
                        <h3 className="title pb-1">50% Discount Offer</h3>
                        <p className="msg-text">2 min ago</p>
                      </div>
                      <span className="icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0" data-toggle="tooltip" data-placement="left" title="Mark as read">
                        <i className="la la-check-square" />
                      </span>
                    </div>{/* end msg-body */}
                  </a>
                  <a href="#" className="list-group-item list-group-item-action">
                    <div className="msg-body d-flex align-items-center">
                      <div className="icon-element bg-2 flex-shrink-0 mr-3 ml-0"><i className="la la-check" /></div>
                      <div className="msg-content w-100">
                        <h3 className="title pb-1">Your account has been created</h3>
                        <p className="msg-text">1 day ago</p>
                      </div>
                      <span className="icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0" data-toggle="tooltip" data-placement="left" title="Mark as read">
                        <i className="la la-check-square" />
                      </span>
                    </div>{/* end msg-body */}
                  </a>
                  <a href="#" className="list-group-item list-group-item-action">
                    <div className="msg-body d-flex align-items-center">
                      <div className="icon-element bg-3 flex-shrink-0 mr-3 ml-0"><i className="la la-user" /></div>
                      <div className="msg-content w-100">
                        <h3 className="title pb-1">Your account updated</h3>
                        <p className="msg-text">2 hrs ago</p>
                      </div>
                      <span className="icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0" data-toggle="tooltip" data-placement="left" title="Mark as read">
                        <i className="la la-check-square" />
                      </span>
                    </div>{/* end msg-body */}
                  </a>
                  <a href="#" className="list-group-item list-group-item-action">
                    <div className="msg-body d-flex align-items-center">
                      <div className="icon-element bg-4 flex-shrink-0 mr-3 ml-0"><i className="la la-lock" /></div>
                      <div className="msg-content w-100">
                        <h3 className="title pb-1">Your password changed</h3>
                        <p className="msg-text">Yesterday</p>
                      </div>
                      <span className="icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0" data-toggle="tooltip" data-placement="left" title="Mark as read">
                        <i className="la la-check-square" />
                      </span>
                    </div>{/* end msg-body */}
                  </a>
                  <a href="#" className="list-group-item list-group-item-action">
                    <div className="msg-body d-flex align-items-center">
                      <div className="icon-element bg-5 flex-shrink-0 mr-3 ml-0"><i className="la la-user" /></div>
                      <div className="msg-content w-100">
                        <h3 className="title pb-1">Your account updated</h3>
                        <p className="msg-text">2 hrs ago</p>
                      </div>
                      <span className="icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0" data-toggle="tooltip" data-placement="left" title="Mark as read">
                        <i className="la la-check-square" />
                      </span>
                    </div>{/* end msg-body */}
                  </a>
                </div>
              </div>
            </div>{/* end form-box */}
          </div>{/* end col-lg-5 */}
          <div className="col-lg-12">
            <div className="form-box dashboard-card">
              <div className="form-title-wrap">
                <h3 className="title">Sales earning this month for each service</h3>
              </div>
              <div className="form-content">
                <div className="row">
                  <div className="col-lg-3 responsive-column-l">
                    <div className="icon-box icon-layout-2 dashboard-icon-box dashboard--icon-box bg-1 pb-0">
                      <div className="d-flex pb-3 justify-content-between">
                        <div className="info-content">
                          <p className="info__desc">Hotels</p>
                          <h4 className="info__title">$1,455.00</h4>
                        </div>{/* end info-content */}
                        <div className="info-icon icon-element bg-white text-color-2">
                          <i className="la la-hotel" />
                        </div>{/* end info-icon*/}
                      </div>
                      <div className="section-block" />
                      <a href="#" className="d-flex align-items-center justify-content-between view-all">View Details <i className="la la-arrow-right" /></a>
                    </div>
                  </div>{/* end col-lg-3 */}
                  <div className="col-lg-3 responsive-column-l">
                    <div className="icon-box icon-layout-2 dashboard-icon-box dashboard--icon-box bg-2 pb-0">
                      <div className="d-flex pb-3 justify-content-between">
                        <div className="info-content">
                          <p className="info__desc">Cars</p>
                          <h4 className="info__title">$422.00</h4>
                        </div>{/* end info-content */}
                        <div className="info-icon icon-element bg-white text-color-3">
                          <i className="la la-car" />
                        </div>{/* end info-icon*/}
                      </div>
                      <div className="section-block" />
                      <a href="#" className="d-flex align-items-center justify-content-between view-all">View Details <i className="la la-arrow-right" /></a>
                    </div>
                  </div>{/* end col-lg-3 */}
                  <div className="col-lg-3 responsive-column-l">
                    <div className="icon-box icon-layout-2 dashboard-icon-box dashboard--icon-box bg-3 pb-0">
                      <div className="d-flex pb-3 justify-content-between">
                        <div className="info-content">
                          <p className="info__desc">Cruises</p>
                          <h4 className="info__title">$827.00</h4>
                        </div>{/* end info-content */}
                        <div className="info-icon icon-element bg-white text-color-4">
                          <i className="la la-ship" />
                        </div>{/* end info-icon*/}
                      </div>
                      <div className="section-block" />
                      <a href="#" className="d-flex align-items-center justify-content-between view-all">View Details <i className="la la-arrow-right" /></a>
                    </div>
                  </div>{/* end col-lg-3 */}
                  <div className="col-lg-3 responsive-column-l">
                    <div className="icon-box icon-layout-2 dashboard-icon-box dashboard--icon-box bg-4 pb-0">
                      <div className="d-flex pb-3 justify-content-between">
                        <div className="info-content">
                          <p className="info__desc">Flights</p>
                          <h4 className="info__title">$325.00</h4>
                        </div>{/* end info-content */}
                        <div className="info-icon icon-element bg-white text-color-5">
                          <i className="la la-plane" />
                        </div>{/* end info-icon*/}
                      </div>
                      <div className="section-block" />
                      <a href="#" className="d-flex align-items-center justify-content-between view-all">View Details <i className="la la-arrow-right" /></a>
                    </div>
                  </div>{/* end col-lg-3 */}
                </div>{/* end row */}
              </div>
            </div>{/* end form-box */}
          </div>{/* end col-lg-12 */}
          <div className="col-lg-6 responsive-column--m">
            <div className="form-box dashboard-card">
              <div className="form-title-wrap">
                <h3 className="title">Total Orders</h3>
              </div>
              <div className="form-content">
                <canvas id="bar-chart" />
              </div>
            </div>{/* end form-box */}
          </div>{/* end col-lg-6 */}
          <div className="col-lg-6 responsive-column--m">
            <div className="form-box dashboard-card">
              <div className="form-title-wrap">
                <h3 className="title">Server Stats</h3>
              </div>
              <div className="form-content pb-0">
                <div className="dashboard-progressbar pb-4">
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: '10%'}} aria-valuenow={10} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                  <p className="font-size-14 pt-1">Disk space usage: 1,746.5 / 50,000 MB</p>
                </div>{/* end dashboard-progressbar */}
                <div className="dashboard-progressbar pb-4">
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                  <p className="font-size-14 pt-1">Monthly Bandwidth Transfer: 14,706.1 / 30.000</p>
                </div>{/* end dashboard-progressbar */}
                <div className="dashboard-progressbar pb-4">
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width: '50%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                  <p className="font-size-14 pt-1">Subdomains: 7/15</p>
                </div>{/* end dashboard-progressbar */}
                <div className="dashboard-progressbar pb-4">
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{width: '75%'}} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                  <p className="font-size-14 pt-1">All SQL Databases : 6/8</p>
                </div>{/* end dashboard-progressbar */}
                <div className="dashboard-progressbar pb-4">
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{width: '100%'}} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                  <p className="font-size-14 pt-1">Email Accounts: 8 / 10</p>
                </div>{/* end dashboard-progressbar */}
              </div>
            </div>{/* end form-box */}
          </div>{/* end col-lg-6 */}
          <div className="col-lg-6 responsive-column--m">
            <div className="form-box dashboard-card">
              <div className="form-title-wrap">
                <h3 className="title">7,273 people visited this site</h3>
              </div>
              <div className="form-content pb-0">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="sparkline-chart-item">
                      <span className="font-size-15">Visits</span>
                      <h3 className="title font-size-16">9,080</h3>
                      <div className="visits-chart mt-2" />
                    </div>
                  </div>{/* end col-lg-4 */}
                  <div className="col-lg-4">
                    <div className="sparkline-chart-item">
                      <span className="font-size-15">Unique Visitors</span>
                      <h3 className="title font-size-16">4,080</h3>
                      <div className="visits-chart mt-2" />
                    </div>
                  </div>{/* end col-lg-4 */}
                  <div className="col-lg-4">
                    <div className="sparkline-chart-item">
                      <span className="font-size-15">Previews</span>
                      <h3 className="title font-size-16">12,080</h3>
                      <div className="previews-chart mt-2" />
                    </div>
                  </div>{/* end col-lg-4 */}
                  <div className="col-lg-4">
                    <div className="sparkline-chart-item">
                      <span className="font-size-15">Pages / Visit</span>
                      <h3 className="title font-size-16">1.54</h3>
                      <div className="visits-chart-2 mt-2" />
                    </div>
                  </div>{/* end col-lg-4 */}
                  <div className="col-lg-4">
                    <div className="sparkline-chart-item">
                      <span className="font-size-15">Avg. Visit Duration</span>
                      <h3 className="title font-size-16">00:01:39</h3>
                      <div className="previews-chart mt-2" />
                    </div>
                  </div>{/* end col-lg-4 */}
                </div>{/* end row */}
              </div>
            </div>{/* end form-box */}
          </div>{/* end col-lg-6 */}
          <div className="col-lg-3 responsive-column--m">
            <div className="form-box dashboard-card">
              <div className="form-title-wrap">
                <h3 className="title">Visits by Browser</h3>
              </div>
              <div className="form-content py-0">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                    Chrome
                    <span className="badge bg-info text-white badge-pill">3,506</span>
                  </li>
                  <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                    Firefox
                    <span className="badge bg-info text-white badge-pill">2,405</span>
                  </li>
                  <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                    Safari
                    <span className="badge bg-info text-white badge-pill">300</span>
                  </li>
                  <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                    Internet Explorer
                    <span className="badge bg-info text-white badge-pill">200</span>
                  </li>
                  <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                    Opera
                    <span className="badge bg-info text-white badge-pill">111</span>
                  </li>
                </ul>
              </div>
            </div>{/* end form-box */}
          </div>{/* end col-lg-3 */}
          <div className="col-lg-3 responsive-column--m">
            <div className="form-box dashboard-card">
              <div className="form-title-wrap">
                <h3 className="title">Mobile Overview</h3>
              </div>
              <div className="form-content py-0">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                    Desktop
                    <span className="badge bg-info text-white badge-pill">6,506</span>
                  </li>
                  <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                    Mobile
                    <span className="badge bg-info text-white badge-pill">222</span>
                  </li>
                  <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                    Tablet
                    <span className="badge bg-info text-white badge-pill">65</span>
                  </li>
                </ul>
              </div>
            </div>{/* end form-box */}
          </div>{/* end col-lg-3 */}
        </div>{/* end row */}
        <div className="border-top mt-4" />
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="copy-right padding-top-30px">
              <p className="copy__desc">
                © Copyright SadafTraders 2024. Developed By
                 by <a target="_blank" href="https://smartestdevelopers.com">SmartestDevelopers</a>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


  )
}
