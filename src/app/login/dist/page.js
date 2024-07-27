"use client";
"use strict";
exports.__esModule = true;
var Button_1 = require("@/components/Button");
var InputField_1 = require("@/components/InputField");
var routes_1 = require("@/constants/routes");
var link_1 = require("next/link");
var firebase_1 = require("@/services/firebase");
var auth_1 = require("@/validationSchema/auth");
var auth_2 = require("firebase/auth");
var navigation_1 = require("next/navigation");
var useAuthentication_1 = require("@/hooks/useAuthentication");
var Login = function () {
    var _a = auth_1.useLoginValidation(), handleSubmit = _a.handleSubmit, register = _a.register, errors = _a.formState.errors;
    var router = navigation_1.useRouter();
    useAuthentication_1["default"]();
    var submitForm = function (values) {
        auth_2.signInWithEmailAndPassword(firebase_1.auth, values.email, values.password).then(function (response) {
            router.push(routes_1.HOME_ROUTE);
        })["catch"](function (e) {
            console.log("Login Error ", e.message);
            alert("Please try Again");
        });
    };
    return (React.createElement("div", { className: "modal fade show", id: "loginPopupForm", tabIndex: -1, role: "dialog", "aria-modal": "true", style: { paddingRight: 17, display: 'block' } },
        React.createElement("div", { className: "modal-dialog modal-dialog-centered", role: "document" },
            React.createElement("div", { className: "modal-content" },
                React.createElement("div", { className: "modal-header" },
                    React.createElement("div", null,
                        React.createElement("h5", { className: "modal-title title", id: "exampleModalLongTitle2" }, "Login"),
                        React.createElement("p", { className: "font-size-14" }, "Hello! Welcome to your account"))),
                React.createElement("div", { className: "modal-body" },
                    React.createElement("div", { className: "contact-form-action" },
                        React.createElement("form", { onSubmit: handleSubmit(submitForm) },
                            React.createElement("div", { className: "input-box" },
                                React.createElement("label", { className: "label-text" }, "Username"),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement(InputField_1["default"], { register: register, error: errors.email, type: "text", placeholder: "Enter Your Email Here...", name: "email" }))),
                            React.createElement("div", { className: "input-box" },
                                React.createElement("label", { className: "label-text" }, "Password"),
                                React.createElement("div", { className: "form-group mb-2" },
                                    React.createElement(InputField_1["default"], { register: register, error: errors.password, type: "password", placeholder: "Enter Your Password Here...", name: "password" }))),
                            React.createElement("div", { className: "btn-box pt-3 pb-4" },
                                React.createElement(Button_1["default"], { label: "Submit" })),
                            React.createElement("div", { className: "btn-box pt-3 pb-4" },
                                React.createElement(link_1["default"], { href: routes_1.REGISTER_ROUTE },
                                    React.createElement("span", null, " Register Here"))))))))));
};
exports["default"] = Login;
