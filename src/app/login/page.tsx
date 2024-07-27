"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import { PROFILE_ROUTE, HOME_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import Link from "next/link";
import {auth} from '@/services/firebase';
import { useLoginValidation } from "@/validationSchema/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";

const Login = () => {
    const { handleSubmit, register, formState:{errors}} = useLoginValidation();
    const router = useRouter();
    useAuthentication();
    const submitForm = (values:any) => {
        signInWithEmailAndPassword(auth,values.email,values.password).then((response)=>{
            router.push(HOME_ROUTE);
        }).catch((e)=>{
            console.log("Login Error ", e.message);
            alert("Please try Again");
        });
    }

    return (


       <div className="modal fade show" id="loginPopupForm" tabIndex={-1} role="dialog" aria-modal="true" style={{paddingRight: 17, display: 'block'}}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title title" id="exampleModalLongTitle2">Login</h5>
                  <p className="font-size-14">Hello! Welcome to your account</p>
                </div>
              </div>
              <div className="modal-body">
                <div className="contact-form-action">
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="input-box">
                      <label className="label-text">Username</label>
                      <div className="form-group">
                        
                        <InputField
                    register={register}
                    error={errors.email}
                    type="text"
                    placeholder="Enter Your Email Here..."
                    name="email"
                />
                
                      </div>
                    </div>{/* end input-box */}
                    <div className="input-box">
                      <label className="label-text">Password</label>
                      <div className="form-group mb-2">
                        
                        <InputField
                            register={register}
                            error={errors.password}
                            type="password"
                            placeholder="Enter Your Password Here..."
                            name="password"
                            
                        />
                
                      </div>
                      
                    </div>{/* end input-box */}
                    <div className="btn-box pt-3 pb-4">
                    <SubmitButton label="Submit" />
                    </div>

                    <div className="btn-box pt-3 pb-4">
                    <Link href={REGISTER_ROUTE}><span > Register Here</span></Link>
                    </div>

                    
                    
                  </form>
                </div>{/* end contact-form-action */}
              </div>
            </div>
          </div>
        </div>

    )
}

export default Login;