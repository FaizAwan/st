"use strict";
exports.__esModule = true;
exports.registerValidation = exports.useRegisterValidation = exports.useLoginValidation = void 0;
var yup_1 = require("@hookform/resolvers/yup");
var react_hook_form_1 = require("react-hook-form");
var Yup = require("yup");
// Login validation schema
var loginSchema = Yup.object({
    email: Yup.string().email("Please enter valid email").required("Please fill this field"),
    password: Yup.string().required("Please fill this field").min(6, "Please enter minimum 6 characters for password.")
});
// Register validation schema
var registerSchema = Yup.object({
    email: Yup.string().email("Please enter valid email").required("Please fill this field"),
    password: Yup.string().required("Please fill this field").min(6, "Please enter minimum 6 characters for password."),
    cnfPassword: Yup.string().required("Please fill this field").oneOf([Yup.ref('password')], "Enter password not matched.")
});
// Custom hook for login validation
exports.useLoginValidation = function () {
    return react_hook_form_1.useForm({
        resolver: yup_1.yupResolver(loginSchema)
    });
};
// Custom hook for register validation
exports.useRegisterValidation = function () {
    return react_hook_form_1.useForm({
        resolver: yup_1.yupResolver(registerSchema)
    });
};
// Exporting registerSchema as registerValidation
exports.registerValidation = registerSchema;
