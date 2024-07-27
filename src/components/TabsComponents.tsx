// components/TabsComponent.js
import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import { getDatabase, ref, get } from 'firebase/database';
import { ref, get, set, getDatabase } from 'firebase/database';

import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";
import { AuthContext } from "@/provider/AuthProvider";
import { useProfilePasswordValidation, useProfileValidation } from "@/validationSchema/profile";
import { updatePassword, updateProfile } from "firebase/auth";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsComponent() {
  const [value, setValue] = React.useState(0);

    
     const router = useRouter();
  const { handleSubmit, register, formState: { errors } } = useProfileValidation();

  const { handleSubmit: passwordHandleSubmit, register: registerPassword, formState: { errors: passwordErrors } } = useProfilePasswordValidation();


    const [mainAccount, setMainAccount] = useState('');
    const db = getDatabase();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const submitForm = async ({ mainAccount }: {
    mainAccount?: string | null }) => {
    if (mainAccount) {
      const db = getDatabase();
      
      const accountIdRef = ref(db, 'account_id_counter');
      try {
        // Get the next account ID
        const accountSnapshot = await get(accountIdRef);
        const nextAccountId = (accountSnapshot.val() || 0) + 1; // Increment account ID
        // Get the next account ID
        // const accountSnapshot = await get(accountIdRef);
        // const nextAccountId = (accountSnapshot.val() || 0) + 1; // Increment account ID
        const accountData = {
          account_id: nextAccountId,
          name: mainAccount
        };
  
        // Write to the accounts table
        const accountsRef = ref(db, 'accounts/' + nextAccountId);
        await set(accountsRef, accountData);
        
       
        
        // Update the account ID counter
        await set(accountIdRef, nextAccountId);
  
        alert("account information saved");
        setVisibility("");
        router.push('/accounts');  // Redirect to the accounts page
      } catch (e) {
        alert("Failed to save account information " + e.message);
      }
    }
  };
    
    

  return (
    <Box sx={{ width: '100%' }}>
        <h3>Charts of accounts (COA)</h3>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Main (Level-1)" {...a11yProps(0)} />
          <Tab label="Sub (Level-2)" {...a11yProps(1)} />
          <Tab label="Third (Level-3)" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
            <form onSubmit={handleSubmit(submitForm)}>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="input-box">
                                    <label className="label-text">Main Account</label>
                                    <div className="form-group">
                                      <span className="la la-user form-icon" />
                                      <input className="form-control" type="text" {...register("mainAccount")} />
                                    </div>
                                    {errors.mainAccount && <p className="text-danger">{errors.mainAccount.message}</p>}
                                  </div>
                                </div>
                                


                                <div className="col-lg-12">
                                  <div className="btn-box">
                                    <SubmitButton type="submit" className="btn btn-primary" label="Add Main Account" />
                                  </div>
                                </div>
                              </div>{/* end row */}
                            </form>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <form>
            <label>Main Account</label>
            <input type="text" name="mainAccount" className="form-control"/>
            <hr />
            <label>Sub Account</label>
            <input type="text" name="subAccount" className="form-control"/>
            <hr/>
            <button type="submit" className="btn btn-primary"> Add Sub Account </button>
            </form>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <form>
            <label>Main Account</label>
            <input type="text" className="form-control"/>
            <hr />
            <label>Sub Account</label>
            <input type="text" className="form-control"/>
            <hr/>
            <label>Third Level Account</label>
            <input type="text" className="form-control"/>
            <hr/>
            <button type="submit" className="btn btn-primary"> Add Third Level Account </button>
        </form>
      </TabPanel>
    </Box>
  );
}
