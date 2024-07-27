"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";
import { AuthContext } from "@/provider/AuthProvider";
import { useProfilePasswordValidation, useProfileValidation } from "@/validationSchema/profile";
import { updatePassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, push, set, get } from "firebase/database";
import DashboardNav from "@/components/DashboardNav";
import TabsComponent from "@/components/TabsComponents";
import ProductTable from "@/components/ProductTable";
import TreeView from "@/components/TreeView";

interface Customer {
  id: string;
  [key: string]: any; // Add other customer properties here
}

interface Bank {
  id: string;
  name: string;
  // Add other bank properties here
}

const AddAccount = () => {
  useAuthentication();
  const router = useRouter();
  const { handleSubmit, register, formState: { errors } } = useProfileValidation();
  const [paymentMode, setPaymentMode] = useState('');
  const [productTableData, setProductTableData] = useState([]);

  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState('');

  const { handleSubmit: passwordHandleSubmit, register: registerPassword, formState: { errors: passwordErrors } } = useProfilePasswordValidation();
  const { user }: any = AuthContext();

  const [visibleForm, setVisibility] = useState<any>();
  const [suppliers, setSuppliers] = useState<any[]>([]); // State to store suppliers
  const [customers, setCustomers] = useState<Customer[]>([]); // State to store customers

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
          const customersList: Customer[] = Object.keys(data).map(key => ({ id: key, ...data[key] }));
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
            const banksList: Bank[] = Object.keys(data).map(key => ({ id: key, ...data[key] }));
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
    Accounts_date,
    Accounts_id,
    customer_name,
    note,
    total_amount
  }: {
    Accounts_date?: string | null,
    Accounts_id?: string | null,
    customer_name?: string | null,
    total_amount?: string | null,
    note?: string | null
  }) => {
    console.log("Form data received:", {
      Accounts_date,
      Accounts_id,
      customer_name,
      note,
      total_amount
    });

    if (Accounts_date && Accounts_id && customer_name && note && total_amount) {
      const db = getDatabase();
      const AccountsIdRef = ref(db, 'Accounts_id_counter');
      try {
        console.log("Fetching the next Accounts ID...");
        const Accountsnapshot = await get(AccountsIdRef);
        const nextAccountsId = (Accountsnapshot.val() || 0) + 1; // Increment Accounts ID
        console.log("Next Accounts ID:", nextAccountsId);

        const AccountsData = {
          Accounts_id: nextAccountsId,
          Accounts_date: Accounts_date,
          customer_name: customer_name,
          note: note,
          Account_type: "Accounts",
          total_amount: total_amount,
          products: productTableData  // Add product table data here
        };

        console.log("Accounts data to be saved:", AccountsData);

        // Write to the Accounts table
        const AccountsRef = ref(db, 'Accounts/' + nextAccountsId);
        await set(AccountsRef, AccountsData);
        // console.log("Accounts data saved successfully.");

        // Update the Accounts ID counter
        await set(AccountsIdRef, nextAccountsId);

        const AccountsProductRef = ref(db, 'AccountsProduct');

        // Push each product entry to the AccountsProduct table with custom keys
        const productPromises = productTableData.map((product, index) => {
          const productEntry = {
            Accounts_id: nextAccountsId,
            product_id: product.product_id,
            quantity: product.qty,
            price: product.price,
            Account_type: "Accounts",
            total: product.total
          };
          const productKey = `${nextAccountsId}_${index + 1}`;
          return set(ref(db, `AccountsProduct/${productKey}`), productEntry);
        });

        await Promise.all(productPromises);

        alert("Accounts information saved");
        setVisibility("");
        router.push('/Accounts');  // Redirect to the Accounts page
      } catch (e) {
        console.error("Error saving Accounts information:", e);
        alert("Failed to save Accounts information " + e.message);
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
                      <h2 className="sec__title font-size-30 text-white">Add Account</h2>
                    </div>
                  </div>{/* end breadcrumb-content */}
                </div>{/* end col-lg-6 */}
                <div className="col-lg-6">
                  <div className="breadcrumb-list text-right">
                    <ul className="list-items">
                      <li><a href="/" className="text-white">Home</a></li>
                      <li>Dashboard</li>
                      <li>Accounts</li>
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
                    <div className="col-lg-3">
                      <div className="form-box">
                        <div className="form-content contact-form-action">
                            <TreeView />
                          <TabsComponent />
                        </div>
                      </div>{/* end form-box */}
                    </div>{/* end col-lg-3 */}
                    <div className="col-lg-9">
                        <div className="form-box">
                            <div className="form-content contact-form-action">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="input-box">
                                    <label className="label-text">Customer Name</label>
                                    <div className="form-group">
                                      <InputField type="text" name="customer_name" placeholder="Customer Name" {...register('customer_name', { required: true })} />
                                      {errors.customer_name && <span className="error">Customer Name is required</span>}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="input-box">
                                    <label className="label-text">Note</label>
                                    <div className="form-group">
                                      <InputField type="text" name="note" placeholder="Note" {...register('note', { required: true })} />
                                      {errors.note && <span className="error">Note is required</span>}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="input-box">
                                    <label className="label-text">Total Amount</label>
                                    <div className="form-group">
                                      <InputField type="text" name="total_amount" placeholder="Total Amount" {...register('total_amount', { required: true })} />
                                      {errors.total_amount && <span className="error">Total Amount is required</span>}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="input-box">
                                    <label className="label-text">Accounts Date</label>
                                    <div className="form-group">
                                      <InputField type="date" name="Accounts_date" placeholder="Accounts Date" {...register('Accounts_date', { required: true })} />
                                      {errors.Accounts_date && <span className="error">Accounts Date is required</span>}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="input-box">
                                    <label className="label-text">Payment Mode</label>
                                    <div className="form-group">
                                      <select className="form-control" value={paymentMode} onChange={handlePaymentModeChange}>
                                        <option value="">Select Payment Mode</option>
                                        <option value="cash">Cash</option>
                                        <option value="online">Online</option>
                                        <option value="cheque">Cheque</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                {paymentMode === 'online' && (
                                  <div className="col-lg-12">
                                    <div className="input-box">
                                      <label className="label-text">Select Bank</label>
                                      <div className="form-group">
                                        <select className="form-control" value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
                                          <option value="">Select Bank</option>
                                          {banks.map((bank) => (
                                            <option key={bank.id} value={bank.id}>{bank.name}</option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {paymentMode === 'cheque' && (
                                  <div className="col-lg-12">
                                    <div className="input-box">
                                      <label className="label-text">Select Bank</label>
                                      <div className="form-group">
                                        <select className="form-control" value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
                                          <option value="">Select Bank</option>
                                          {banks.map((bank) => (
                                            <option key={bank.id} value={bank.id}>{bank.name}</option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="form-group text-center">
                                    <SubmitButton text="Save" onClick={handleSubmit(submitForm)} />
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
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

export default AddAccount;
