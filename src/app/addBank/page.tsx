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
import { useState } from "react";
import { getDatabase, ref, push, set, get } from "firebase/database";

const AddBank = () => {
    useAuthentication();
    const router = useRouter();
    const { handleSubmit, register, formState: { errors } } = useProfileValidation();
    const { handleSubmit: passwordHandleSubmit, register: registerPassword, formState: { errors: passwordErrors } } = useProfilePasswordValidation();
    const { user }: any = AuthContext();
    const [visibleForm, setVisibility] = useState<any>();
    const userInfo = user.user;

    const submitForm = async ({ name, city, whatsapp, urdu_name, address, status }: {
        name?: string | null,
        address?: string | null,
        city?: string | null,
        urdu_name?: string | null,
        status?: string | null,
        whatsapp?: string | null
    }) => {
        if (name && city && whatsapp && address && urdu_name && status) {
            const db = getDatabase();
            const BankIdRef = ref(db, 'Bank_id_counter');
            const accountIdRef = ref(db, 'account_id_counter');
            try {
                // Get the next Bank ID
                const BankSnapshot = await get(BankIdRef);
                const nextBankId = (BankSnapshot.val() || 0) + 1; // Increment Bank ID
                // Get the next account ID
                const accountSnapshot = await get(accountIdRef);
                const nextAccountId = (accountSnapshot.val() || 0) + 1; // Increment account ID
                const BankData = {
                    Bank_id: nextBankId,
                    name: name,
                    urdu_name: urdu_name,
                    address: address,
                    status: status,
                    city: city,
                    whatsapp: whatsapp
                };

                // Write to the Banks table
                const BanksRef = ref(db, 'Banks/' + nextBankId);
                await set(BanksRef, BankData);

                // Write to the accounts table (only account_id, Bank_id, type)
                const accountsData = {
                    account_id: nextAccountId,
                    Bank_id: nextBankId,
                    type: 'Bank',
                    status: 'active',
                    name: name,
                    whatsapp: whatsapp,
                    address: address,
                    city: city
                };
                const accountsRef = ref(db, 'accounts/' + nextAccountId);
                await set(accountsRef, accountsData);

                // Update the Bank ID counter
                await set(BankIdRef, nextBankId);

                // Update the account ID counter
                await set(accountIdRef, nextAccountId);

                alert("Bank information saved");
                setVisibility("");
                router.push('/banks');  // Redirect to the Banks page
            } catch (e) {
                if (e instanceof Error) {
                    alert("Failed to save Bank information: " + e.message);
                } else {
                    alert("An unknown error occurred while saving Bank information.");
                }
            }
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
                                                    </div>{/* end dropdown-menu */}
                                                </div>{/* end dropdown */}
                                            </div>
                                            <div className="notification-item mr-2">
                                                <div className="dropdown">
                                                    <a href="#" className="dropdown-toggle drop-reveal-toggle-icon" id="messageDropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="la la-envelope" />
                                                        <span className="noti-count">7</span>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-reveal dropdown-menu-xl dropdown-menu-right">
                                                        <div className="dropdown-header drop-reveal-header">
                                                            <h6 className="title">You have <strong className="text-black">7</strong> messages</h6>
                                                        </div>
                                                        <div className="list-group drop-reveal-list">
                                                            <a href="#" className="list-group-item list-group-item-action">
                                                                <div className="msg-body d-flex align-items-center">
                                                                    <div className="icon-element flex-shrink-0 mr-3 ml-0"><img src="images/team8.jpg" alt="" /></div>
                                                                    <div className="msg-content w-100">
                                                                        <h3 className="title pb-1">Saqib Ahmad</h3>
                                                                        <p className="msg-text">Hi! How are you doing?</p>
                                                                    </div>
                                                                </div>{/* end msg-body */}
                                                            </a>
                                                            <a href="#" className="list-group-item list-group-item-action">
                                                                <div className="msg-body d-flex align-items-center">
                                                                    <div className="icon-element flex-shrink-0 mr-3 ml-0"><img src="images/team9.jpg" alt="" /></div>
                                                                    <div className="msg-content w-100">
                                                                        <h3 className="title pb-1">Smith Kevin</h3>
                                                                        <p className="msg-text">I've finished it! See you so...</p>
                                                                    </div>
                                                                </div>{/* end msg-body */}
                                                            </a>
                                                            <a href="#" className="list-group-item list-group-item-action">
                                                                <div className="msg-body d-flex align-items-center">
                                                                    <div className="icon-element flex-shrink-0 mr-3 ml-0"><img src="images/team10.jpg" alt="" /></div>
                                                                    <div className="msg-content w-100">
                                                                        <h3 className="title pb-1">John Ali</h3>
                                                                        <p className="msg-text">This is awesome</p>
                                                                    </div>
                                                                </div>{/* end msg-body */}
                                                            </a>
                                                            <a href="#" className="list-group-item list-group-item-action">
                                                                <div className="msg-body d-flex align-items-center">
                                                                    <div className="icon-element flex-shrink-0 mr-3 ml-0"><img src="images/team11.jpg" alt="" /></div>
                                                                    <div className="msg-content w-100">
                                                                        <h3 className="title pb-1">Kamran Adil</h3>
                                                                        <p className="msg-text">Your idea is brilliant!</p>
                                                                    </div>
                                                                </div>{/* end msg-body */}
                                                            </a>
                                                            <a href="#" className="list-group-item list-group-item-action">
                                                                <div className="msg-body d-flex align-items-center">
                                                                    <div className="icon-element flex-shrink-0 mr-3 ml-0"><img src="images/team12.jpg" alt="" /></div>
                                                                    <div className="msg-content w-100">
                                                                        <h3 className="title pb-1">Kevin Smith</h3>
                                                                        <p className="msg-text">Congrats bro!</p>
                                                                    </div>
                                                                </div>{/* end msg-body */}
                                                            </a>
                                                        </div>
                                                    </div>{/* end dropdown-menu */}
                                                </div>{/* end dropdown */}
                                            </div>
                                            <div className="notification-item">
                                                <div className="dropdown">
                                                    <a href="#" className="dropdown-toggle drop-reveal-toggle-icon" id="userDropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="la la-user" />
                                                    </a>
                                                    <div className="dropdown-menu dropdown-reveal dropdown-menu-sm dropdown-menu-right">
                                                        <div className="dropdown-header drop-reveal-header">
                                                            <h6 className="title">Welcome!</h6>
                                                        </div>
                                                        <div className="list-group drop-reveal-list">
                                                            <Link href="/profile" className="list-group-item list-group-item-action">
                                                                <div className="msg-body d-flex align-items-center">
                                                                    <div className="icon-element flex-shrink-0 mr-3 ml-0"><i className="la la-user" /></div>
                                                                    <div className="msg-content w-100">
                                                                        <h3 className="title pb-1">Profile</h3>
                                                                    </div>
                                                                </div>{/* end msg-body */}
                                                            </Link>
                                                            <Link href="/dashboard" className="list-group-item list-group-item-action">
                                                                <div className="msg-body d-flex align-items-center">
                                                                    <div className="icon-element flex-shrink-0 mr-3 ml-0"><i className="la la-dashboard" /></div>
                                                                    <div className="msg-content w-100">
                                                                        <h3 className="title pb-1">Dashboard</h3>
                                                                    </div>
                                                                </div>{/* end msg-body */}
                                                            </Link>
                                                            <Link href="/settings" className="list-group-item list-group-item-action">
                                                                <div className="msg-body d-flex align-items-center">
                                                                    <div className="icon-element flex-shrink-0 mr-3 ml-0"><i className="la la-cog" /></div>
                                                                    <div className="msg-content w-100">
                                                                        <h3 className="title pb-1">Settings</h3>
                                                                    </div>
                                                                </div>{/* end msg-body */}
                                                            </Link>
                                                            <Link href="/logout" className="list-group-item list-group-item-action">
                                                                <div className="msg-body d-flex align-items-center">
                                                                    <div className="icon-element flex-shrink-0 mr-3 ml-0"><i className="la la-power-off" /></div>
                                                                    <div className="msg-content w-100">
                                                                        <h3 className="title pb-1">Logout</h3>
                                                                    </div>
                                                                </div>{/* end msg-body */}
                                                            </Link>
                                                        </div>
                                                    </div>{/* end dropdown-menu */}
                                                </div>{/* end dropdown */}
                                            </div>
                                        </div>
                                    </div>
                                </div>{/* end menu-wrapper */}
                            </div>{/* end col-lg-12 */}
                        </div>{/* end row */}
                    </div>{/* end container-fluid */}
                </div>{/* end dashboard-nav */}
            </section>{/* end dashboard-area */}
            <div className="dashboard-content-wrap">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="dashboard-content">
                                <div className="manage-jobs-container">
                                    <div className="form-box">
                                        <div className="form-title-wrap">
                                            <h3 className="title">Add Bank</h3>
                                        </div>
                                        <div className="form-content contact-form-action">
                                            <form method="post" onSubmit={handleSubmit(submitForm)}>
                                                <InputField name="name" label="Name" register={register} errors={errors} />
                                                <InputField name="city" label="City" register={register} errors={errors} />
                                                <InputField name="whatsapp" label="Whatsapp" register={register} errors={errors} />
                                                <InputField name="urdu_name" label="Urdu Name" register={register} errors={errors} />
                                                <InputField name="address" label="Address" register={register} errors={errors} />
                                                <InputField name="status" label="Status" register={register} errors={errors} />
                                                <SubmitButton label="Add Bank" type="submit" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>{/* end dashboard-content */}
                        </div>{/* end col-lg-12 */}
                    </div>{/* end row */}
                </div>{/* end container-fluid */}
            </div>{/* end dashboard-content-wrap */}
        </div>
    );
}

export default AddBank;
