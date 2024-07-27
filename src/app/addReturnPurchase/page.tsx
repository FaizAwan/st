"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";
import { AuthContext } from "@/provider/AuthProvider";
import { useProfilePasswordValidation, useProfileValidation } from "@/validationSchema/profile";
import { updatePassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, push, set, get } from "firebase/database";

import React, { useState, useEffect } from 'react';

import DashboardNav from "@/components/DashboardNav";
import ProductTable from "@/components/ProductTable";

const AddReturnPurchase = () => {
  useAuthentication();
  const router = useRouter();
  const { handleSubmit, register, formState: { errors } } = useProfileValidation();
  const [paymentMode, setPaymentMode] = useState('');
  const [productTableData, setProductTableData] = useState([]);

  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');

  const { handleSubmit: passwordHandleSubmit, register: registerPassword, formState: { errors: passwordErrors } } = useProfilePasswordValidation();
  const { user }: any = AuthContext();

  const [visibleForm, setVisibility] = useState<any>();
  const [suppliers, setSuppliers] = useState<any[]>([]); // State to store suppliers
  const [customers, setCustomers] = useState([]);

  const userInfo = user.user;

  
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

  // Fetch suppliers from Firebase
  useEffect(() => {
    const fetchSuppliers = async () => {
      const db = getDatabase();
      const suppliersRef = ref(db, 'Suppliers');
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

  // Fetch banks from Firebase based on payment mode
  useEffect(() => {
    const fetchBanks = async () => {
      console.log('Fetching banks for payment mode:', paymentMode);

      if (paymentMode === 'online' || paymentMode === 'cheque') {
        const db = getDatabase();
        const banksRef = ref(db, 'Banks'); // Adjust path to your Firebase database

        try {
          const snapshot = await get(banksRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            console.log('Fetched banks data:', data);
            const banksList = Object.keys(data).map(key => data[key]);
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


  const handlePaymentModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMode(event.target.value);
  };


  const submitForm = async ({
    ReturnPurchases_date,
    ReturnPurchases_id,
    customer_name,
    note,
    total_amount
  }: {
    ReturnPurchases_date?: string | null,
    ReturnPurchases_id?: string | null,
    customer_name?: string | null,
    total_amount?: string | null,
    note?: string | null
  }) => {
    console.log("Form data received:", {
      ReturnPurchases_date,
      ReturnPurchases_id,
      customer_name,
      note,
      total_amount
    });
  
    if (ReturnPurchases_date && ReturnPurchases_id && customer_name && note && total_amount) {
      const db = getDatabase();
      const ReturnPurchasesIdRef = ref(db, 'ReturnPurchases_id_counter');
      try {
        console.log("Fetching the next ReturnPurchases ID...");
        const ReturnPurchasesnapshot = await get(ReturnPurchasesIdRef);
        const nextReturnPurchasesId = (ReturnPurchasesnapshot.val() || 0) + 1; // Increment ReturnPurchases ID
        console.log("Next ReturnPurchases ID:", nextReturnPurchasesId);
  
        const ReturnPurchasesData = {
          ReturnPurchases_id: nextReturnPurchasesId,
          ReturnPurchases_date: ReturnPurchases_date,
          customer_name: customer_name,
          note: note,
          sale_type: "ReturnPurchases",
          total_amount: total_amount,
          products: productTableData  // Add product table data here
        };
  
        console.log("ReturnPurchases data to be saved:", ReturnPurchasesData);
  
        // Write to the ReturnPurchases table
        const ReturnPurchasesRef = ref(db, 'ReturnPurchases/' + nextReturnPurchasesId);
        await set(ReturnPurchasesRef, ReturnPurchasesData);
        // console.log("ReturnPurchases data saved successfully.");
  
        // Update the ReturnPurchases ID counter
        await set(ReturnPurchasesIdRef, nextReturnPurchasesId);
  
        const ReturnPurchasesProductRef = ref(db, 'ReturnPurchasesProduct');
  
        // Push each product entry to the ReturnPurchasesProduct table with custom keys
        const productPromises = productTableData.map((product, index) => {
          const productEntry = {
            ReturnPurchases_id: nextReturnPurchasesId,
            product_id: 'ReturnPurchasePrductID',
            quantity: product.qty,
            price: product.price,
            purchase_type: "ReturnPurchases",
            total: product.total
          };
          const productKey = `${nextReturnPurchasesId}_${index + 1}`;
          return set(ref(db, `ReturnPurchasesProduct/${productKey}`), productEntry);
        });
  
        await Promise.all(productPromises);
    
        alert("ReturnPurchases information saved");
        setVisibility("");
        router.push('/ReturnPurchases');  // Redirect to the ReturnPurchases page
      } catch (e) {
        console.error("Error saving ReturnPurchases information:", e);
        alert("Failed to save ReturnPurchases information " + e.message);
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
                      <h2 className="sec__title font-size-30 text-white">Add Return Purchase</h2>
                    </div>
                  </div>{/* end breadcrumb-content */}
                </div>{/* end col-lg-6 */}
                <div className="col-lg-6">
                  <div className="breadcrumb-list text-right">
                    <ul className="list-items">
                      <li><a href="/" className="text-white">Home</a></li>
                      <li>Dashboard</li>
                      <li>Add Return Purchase</li>
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
                            <input value="total_amount" className="form-control" type="hidden" {...register("total_amount")} />
                            <div className="row">
                              <div className="col-lg-1">
                                <div className="input-box">
                                  <label className="label-text">Purchase ID</label>
                                  <div className="form-group">
                                    <span className="la la-list form-icon" />
                                    <input className="form-control" value="981" type="text" {...register("ReturnPurchases_id")} />
                                  </div>
                                  {errors.ReturnPurchases_id && <p className="text-danger">{errors.ReturnPurchases_id.message}</p>}
                                </div>
                              </div>
                              <div className="col-lg-3">
                                <div className="input-box">
                                  <label className="label-text">Supplier Name</label>
                                  <div className="form-group">
                                    <span className="la la-envelope form-icon"></span>
                                    <select name="customer_name" {...register('customer_name')} className="form-control">
                                      <option value="">---Select Supplier---</option>
                                      {customers.map(customer => (
                                        <option key={customer.id} value={customer.name}>
                                          {customer.name} - {customer.city}
                                        </option>
                                      ))}
                                    </select>
                                    {errors.customer_name && <p>{errors.customer_name.message}</p>}
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-2">
                                <div className="input-box">
                                  <label className="label-text">Date</label>
                                  <div className="form-group">
                                    <span className="la la-user form-icon" />
                                    <input className="form-control" type="date" {...register("ReturnPurchases_date")} />
                                  </div>
                                  {errors.ReturnPurchases_date && <p className="text-danger">{errors.ReturnPurchases_date.message}</p>}
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="input-box">
                                  <label className="label-text">Return Purchase Note</label>
                                  <div className="form-group">
                                    <span className="la la-user form-icon" />
                                    <input className="form-control" type="text" {...register("note")} />
                                  </div>
                                  {errors.note && <p className="text-danger">{errors.note.message}</p>}
                                </div>
                              </div>
                              <div className="col-lg-2">
                                <div className="input-box">
                                  <label className="label-text">Sale Type</label>
                                  <div className="form-group">
                                    <span className="la la-user form-icon" />
                                    <select className="form-control" onChange={handlePaymentModeChange}>
                                      <option value="cash">Cash Sale</option>
                                      <option value="credit">Credit Sale</option>
                                      <option value="online">Online Sale</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <ProductTable setProductTableData={setProductTableData} />
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="btn-box">
                                  <SubmitButton type="submit" className="btn btn-primary" label="add Sale" />
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
  );
};

export default AddReturnPurchase;
