"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import Link from "next/link";
import Image from 'next/image'

import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";
import { AuthContext } from "@/provider/AuthProvider";
import { useProfilePasswordValidation, useProfileValidation } from "@/validationSchema/profile";
import { updatePassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { getDatabase, ref, push, set, get } from "firebase/database";
import ChequeTable from "@/components/ChequeTable";

const AddVoucher = () => {
  useAuthentication();
  const router = useRouter();
  const { handleSubmit, register, formState: { errors } } = useProfileValidation();
  const [paymentMode, setPaymentMode] = useState('');

  const { handleSubmit: passwordHandleSubmit, register: registerPassword, formState: { errors: passwordErrors } } = useProfilePasswordValidation();
  const { user }: any = AuthContext();

  const [visibleForm, setVisibility] = useState<any>();
  const [suppliers, setSuppliers] = useState<any[]>([]); // State to store suppliers
  const [customers, setCustomers] = useState<any[]>([]); // State to store customers
  const [banks, setBanks] = useState<string[]>([]); // State to store banks
  const [selectedBank, setSelectedBank] = useState<string>(''); // State to store selected bank
  const [selectedSupplier, setSelectedSupplier] = useState<string>(''); // State to store selected suppliers
  const [selectedCustomer, setSelectedCustomer] = useState<string>(''); // State to store selected customers
  
  const userInfo = user.user;

  // Fetch suppliers from Firebase
  useEffect(() => {
    const fetchSuppliers = async () => {
      const db = getDatabase();
      const suppliersRef = ref(db, 'suppliers');
      try {
        const snapshot = await get(suppliersRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const suppliersList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          setSuppliers(suppliersList);
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);


    // Fetch customers from Firebase
    useEffect(() => {
      const fetchCustomers = async () => {
        const db = getDatabase();
        const customersRef = ref(db, 'customers');
        try {
          const snapshot = await get(customersRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            const customersList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            setCustomers(customersList);
          }
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      };
  
      fetchCustomers();
    }, []);
    // Fetch customers from Firebase
    useEffect(() => {
      const fetchCustomers = async () => {
        const db = getDatabase();
        const customersRef = ref(db, 'customers');
        try {
          const snapshot = await get(customersRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            const customersList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            setCustomers(customersList);
          }
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      };
      fetchCustomers();
    }, []);


   // Fetch banks from Firebase based on payment mode
   useEffect(() => {
    const fetchBanks = async () => {
      console.log('Fetching banks for payment mode:', paymentMode);
      if (paymentMode === 'online' || paymentMode === 'cheque'|| paymentMode === 'cash') {
        const db = getDatabase();
        const banksRef = ref(db, 'Banks'); // Adjust path to your Firebase database
        try {
          const snapshot = await get(banksRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            console.log('Fetched banks data:', data);
            const banksList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            setBanks(banksList);
          } else {
            console.log('No data available in the Banks path');
            setBanks([]);
          }
        } catch (error) {
          console.error(`Error fetching banks for ${paymentMode} payment mode:`, error);
        }
      } else {
        setBanks([]); // Clear banks if payment mode changes to something else
      }
    };

    fetchBanks();
  }, [paymentMode]);

  console.log('Current payment mode:', paymentMode);
  console.log('Current banks list:', banks);

  const handlePaymentModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMode(event.target.value);
  };




  const submitForm = async ({
    payment_voucher_date,
    payment_voucher_id,
    supplier_name,
    amount,
    sale_note,
    note,
    supplier_payment_voucher
  }: {
    payment_voucher_date?: string | null,
    payment_voucher_id?: string | null,
    supplier_name?: string | null,
    sale_note?: string | null,
    amount?: string | null,
    supplier_payment_voucher?: string | null,
    note?: string | null
  }) => {
    console.log("Form data received:", {
      payment_voucher_date,
      payment_voucher_id,
      supplier_name,
      amount,
      sale_note,
      note,
      supplier_payment_voucher
    });
  
    if (payment_voucher_date && payment_voucher_id && supplier_name && sale_note && amount && note && supplier_payment_voucher) {
      const db = getDatabase();
      const VoucherIdRef = ref(db, 'Voucher_id_counter');
      try {
        console.log("Fetching the next Voucher ID...");
        const VoucherSnapshot = await get(VoucherIdRef);
        const nextVoucherId = (VoucherSnapshot.val() || 0) + 1; // Increment Voucher ID
        console.log("Next Voucher ID:", nextVoucherId);
  
        const VoucherData = {
          Voucher_id: nextVoucherId,
          payment_voucher_date: payment_voucher_date,
          payment_voucher_id: payment_voucher_id,
          supplier_name: supplier_name,
          amount: amount,
          note: note,
          supplier_payment_voucher: supplier_payment_voucher
        };
  
        console.log("Voucher data to be saved:", VoucherData);
  
        // Write to the Vouchers table
        const VouchersRef = ref(db, 'Vouchers/' + nextVoucherId);
        await set(VouchersRef, VoucherData);
        console.log("Voucher data saved successfully.");
  
        // Update the Voucher ID counter
        await set(VoucherIdRef, nextVoucherId);
        console.log("Voucher ID counter updated successfully.");
  
        alert("Voucher information saved");
        setVisibility("");
        router.push('/vouchers');  // Redirect to the Vouchers page
      } catch (e) {
        console.error("Error saving Voucher information:", e);
        alert("Failed to save Voucher information " + e.message);
      }
    } else {
      console.error("Form validation failed. Missing required fields.");
    }
  };

  

  const submitPasswordForm = ({ password }: { password?: string | null }) => {
    if (password) {
      updatePassword(userInfo, password).then((response) => {
        console.log("Password changed");
        setVisibility("");
      }).catch((e) => {
        console.log("Failed to change password ", e.message);
      });
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
                                <Image alt="tagLine"src="template/images/team8.jpg" />
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
                                <Image alt="tagLine"src="template/images/team9.jpg" layout="fill" 
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
                                <Image alt="tagLine"src="template/images/team10.jpg" />
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
                                <Image alt="tagLine"src="template/images/team11.jpg" />
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
                          <div className="avatar avatar-sm flex-shrink-0 mr-2"><Image alt="tagLine"src="template/images/team8.jpg"  /></div>
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
                                <h3 className="title"><i className="la la-shopping-cart mr-2" />Vouchers</h3>
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
                  <h2 className="sec__title font-size-30 text-white">Add Voucher</h2>
                </div>
              </div>{/* end breadcrumb-content */}
            </div>{/* end col-lg-6 */}
            <div className="col-lg-6">
              <div className="breadcrumb-list text-right">
                <ul className="list-items">
                  <li><a href="/" className="text-white">Home</a></li>
                  <li>Dashboard</li>
                  <li>Vouchers</li>
                </ul>
              </div>{/* end breadcrumb-list */}
            </div>{/* end col-lg-6 */}
          </div>{/* end row */}
        </div>
      </div>{/* end dashboard-bread */}
      <div  className="dashboard-main-content">
        <div className="container-fluid">
        <section className="listing-form section--padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 mx-auto">
          {/* <div className="listing-header pb-4">
            <h3 className="title font-size-28 pb-2">Add Voucher Form</h3>
          </div> */}
          <div className="form-box">
            
            <div className="form-content contact-form-action">
            <form onSubmit={handleSubmit(submitForm)}>
              <input value="supplier_payment_voucher" className="form-control" type="hidden" {...register("supplier_payment_voucher")} />
                              <div className="row">
                                <div className="col-lg-3">
                                  <div className="input-box">
                                    <label className="label-text">Payment Voucher ID</label>
                                    <div className="form-group">
                                      <span className="la la-list form-icon" />
                                      <input className="form-control" value="128" type="text" {...register("payment_voucher_id")} />
                                    </div>
                                    {errors.payment_voucher_id && <p className="text-danger">{errors.payment_voucher_id.message}</p>}
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="input-box">
                                    <label className="label-text">Date</label>
                                    <div className="form-group">
                                      <span className="la la-user form-icon" />
                                      <input className="form-control" type="date" {...register("payment_voucher_date")} />
                                    </div>
                                    {errors.payment_voucher_date && <p className="text-danger">{errors.payment_voucher_date.message}</p>}
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                              <div className="col-lg-3">
                            <div className="input-box">
                              <label className="label-text">Supplier Name</label>
                              <div className="form-group">
                                <span className="la la-envelope form-icon"></span>
                                <select name="supplier_name" {...register('supplier_name')} className="form-control">
                                  <option value="">---Select Supplier---</option>
                                  {suppliers.map(supplier => (
                                    <option key={supplier.id} value={supplier.name}>
                                      {supplier.name}
                                    </option>
                                  ))}
                                </select>
                                {errors.supplier_name && <p>{errors.supplier_name.message}</p>}
                              </div>
                            </div>
                          </div>
                                <div className="col-lg-2">
                                  <div className="input-box">
                                    <label className="label-text">Previous Balance</label>
                                    <div className="form-group">
                                      <span className="la la-dollar form-icon" />
                                      <input className="form-control"  type="text" {...register("previous_balance")} />
                                    </div>
                                    {errors.previous_balance && <p className="text-danger">{errors.previous_balance.message}</p>}
                                  </div>
                                </div>

                                <div className="col-lg-2">
                                  <div className="input-box">
                                    <label className="label-text">Amount</label>
                                    <div className="form-group">
                                      <span className="la la-dollar form-icon" />
                                      <input className="form-control" type="text" {...register("amount")} />
                                    </div>
                                    {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
                                  </div>
                                </div>
                                <div className="col-lg-5">
                                  <div className="input-box">
                                    <label className="label-text">Note</label>
                                    <div className="form-group">
                                      <span className="la la-copy form-icon" />
                                      <input className="form-control" type="text" {...register("note")} />
                                    </div>
                                    {errors.note && <p className="text-danger">{errors.note.message}</p>}
                                  </div>
                                </div>

                                </div>

                                <div className="row">

                                <div className="col-lg-3">
                                    <div className="input-box">
                                      <label className="label-text">Select Payment Mode</label>
                                      <div className="form-group">
                                        <span className="la la-copy form-icon" />
                                        <select
                                          required
                                          id="paymentMode"
                                          name="paymentMode"
                                          className="form-control"
                                          {...register("payment_mode")}
                                          onChange={handlePaymentModeChange}
                                        >
                                          <option value="">Select Payment Mode</option>
                                          <option value="online">Online</option>
                                          <option value="cash">Cash</option>
                                          <option value="cheque">Cheque</option>
                                          <option value="directFromSupplier">Direct from Supplier</option>
                                          <option value="directFromCustomer">Direct from Customer</option>
                                        </select>
                                      </div>
                                      {errors.payment_mode && <p className="text-danger">{errors.payment_mode.message}</p>}
                                    </div>
                                  </div>

                                  {/* Conditional rendering based on paymentMode */}
                            <div className="row">
                              <div className={`col-md-12 ${paymentMode === 'online' ? 'd-block' : 'd-none'}`}>
                                <div className="input-box">
                                  <label className="label-text">Bank (Online Payment)</label>
                                  <div className="form-group">
                                    <span className="la la-university form-icon"></span>
                                    <select
                                        name="bank"
                                        value={selectedBank}
                                        onChange={(e) => setSelectedBank(e.target.value)}
                                        className="form-control"
                                      >
                                        <option value="">---Select Bank---</option>
                                        {banks.map((bank) => (
                                          <option key={bank.id} value={bank.id}>
                                            {bank.name}
                                          </option>
                                        ))}
                                      </select>
                                  </div>
                                </div>
                                </div>
                                <div className={`col-md-12 ${paymentMode === 'cheque' ? 'd-block' : 'd-none'}`}>
                                  <div className="input-box">
                                    <label className="label-text">Bank (Cheque Payment)</label>
                                    <div className="form-group">
                                      <span className="la la-university form-icon"></span>
                                      <select
                                          name="cheque"
                                          value={selectedBank}
                                          onChange={(e) => setSelectedBank(e.target.value)}
                                          className="form-control"
                                        >
                                          <option value="">---Select Bank---</option>
                                          {banks.map((bank) => (
                                            <option key={bank.id} value={bank.id}>
                                              {bank.name}
                                            </option>
                                          ))}
                                        </select>
                                    </div>
                                  </div>
                                </div>
                                <div className={`col-lg-12 ${paymentMode === 'cash' ? 'd-block' : 'd-none'}`}>
                                <div className="input-box">
                                    <label className="label-text">Cash in hand </label>
                                    <div className="form-group">
                                      <span className="la la-university form-icon"></span>
                                      <select
                                          name="cash_in_hand"
                                          value={selectedBank}
                                          onChange={(e) => setSelectedBank(e.target.value)}
                                          className="form-control"
                                        >
                                          <option value="">---Select Bank---</option>
                                          {banks.map((bank) => (
                                          bank.name === "CASH IN HAND" && (
                                            <option key={bank.id} value={bank.id}>
                                              {bank.name}
                                            </option>
                                          )
                                        ))}
                                        </select>
                                    </div>
                                  </div>

                              </div>
                              <div className={`col-lg-12 ${paymentMode === 'directFromSupplier' ? 'd-block' : 'd-none'}`}>
                                <div className="input-box">
                                    <label className="label-text">Suppliers </label>
                                    <div className="form-group">
                                      <span className="la la-university form-icon"></span>
                                      <select
                                          name="supplier"
                                          value={selectedSupplier}
                                          onChange={(e) => setSelectedSupplier(e.target.value)}
                                          className="form-control"
                                        >
                                          <option value="">---Select Supplier---</option>
                                          {suppliers.map((supplier) => (
                                            <option key={supplier.id} value={supplier.id}>
                                              {supplier.name} - {supplier.city}
                                            </option>
                                          ))}
                                        </select>
                                    </div>
                                  </div>
                              </div>
                              <div className={`col-lg-12 ${paymentMode === 'directFromCustomer' ? 'd-block' : 'd-none'}`}>
                              <div className="input-box">
                                    <label className="label-text">Customers </label>
                                    <div className="form-group">
                                      <span className="la la-university form-icon"></span>
                                      <select
                                          name="supplier"
                                          value={selectedCustomer}
                                          onChange={(e) => setSelectedCustomer(e.target.value)}
                                          className="form-control"
                                        >
                                          <option value="">---Select customer---</option>
                                          {customers.map((customer) => (
                                            <option key={customer.id} value={customer.id}>
                                              {customer.name} - {customer.city}
                                            </option>
                                          ))}
                                        </select>
                                    </div>
                                  </div>

                              </div>
                            </div>

                              <div className={`col-md-12 ${paymentMode === 'cheque' ? 'd-block' : 'd-none'}`}>
                                  <ChequeTable/>
                                </div>
                                <div className="col-lg-12">
                                  <div className="btn-box">
                                    <SubmitButton type="submit" className="btn btn-primary" label="Add Voucher" />
                                  </div>
                                </div>
                              </div>{/* end row */}
                            </form>
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
          </div>
        </div>
      </div>
    </div>
  </section>
 


    )
}

export default AddVoucher;