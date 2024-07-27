"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";
import { AuthContext } from "@/provider/AuthProvider";
import { useProfilePasswordValidation, useProfileValidation } from "@/validationSchema/profile";
import { updatePassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { getDatabase, ref, push, set, get } from "firebase/database";
import ChequeTable from "@/components/ChequeTable";
import DashboardNav from "@/components/DashboardNav";

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


<div>
      <section className="dashboard-area">
        <DashboardNav />
        <div className="dashboard-content-wrap">
          <div className="dashboard-bread dashboard--bread dashboard-bread-2">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="breadcrumb-content">
                    <div className="section-heading">
                      <h2 className="sec__title font-size-30 text-white">add Vouchers</h2>
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
          <div className="dashboard-main-content">
            <div className="container-fluid">
              <section className="listing-form">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12 mx-auto">
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
              </div>{/* end row */}
            </div>{/* end container-fluid */}
          </div>{/* end dashboard-main-content */}
        </div>{/* end dashboard-content-wrap */}
      </section>{/* end dashboard-area */}
      {/* start scroll top */}
      <div id="back-to-top">
        <i className="la la-angle-up" title="Go top" />
      </div>
    </div>




    )
}

export default AddVoucher;