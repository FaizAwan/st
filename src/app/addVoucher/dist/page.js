"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Button_1 = require("@/components/Button");
var navigation_1 = require("next/navigation");
var useAuthentication_1 = require("@/hooks/useAuthentication");
var AuthProvider_1 = require("@/provider/AuthProvider");
var profile_1 = require("@/validationSchema/profile");
var auth_1 = require("firebase/auth");
var react_1 = require("react");
var database_1 = require("firebase/database");
var ChequeTable_1 = require("@/components/ChequeTable");
var DashboardNav_1 = require("@/components/DashboardNav");
var addVoucher = function () {
    useAuthentication_1["default"]();
    var router = navigation_1.useRouter();
    var _a = profile_1.useProfileValidation(), handleSubmit = _a.handleSubmit, register = _a.register, errors = _a.formState.errors;
    var _b = react_1.useState(''), paymentMode = _b[0], setPaymentMode = _b[1];
    var _c = profile_1.useProfilePasswordValidation(), passwordHandleSubmit = _c.handleSubmit, registerPassword = _c.register, passwordErrors = _c.formState.errors;
    var user = AuthProvider_1.AuthContext().user;
    var _d = react_1.useState(), visibleForm = _d[0], setVisibility = _d[1];
    var _e = react_1.useState([]), suppliers = _e[0], setSuppliers = _e[1]; // State to store suppliers
    var _f = react_1.useState([]), customers = _f[0], setCustomers = _f[1]; // State to store customers
    var _g = react_1.useState([]), banks = _g[0], setBanks = _g[1]; // State to store banks
    var _h = react_1.useState(''), selectedBank = _h[0], setSelectedBank = _h[1]; // State to store selected bank
    var _j = react_1.useState(''), selectedSupplier = _j[0], setSelectedSupplier = _j[1]; // State to store selected suppliers
    var _k = react_1.useState(''), selectedCustomer = _k[0], setSelectedCustomer = _k[1]; // State to store selected customers
    var userInfo = user.user;
    // Fetch suppliers from Firebase
    react_1.useEffect(function () {
        var fetchSuppliers = function () { return __awaiter(void 0, void 0, void 0, function () {
            var db, suppliersRef, snapshot, data_1, suppliersList, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = database_1.getDatabase();
                        suppliersRef = database_1.ref(db, 'suppliers');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.get(suppliersRef)];
                    case 2:
                        snapshot = _a.sent();
                        if (snapshot.exists()) {
                            data_1 = snapshot.val();
                            suppliersList = Object.keys(data_1).map(function (key) { return (__assign({ id: key }, data_1[key])); });
                            setSuppliers(suppliersList);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error fetching suppliers:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchSuppliers();
    }, []);
    // Fetch customers from Firebase
    react_1.useEffect(function () {
        var fetchCustomers = function () { return __awaiter(void 0, void 0, void 0, function () {
            var db, customersRef, snapshot, data_2, customersList, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = database_1.getDatabase();
                        customersRef = database_1.ref(db, 'customers');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.get(customersRef)];
                    case 2:
                        snapshot = _a.sent();
                        if (snapshot.exists()) {
                            data_2 = snapshot.val();
                            customersList = Object.keys(data_2).map(function (key) { return (__assign({ id: key }, data_2[key])); });
                            setCustomers(customersList);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Error fetching customers:", error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchCustomers();
    }, []);
    // Fetch customers from Firebase
    react_1.useEffect(function () {
        var fetchCustomers = function () { return __awaiter(void 0, void 0, void 0, function () {
            var db, customersRef, snapshot, data_3, customersList, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = database_1.getDatabase();
                        customersRef = database_1.ref(db, 'customers');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.get(customersRef)];
                    case 2:
                        snapshot = _a.sent();
                        if (snapshot.exists()) {
                            data_3 = snapshot.val();
                            customersList = Object.keys(data_3).map(function (key) { return (__assign({ id: key }, data_3[key])); });
                            setCustomers(customersList);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Error fetching customers:", error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchCustomers();
    }, []);
    // Fetch banks from Firebase based on payment mode
    react_1.useEffect(function () {
        var fetchBanks = function () { return __awaiter(void 0, void 0, void 0, function () {
            var db, banksRef, snapshot, data_4, banksList, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Fetching banks for payment mode:', paymentMode);
                        if (!(paymentMode === 'online' || paymentMode === 'cheque' || paymentMode === 'cash')) return [3 /*break*/, 5];
                        db = database_1.getDatabase();
                        banksRef = database_1.ref(db, 'Banks');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.get(banksRef)];
                    case 2:
                        snapshot = _a.sent();
                        if (snapshot.exists()) {
                            data_4 = snapshot.val();
                            console.log('Fetched banks data:', data_4);
                            banksList = Object.keys(data_4).map(function (key) { return (__assign({ id: key }, data_4[key])); });
                            setBanks(banksList);
                        }
                        else {
                            console.log('No data available in the Banks path');
                            setBanks([]);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.error("Error fetching banks for " + paymentMode + " payment mode:", error_4);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        setBanks([]); // Clear banks if payment mode changes to something else
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        fetchBanks();
    }, [paymentMode]);
    console.log('Current payment mode:', paymentMode);
    console.log('Current banks list:', banks);
    var handlePaymentModeChange = function (event) {
        setPaymentMode(event.target.value);
    };
    var submitForm = function (_a) {
        var payment_voucher_date = _a.payment_voucher_date, payment_voucher_id = _a.payment_voucher_id, supplier_name = _a.supplier_name, amount = _a.amount, sale_note = _a.sale_note, note = _a.note, supplier_payment_voucher = _a.supplier_payment_voucher;
        return __awaiter(void 0, void 0, void 0, function () {
            var db, VoucherIdRef, VoucherSnapshot, nextVoucherId, VoucherData, VouchersRef, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("Form data received:", {
                            payment_voucher_date: payment_voucher_date,
                            payment_voucher_id: payment_voucher_id,
                            supplier_name: supplier_name,
                            amount: amount,
                            sale_note: sale_note,
                            note: note,
                            supplier_payment_voucher: supplier_payment_voucher
                        });
                        if (!(payment_voucher_date && payment_voucher_id && supplier_name && sale_note && amount && note && supplier_payment_voucher)) return [3 /*break*/, 7];
                        db = database_1.getDatabase();
                        VoucherIdRef = database_1.ref(db, 'Voucher_id_counter');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        console.log("Fetching the next Voucher ID...");
                        return [4 /*yield*/, database_1.get(VoucherIdRef)];
                    case 2:
                        VoucherSnapshot = _b.sent();
                        nextVoucherId = (VoucherSnapshot.val() || 0) + 1;
                        console.log("Next Voucher ID:", nextVoucherId);
                        VoucherData = {
                            Voucher_id: nextVoucherId,
                            payment_voucher_date: payment_voucher_date,
                            payment_voucher_id: payment_voucher_id,
                            supplier_name: supplier_name,
                            amount: amount,
                            note: note,
                            supplier_payment_voucher: supplier_payment_voucher
                        };
                        console.log("Voucher data to be saved:", VoucherData);
                        VouchersRef = database_1.ref(db, 'Vouchers/' + nextVoucherId);
                        return [4 /*yield*/, database_1.set(VouchersRef, VoucherData)];
                    case 3:
                        _b.sent();
                        console.log("Voucher data saved successfully.");
                        // Update the Voucher ID counter
                        return [4 /*yield*/, database_1.set(VoucherIdRef, nextVoucherId)];
                    case 4:
                        // Update the Voucher ID counter
                        _b.sent();
                        console.log("Voucher ID counter updated successfully.");
                        alert("Voucher information saved");
                        setVisibility("");
                        router.push('/vouchers'); // Redirect to the Vouchers page
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _b.sent();
                        console.error("Error saving Voucher information:", e_1);
                        alert("Failed to save Voucher information " + e_1.message);
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        console.error("Form validation failed. Missing required fields.");
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    var submitPasswordForm = function (_a) {
        var password = _a.password;
        if (password) {
            auth_1.updatePassword(userInfo, password).then(function (response) {
                console.log("Password changed");
                setVisibility("");
            })["catch"](function (e) {
                console.log("Failed to change password ", e.message);
            });
        }
    };
    return (React.createElement("div", null,
        React.createElement("section", { className: "dashboard-area" },
            React.createElement(DashboardNav_1["default"], null),
            React.createElement("div", { className: "dashboard-content-wrap" },
                React.createElement("div", { className: "dashboard-bread dashboard--bread dashboard-bread-2" },
                    React.createElement("div", { className: "container-fluid" },
                        React.createElement("div", { className: "row align-items-center" },
                            React.createElement("div", { className: "col-lg-6" },
                                React.createElement("div", { className: "breadcrumb-content" },
                                    React.createElement("div", { className: "section-heading" },
                                        React.createElement("h2", { className: "sec__title font-size-30 text-white" }, "add Vouchers")))),
                            React.createElement("div", { className: "col-lg-6" },
                                React.createElement("div", { className: "breadcrumb-list text-right" },
                                    React.createElement("ul", { className: "list-items" },
                                        React.createElement("li", null,
                                            React.createElement("a", { href: "/", className: "text-white" }, "Home")),
                                        React.createElement("li", null, "Dashboard"),
                                        React.createElement("li", null, "Vouchers"))))))),
                React.createElement("div", { className: "dashboard-main-content" },
                    React.createElement("div", { className: "container-fluid" },
                        React.createElement("section", { className: "listing-form" },
                            React.createElement("div", { className: "container-fluid" },
                                React.createElement("div", { className: "row" },
                                    React.createElement("div", { className: "col-lg-12 mx-auto" },
                                        React.createElement("div", { className: "form-box" },
                                            React.createElement("div", { className: "form-content contact-form-action" },
                                                React.createElement("form", { onSubmit: handleSubmit(submitForm) },
                                                    React.createElement("input", __assign({ value: "supplier_payment_voucher", className: "form-control", type: "hidden" }, register("supplier_payment_voucher"))),
                                                    React.createElement("div", { className: "row" },
                                                        React.createElement("div", { className: "col-lg-3" },
                                                            React.createElement("div", { className: "input-box" },
                                                                React.createElement("label", { className: "label-text" }, "Payment Voucher ID"),
                                                                React.createElement("div", { className: "form-group" },
                                                                    React.createElement("span", { className: "la la-list form-icon" }),
                                                                    React.createElement("input", __assign({ className: "form-control", value: "128", type: "text" }, register("payment_voucher_id")))),
                                                                errors.payment_voucher_id && React.createElement("p", { className: "text-danger" }, errors.payment_voucher_id.message))),
                                                        React.createElement("div", { className: "col-lg-3" },
                                                            React.createElement("div", { className: "input-box" },
                                                                React.createElement("label", { className: "label-text" }, "Date"),
                                                                React.createElement("div", { className: "form-group" },
                                                                    React.createElement("span", { className: "la la-user form-icon" }),
                                                                    React.createElement("input", __assign({ className: "form-control", type: "date" }, register("payment_voucher_date")))),
                                                                errors.payment_voucher_date && React.createElement("p", { className: "text-danger" }, errors.payment_voucher_date.message)))),
                                                    React.createElement("div", { className: "row" },
                                                        React.createElement("div", { className: "col-lg-3" },
                                                            React.createElement("div", { className: "input-box" },
                                                                React.createElement("label", { className: "label-text" }, "Supplier Name"),
                                                                React.createElement("div", { className: "form-group" },
                                                                    React.createElement("span", { className: "la la-envelope form-icon" }),
                                                                    React.createElement("select", __assign({ name: "supplier_name" }, register('supplier_name'), { className: "form-control" }),
                                                                        React.createElement("option", { value: "" }, "---Select Supplier---"),
                                                                        suppliers.map(function (supplier) { return (React.createElement("option", { key: supplier.id, value: supplier.name }, supplier.name)); })),
                                                                    errors.supplier_name && React.createElement("p", null, errors.supplier_name.message)))),
                                                        React.createElement("div", { className: "col-lg-2" },
                                                            React.createElement("div", { className: "input-box" },
                                                                React.createElement("label", { className: "label-text" }, "Previous Balance"),
                                                                React.createElement("div", { className: "form-group" },
                                                                    React.createElement("span", { className: "la la-dollar form-icon" }),
                                                                    React.createElement("input", __assign({ className: "form-control", type: "text" }, register("previous_balance")))),
                                                                errors.previous_balance && React.createElement("p", { className: "text-danger" }, errors.previous_balance.message))),
                                                        React.createElement("div", { className: "col-lg-2" },
                                                            React.createElement("div", { className: "input-box" },
                                                                React.createElement("label", { className: "label-text" }, "Amount"),
                                                                React.createElement("div", { className: "form-group" },
                                                                    React.createElement("span", { className: "la la-dollar form-icon" }),
                                                                    React.createElement("input", __assign({ className: "form-control", type: "text" }, register("amount")))),
                                                                errors.amount && React.createElement("p", { className: "text-danger" }, errors.amount.message))),
                                                        React.createElement("div", { className: "col-lg-5" },
                                                            React.createElement("div", { className: "input-box" },
                                                                React.createElement("label", { className: "label-text" }, "Note"),
                                                                React.createElement("div", { className: "form-group" },
                                                                    React.createElement("span", { className: "la la-copy form-icon" }),
                                                                    React.createElement("input", __assign({ className: "form-control", type: "text" }, register("note")))),
                                                                errors.note && React.createElement("p", { className: "text-danger" }, errors.note.message)))),
                                                    React.createElement("div", { className: "row" },
                                                        React.createElement("div", { className: "col-lg-3" },
                                                            React.createElement("div", { className: "input-box" },
                                                                React.createElement("label", { className: "label-text" }, "Select Payment Mode"),
                                                                React.createElement("div", { className: "form-group" },
                                                                    React.createElement("span", { className: "la la-copy form-icon" }),
                                                                    React.createElement("select", __assign({ required: true, id: "paymentMode", name: "paymentMode", className: "form-control" }, register("payment_mode"), { onChange: handlePaymentModeChange }),
                                                                        React.createElement("option", { value: "" }, "Select Payment Mode"),
                                                                        React.createElement("option", { value: "online" }, "Online"),
                                                                        React.createElement("option", { value: "cash" }, "Cash"),
                                                                        React.createElement("option", { value: "cheque" }, "Cheque"),
                                                                        React.createElement("option", { value: "directFromSupplier" }, "Direct from Supplier"),
                                                                        React.createElement("option", { value: "directFromCustomer" }, "Direct from Customer"))),
                                                                errors.payment_mode && React.createElement("p", { className: "text-danger" }, errors.payment_mode.message))),
                                                        React.createElement("div", { className: "row" },
                                                            React.createElement("div", { className: "col-md-12 " + (paymentMode === 'online' ? 'd-block' : 'd-none') },
                                                                React.createElement("div", { className: "input-box" },
                                                                    React.createElement("label", { className: "label-text" }, "Bank (Online Payment)"),
                                                                    React.createElement("div", { className: "form-group" },
                                                                        React.createElement("span", { className: "la la-university form-icon" }),
                                                                        React.createElement("select", { name: "bank", value: selectedBank, onChange: function (e) { return setSelectedBank(e.target.value); }, className: "form-control" },
                                                                            React.createElement("option", { value: "" }, "---Select Bank---"),
                                                                            banks.map(function (bank) { return (React.createElement("option", { key: bank.id, value: bank.id }, bank.name)); }))))),
                                                            React.createElement("div", { className: "col-md-12 " + (paymentMode === 'cheque' ? 'd-block' : 'd-none') },
                                                                React.createElement("div", { className: "input-box" },
                                                                    React.createElement("label", { className: "label-text" }, "Bank (Cheque Payment)"),
                                                                    React.createElement("div", { className: "form-group" },
                                                                        React.createElement("span", { className: "la la-university form-icon" }),
                                                                        React.createElement("select", { name: "cheque", value: selectedBank, onChange: function (e) { return setSelectedBank(e.target.value); }, className: "form-control" },
                                                                            React.createElement("option", { value: "" }, "---Select Bank---"),
                                                                            banks.map(function (bank) { return (React.createElement("option", { key: bank.id, value: bank.id }, bank.name)); }))))),
                                                            React.createElement("div", { className: "col-lg-12 " + (paymentMode === 'cash' ? 'd-block' : 'd-none') },
                                                                React.createElement("div", { className: "input-box" },
                                                                    React.createElement("label", { className: "label-text" }, "Cash in hand "),
                                                                    React.createElement("div", { className: "form-group" },
                                                                        React.createElement("span", { className: "la la-university form-icon" }),
                                                                        React.createElement("select", { name: "cash_in_hand", value: selectedBank, onChange: function (e) { return setSelectedBank(e.target.value); }, className: "form-control" },
                                                                            React.createElement("option", { value: "" }, "---Select Bank---"),
                                                                            banks.map(function (bank) { return (bank.name === "CASH IN HAND" && (React.createElement("option", { key: bank.id, value: bank.id }, bank.name))); }))))),
                                                            React.createElement("div", { className: "col-lg-12 " + (paymentMode === 'directFromSupplier' ? 'd-block' : 'd-none') },
                                                                React.createElement("div", { className: "input-box" },
                                                                    React.createElement("label", { className: "label-text" }, "Suppliers "),
                                                                    React.createElement("div", { className: "form-group" },
                                                                        React.createElement("span", { className: "la la-university form-icon" }),
                                                                        React.createElement("select", { name: "supplier", value: selectedSupplier, onChange: function (e) { return setSelectedSupplier(e.target.value); }, className: "form-control" },
                                                                            React.createElement("option", { value: "" }, "---Select Supplier---"),
                                                                            suppliers.map(function (supplier) { return (React.createElement("option", { key: supplier.id, value: supplier.id },
                                                                                supplier.name,
                                                                                " - ",
                                                                                supplier.city)); }))))),
                                                            React.createElement("div", { className: "col-lg-12 " + (paymentMode === 'directFromCustomer' ? 'd-block' : 'd-none') },
                                                                React.createElement("div", { className: "input-box" },
                                                                    React.createElement("label", { className: "label-text" }, "Customers "),
                                                                    React.createElement("div", { className: "form-group" },
                                                                        React.createElement("span", { className: "la la-university form-icon" }),
                                                                        React.createElement("select", { name: "supplier", value: selectedCustomer, onChange: function (e) { return setSelectedCustomer(e.target.value); }, className: "form-control" },
                                                                            React.createElement("option", { value: "" }, "---Select customer---"),
                                                                            customers.map(function (customer) { return (React.createElement("option", { key: customer.id, value: customer.id },
                                                                                customer.name,
                                                                                " - ",
                                                                                customer.city)); })))))),
                                                        React.createElement("div", { className: "col-md-12 " + (paymentMode === 'cheque' ? 'd-block' : 'd-none') },
                                                            React.createElement(ChequeTable_1["default"], null)),
                                                        React.createElement("div", { className: "col-lg-12" },
                                                            React.createElement("div", { className: "btn-box" },
                                                                React.createElement(Button_1["default"], { type: "submit", className: "btn btn-primary", label: "Add Voucher" }))))))))))),
                        React.createElement("div", { className: "border-top mt-5" }),
                        React.createElement("div", { className: "row align-items-center" },
                            React.createElement("div", { className: "col-lg-7" },
                                React.createElement("div", { className: "copy-right padding-top-30px" },
                                    React.createElement("p", { className: "copy__desc" },
                                        "\u00A9 Copyright Sadaftraders 2024. Developed by",
                                        React.createElement("a", { target: "_blank", href: "" }, "Smartest Developers")))),
                            React.createElement("div", { className: "col-lg-5" },
                                React.createElement("div", { className: "copy-right-content text-right padding-top-30px" },
                                    React.createElement("ul", { className: "social-profile" },
                                        React.createElement("li", null,
                                            React.createElement("a", { href: "#" },
                                                React.createElement("i", { className: "lab la-facebook-f" }))),
                                        React.createElement("li", null,
                                            React.createElement("a", { href: "#" },
                                                React.createElement("i", { className: "lab la-twitter" }))),
                                        React.createElement("li", null,
                                            React.createElement("a", { href: "#" },
                                                React.createElement("i", { className: "lab la-instagram" }))),
                                        React.createElement("li", null,
                                            React.createElement("a", { href: "#" },
                                                React.createElement("i", { className: "lab la-linkedin-in" }))))))))))),
        React.createElement("div", { id: "back-to-top" },
            React.createElement("i", { className: "la la-angle-up", title: "Go top" }))));
};
exports["default"] = addVoucher;
