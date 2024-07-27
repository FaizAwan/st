"use strict";
exports.__esModule = true;
exports.useProfilePasswordValidation = exports.useProfileValidation = void 0;
var yup_1 = require("@hookform/resolvers/yup");
var react_hook_form_1 = require("react-hook-form");
var Yup = require("yup");
var profileSchema = Yup.object({
    name: Yup.string().nullable(),
    photo: Yup.string().nullable()
});
exports.useProfileValidation = function () { return react_hook_form_1.useForm({
    resolver: yup_1.yupResolver(profileSchema)
}); };
var profilePasswordSchema = Yup.object({
    password: Yup.string().nullable()
});
exports.useProfilePasswordValidation = function () { return react_hook_form_1.useForm({
    resolver: yup_1.yupResolver(profilePasswordSchema)
}); };
