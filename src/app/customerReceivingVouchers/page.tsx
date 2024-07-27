"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import Link from "next/link";
import Image from 'next/image'

import useAuthentication from "@/hooks/useAuthentication";
import { AuthContext } from "@/provider/AuthProvider";
import { useProfilePasswordValidation, useProfileValidation } from "@/validationSchema/profile";
import { updatePassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const CustomerReceivingVouchers = () => {
    useAuthentication();
    const {handleSubmit,register, formState:{errors}} = profileValidation();
    const [customers, setCustomers] = useState<any[]>([]);

    const {handleSubmit:passwordHandleSubmit, register: registerPassword, formState:{errors:passwordErrors}} = profilePasswordValidation();
    const {user}:any = AuthContext();

    const [visibleForm, setVisibility] = useState<any>();

    const userInfo = user.user;

    useEffect(() => {
      const db = getDatabase();
      const customersRef = ref(db, 'customers/');
      onValue(customersRef, (snapshot) => {
        const data = snapshot.val();
        const customersList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setCustomers(customersList);
      });
    }, []);

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
                  <h2 className="sec__title font-size-21 text-white">SUPPLIER     PAYMENT     VOUCHER (DEBIT)</h2>
                </div>
              </div>{/* end breadcrumb-content */}
            </div>{/* end col-lg-6 */}
            <div className="col-lg-6">
              <div className="breadcrumb-list text-right">
                <ul className="list-items">
                  <li><a href="/" className="text-white">Home</a></li>
                  <li>Suppiler Payment Vouchers</li>
                </ul>
              </div>{/* end breadcrumb-list */}
            </div>{/* end col-lg-6 */}
          </div>{/* end row */}
        </div>
      </div>{/* end dashboard-bread */}
      <div   className="dashboard-main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-box">
                <div className="form-title-wrap">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h3 className="title">Supplier Payment Vouchers Lists</h3>
                      <p className="font-size-14">Showing 1 to 8 of 20 results</p>
                    </div>
                    <div className="select-contain">
                      <Link href="addcustomer" className="btn btn-primary"> Add Customer </Link>
                    </div>
                  </div>
                </div>
                <div className="form-content">
                  <div className="table-form table-responsive">
      <div className="card">
            <div className="card-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body" style={{ padding: '0px !important' }}>
                                        <form action="https://sadaftraders.com/submit_supplier_payment_voucher_new" method="POST" id="inputform" onSubmit={() => confirmSave()} className="payment-form">
                                            <input type="hidden" name="_token" value="ekktzOsvp4hz72shIBuvQ91oS1PgHB8Wi7ARjHGi" />
                                            <input type="hidden" name="supplier_payment_voucher" value="1" />
                                            <div className="row" style={{ padding: '10px' }}>
                                                <div className="col-md-12">
                                                    <div className="row" style={{ width: '100% !important' }}>
                                                        <div className="col-md-3">
                                                            <label style={{ color: 'rgb(0, 0, 0)', fontWeight: 'bold', fontSize: '21px' }}>Payment Voucher ID</label>
                                                            <input name="payment_voucher_id" type="text" readOnly value="4839" className="arrow-togglable form-control" />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label style={{ color: 'rgb(0, 0, 0)', fontWeight: 'bold', fontSize: '21px' }}>Date</label>
                                                            <input name="receive_voucher_date" type="date" defaultValue="2024-07-06" className="arrow-togglable form-control date-input" />
                                                        </div>
                                                    </div>
                                                    <div className="row mt-0" style={{ margin: '0px', padding: '0px', fontSize: '24px', color: 'rgb(0, 0, 0)', width: '100% !important', height: '150px', overflow: 'auto' }}>
                                                        <div className="col-md-12">
                                                            <div className="table-responsive">
                                                                <table className="order-list" style={{ width: '100%' }}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th style={{ fontSize: '16px' }}>Party Name</th>
                                                                            <th style={{ fontSize: '16px' }}>Previous Balance</th>
                                                                            <th style={{ fontSize: '16px' }}>Amount</th>
                                                                            <th style={{ fontSize: '16px' }}>Note</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style={{ padding: '5px' }}>
                                                                                <select name="customer_id[]" id="demo-1-customer" className="arrow-togglable form-control select2" data-select2-id="demo-1-customer" tabIndex={-1} aria-hidden="true">
                                                                                    <option value="" data-select2-id="2">Select Supplier</option>
                                                                                    <option value="983">(983) - 777 RICE MIL - Mureedke</option>
                                                                                </select>
                                                                            </td>
                                                                            <td style={{ padding: '5px' }}>
                                                                                <input onInput={(e) => myinput(e.currentTarget.id, e.currentTarget.name)} type="text" id="1" name="lot[]" readOnly className="arrow-togglable form-control lot1" />
                                                                            </td>
                                                                            <td style={{ padding: '5px' }}>
                                                                                <input onInput={(e) => myinput(e.currentTarget.id, e.currentTarget.alt)} onKeyPress={(e) => nextinput(e.currentTarget.id, e.currentTarget.alt)} alt="qty" required type="text" id="1" name="qty[]" className="total_qtyChequeAmountInput arrow-togglable form-control qty1" />
                                                                            </td>
                                                                            <td style={{ padding: '5px', width: '800px' }}>
                                                                                <input onInput={(e) => myinput(e.currentTarget.id, e.currentTarget.alt)} alt="add" type="text" id="1" name="note[]" onKeyDown={(e) => keyAddw(e)} className="arrow-togglable form-control add_w1" />
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row" style={{ borderRadius: '20px', border: '2px solid rgb(0, 0, 0)' }}>
                                                        <div className="col-md-12">
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <select required id="paymentMode" name="paymentMode" className="form-control">
                                                                        <option>Select Payment Mode</option>
                                                                        <option value="online">Online</option>
                                                                        <option value="cash">Cash</option>
                                                                        <option value="cheque">Cheque</option>
                                                                        <option value="directFromSupplier">Direct from Supplier</option>
                                                                        <option value="directFromCustomer">Direct from Customer</option>
                                                                    </select>
                                                                </div>
                                                                <div className="paymentModeCheque col-md-3" style={{ display: 'none' }}>
                                                                    <select name="bank_idTwoCheque" id="demo-1Two" className="arrow-togglable form-control select2Cheque" data-select2-id="demo-1Two" style={{ width: '500px' }} tabIndex={-1} aria-hidden="true">
                                                                        <option value="" data-select2-id="54">Select Bank Name</option>
                                                                        <option value="3250">Al Falah Bank</option>
                                                                        <option value="5168">ALFALAH-SHAHZAD-333534</option>
                                                                        <option value="3249">Allied Bank</option>
                                                                        <option value="5152">UBL-MUHAMMAD SHABBIR-948369</option>
                                                                    </select>
                                                                </div>
                                                                <div className="paymentModeOnline col-md-3" style={{ display: 'none' }}>
                                                                    <select name="bank_idTwo" id="demo-1Two" className="arrow-togglable form-control select2Online" style={{ width: '500px' }} tabIndex={0} aria-hidden="false">
                                                                        <option value="">Select Bank Name</option>
                                                                        <option value="5152">UBL-MUHAMMAD SHABBIR-948369</option>
                                                                    </select>
                                                                </div>
                                                                <div className="paymentModeCash col-md-3" style={{ display: 'none' }}>
                                                                    <select name="bank_idTwoCash" id="demo-1" className="arrow-togglable form-control select2Cash" style={{ width: '500px' }} tabIndex={0} aria-hidden="false">
                                                                        <option value="">Select Cash Account</option>
                                                                        <option value="5108">CASH IN HAND</option>
                                                                    </select>
                                                                </div>
                                                                <div className="paymentModeDirectFromSupplier col-md-3" style={{ display: 'none' }}>
                                                                    <select name="bank_idTwoSupplier" id="demo-1" className="arrow-togglable form-control select2DirectFromSupplier" style={{ width: '500px' }} tabIndex={0} aria-hidden="false">
                                                                        <option value="">Select Supplier Account</option>
                                                                        <option value="983">777 RICE MIL - Mureedke</option>
                                                                    </select>
                                                                </div>
                                                                <div className="paymentModeDirectFromCustomer col-md-3" style={{ display: 'none' }}>
                                                                    <select name="bank_idTwoCustomer" id="demo-1" className="arrow-togglable form-control select2DirectFromCustomer" data-select2-id="demo-1" style={{ width: '500px' }} tabIndex={-1} aria-hidden="true">
                                                                        <option value="" data-select2-id="1159">Select Customer Account</option>
                                                                        <option value="26264">A Brohi - Tando Muhammad Khan</option>
                                                                        <option value="64">ZULFIQAR SOOMRO - Dadu</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="table-responsiveTwo table-responsive" style={{ marginTop: '20px' }}>
                                                                <table className="order-list" style={{ width: '100%', height: '100px' }}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th style={{ fontSize: '16px' }}>Account Name</th>
                                                                            <th style={{ fontSize: '16px' }}>Balance</th>
                                                                            <th style={{ fontSize: '16px' }}>Amount</th>
                                                                            <th style={{ fontSize: '16px' }}>Note</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style={{ padding: '5px' }}>
                                                                                <select name="bank_account_idTwo[]" id="demo-1" className="arrow-togglable form-control select2" data-select2-id="demo-1" tabIndex={-1} aria-hidden="true">
                                                                                    <option value="" data-select2-id="56">Select Account</option>
                                                                                    <option value="5108">CASH IN HAND</option>
                                                                                    <option value="5152">UBL-MUHAMMAD SHABBIR-948369</option>
                                                                                </select>
                                                                            </td>
                                                                            <td style={{ padding: '5px' }}>
                                                                                <input onInput={(e) => myinput(e.currentTarget.id, e.currentTarget.alt)} type="text" id="1" name="balance[]" readOnly className="arrow-togglable form-control balance1" />
                                                                            </td>
                                                                            <td style={{ padding: '5px' }}>
                                                                                <input onInput={(e) => myinput(e.currentTarget.id, e.currentTarget.alt)} onKeyPress={(e) => nextinput(e.currentTarget.id, e.currentTarget.alt)} alt="qty" required type="text" id="1" name="qty_two[]" className="total_qtyTwo arrow-togglable form-control qtyTwo1" />
                                                                            </td>
                                                                            <td style={{ padding: '5px', width: '800px' }}>
                                                                                <input onInput={(e) => myinput(e.currentTarget.id, e.currentTarget.alt)} alt="add" type="text" id="1" name="note_two[]" onKeyDown={(e) => keyAddwTwo(e)} className="arrow-togglable form-control addTwo_w1" />
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12" style={{ textAlign: 'center', padding: '10px', color: 'rgb(0, 0, 0)' }}>
                                                                    <button type="submit" className="btn btn-success" style={{ background: 'rgb(0, 102, 0)', borderRadius: '10px', color: 'rgb(255, 255, 255)', fontSize: '21px', borderColor: 'rgb(0, 102, 0)' }}>Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <table className="order-list" style={{ width: '100%', marginTop: '20px', display: 'none' }}>
                                                                <thead>
                                                                    <tr>
                                                                        <th style={{ fontSize: '16px' }}>Voucher No</th>
                                                                        <th style={{ fontSize: '16px' }}>Date</th>
                                                                        <th style={{ fontSize: '16px' }}>Party Name</th>
                                                                        <th style={{ fontSize: '16px' }}>Voucher Type</th>
                                                                        <th style={{ fontSize: '16px' }}>Amount</th>
                                                                        <th style={{ fontSize: '16px' }}>Note</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody></tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="alert alert-danger" style={{ display: 'none' }}>
                                                                <ul></ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="alert alert-success" style={{ display: 'none' }}>
                                                                <ul></ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row" style={{ display: 'none' }}>
                                                        <div className="col-md-12">
                                                            <div className="col-md-6">
                                                                <div className="panel panel-danger">
                                                                    <div className="panel-heading">WARNING!</div>
                                                                    <div className="panel-body">
                                                                        <div className="text-danger">The total amount exceeds the balance available in the bank accounts.</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row" style={{ display: 'none' }}>
                                                        <div className="col-md-12">
                                                            <div className="col-md-6">
                                                                <div className="panel panel-danger">
                                                                    <div className="panel-heading">NOTE!</div>
                                                                    <div className="panel-body">
                                                                        <div className="text-danger">This voucher requires approval from higher authorities.</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="alert alert-info" style={{ display: 'none' }}>
                                                                <ul></ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="modal fade" id="confirmPrint" tabIndex={-1} role="dialog" aria-labelledby="confirmPrintLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="confirmPrintLabel">Print Confirmation</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Do you want to print the voucher?</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                <button type="button" className="btn btn-primary">Print</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="approveVoucher" tabIndex={-1} role="dialog" aria-labelledby="approveVoucherLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="approveVoucherLabel">Voucher Approval</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Do you want to approve the voucher?</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                <button type="button" className="btn btn-primary">Approve</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="printVoucher" tabIndex={-1} role="dialog" aria-labelledby="printVoucherLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="printVoucherLabel">Print Voucher</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Do you want to print the voucher?</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                <button type="button" className="btn btn-primary">Print</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="deleteVoucher" tabIndex={-1} role="dialog" aria-labelledby="deleteVoucherLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="deleteVoucherLabel">Delete Voucher</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Are you sure you want to delete this voucher?</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                <button type="button" className="btn btn-danger">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
      </div>

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

export default CustomerReceivingVouchers;