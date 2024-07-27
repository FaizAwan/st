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
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var useAuthentication_1 = require("@/hooks/useAuthentication");
var AuthProvider_1 = require("@/provider/AuthProvider");
var profile_1 = require("@/validationSchema/profile");
var auth_1 = require("firebase/auth");
var database_1 = require("firebase/database");
var DashboardNav_1 = require("@/components/DashboardNav");
var TabsComponents_1 = require("@/components/TabsComponents");
var TreeView_1 = require("@/components/TreeView");
var AddAccount = function () {
    useAuthentication_1["default"]();
    var router = navigation_1.useRouter();
    var _a = profile_1.useProfileValidation(), handleSubmit = _a.handleSubmit, register = _a.register, errors = _a.formState.errors;
    var _b = react_1.useState(''), paymentMode = _b[0], setPaymentMode = _b[1];
    var _c = react_1.useState([]), productTableData = _c[0], setProductTableData = _c[1];
    var _d = react_1.useState([]), banks = _d[0], setBanks = _d[1];
    var _e = react_1.useState(''), selectedBank = _e[0], setSelectedBank = _e[1];
    var _f = profile_1.useProfilePasswordValidation(), passwordHandleSubmit = _f.handleSubmit, registerPassword = _f.register, passwordErrors = _f.formState.errors;
    var user = AuthProvider_1.AuthContext().user;
    var _g = react_1.useState(), visibleForm = _g[0], setVisibility = _g[1];
    var _h = react_1.useState([]), suppliers = _h[0], setSuppliers = _h[1]; // State to store suppliers
    var _j = react_1.useState([]), customers = _j[0], setCustomers = _j[1];
    var userInfo = user.user;
    // Fetch customers from Firebase
    react_1.useEffect(function () {
        var fetchCustomers = function () { return __awaiter(void 0, void 0, void 0, function () {
            var db, customersRef, snapshot, data_1, customersList, error_1;
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
                            data_1 = snapshot.val();
                            customersList = Object.keys(data_1).map(function (key) { return (__assign({ id: key }, data_1[key])); });
                            setCustomers(customersList);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error fetching customers:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchCustomers();
    }, []);
    // Fetch suppliers from Firebase
    react_1.useEffect(function () {
        var fetchSuppliers = function () { return __awaiter(void 0, void 0, void 0, function () {
            var db, suppliersRef, snapshot, data_2, suppliersList, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = database_1.getDatabase();
                        suppliersRef = database_1.ref(db, 'Suppliers');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.get(suppliersRef)];
                    case 2:
                        snapshot = _a.sent();
                        if (snapshot.exists()) {
                            data_2 = snapshot.val();
                            suppliersList = Object.keys(data_2).map(function (key) { return (__assign({ id: key }, data_2[key])); });
                            setSuppliers(suppliersList);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Error fetching suppliers:", error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchSuppliers();
    }, []);
    // Fetch banks from Firebase based on payment mode
    react_1.useEffect(function () {
        var fetchBanks = function () { return __awaiter(void 0, void 0, void 0, function () {
            var db, banksRef, snapshot, data_3, banksList, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Fetching banks for payment mode:', paymentMode);
                        if (!(paymentMode === 'online' || paymentMode === 'cheque')) return [3 /*break*/, 5];
                        db = database_1.getDatabase();
                        banksRef = database_1.ref(db, 'Banks');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.get(banksRef)];
                    case 2:
                        snapshot = _a.sent();
                        if (snapshot.exists()) {
                            data_3 = snapshot.val();
                            console.log('Fetched banks data:', data_3);
                            banksList = Object.keys(data_3).map(function (key) { return data_3[key]; });
                            setBanks(banksList);
                        }
                        else {
                            console.log('No data available in the Banks path');
                            setBanks([]);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Error fetching banks for " + paymentMode + " payment mode:", error_3);
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
    var handlePaymentModeChange = function (event) {
        setPaymentMode(event.target.value);
    };
    var submitForm = function (_a) {
        var Accounts_date = _a.Accounts_date, Accounts_id = _a.Accounts_id, customer_name = _a.customer_name, note = _a.note, total_amount = _a.total_amount;
        return __awaiter(void 0, void 0, void 0, function () {
            var db_1, AccountsIdRef, Accountsnapshot, nextAccountsId_1, AccountsData, AccountsRef, AccountsProductRef, productPromises, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("Form data received:", {
                            Accounts_date: Accounts_date,
                            Accounts_id: Accounts_id,
                            customer_name: customer_name,
                            note: note,
                            total_amount: total_amount
                        });
                        if (!(Accounts_date && Accounts_id && customer_name && note && total_amount)) return [3 /*break*/, 8];
                        db_1 = database_1.getDatabase();
                        AccountsIdRef = database_1.ref(db_1, 'Accounts_id_counter');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        console.log("Fetching the next Accounts ID...");
                        return [4 /*yield*/, database_1.get(AccountsIdRef)];
                    case 2:
                        Accountsnapshot = _b.sent();
                        nextAccountsId_1 = (Accountsnapshot.val() || 0) + 1;
                        console.log("Next Accounts ID:", nextAccountsId_1);
                        AccountsData = {
                            Accounts_id: nextAccountsId_1,
                            Accounts_date: Accounts_date,
                            customer_name: customer_name,
                            note: note,
                            Account_type: "Accounts",
                            total_amount: total_amount,
                            products: productTableData // Add product table data here
                        };
                        console.log("Accounts data to be saved:", AccountsData);
                        AccountsRef = database_1.ref(db_1, 'Accounts/' + nextAccountsId_1);
                        return [4 /*yield*/, database_1.set(AccountsRef, AccountsData)];
                    case 3:
                        _b.sent();
                        // console.log("Accounts data saved successfully.");
                        // Update the Accounts ID counter
                        return [4 /*yield*/, database_1.set(AccountsIdRef, nextAccountsId_1)];
                    case 4:
                        // console.log("Accounts data saved successfully.");
                        // Update the Accounts ID counter
                        _b.sent();
                        AccountsProductRef = database_1.ref(db_1, 'AccountsProduct');
                        productPromises = productTableData.map(function (product, index) {
                            var productEntry = {
                                Accounts_id: nextAccountsId_1,
                                product_id: product.product_id,
                                quantity: product.qty,
                                price: product.price,
                                Account_type: "Accounts",
                                total: product.total
                            };
                            var productKey = nextAccountsId_1 + "_" + (index + 1);
                            return database_1.set(database_1.ref(db_1, "AccountsProduct/" + productKey), productEntry);
                        });
                        return [4 /*yield*/, Promise.all(productPromises)];
                    case 5:
                        _b.sent();
                        alert("Accounts information saved");
                        setVisibility("");
                        router.push('/Accounts'); // Redirect to the Accounts page
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _b.sent();
                        console.error("Error saving Accounts information:", e_1);
                        alert("Failed to save Accounts information " + e_1.message);
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        console.error("Form validation failed. Missing required fields.");
                        _b.label = 9;
                    case 9: return [2 /*return*/];
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
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("section", { className: "dashboard-area" },
            react_1["default"].createElement(DashboardNav_1["default"], null),
            react_1["default"].createElement("div", { className: "dashboard-content-wrap" },
                react_1["default"].createElement("div", { className: "dashboard-bread dashboard--bread dashboard-bread-2" },
                    react_1["default"].createElement("div", { className: "container-fluid" },
                        react_1["default"].createElement("div", { className: "row align-items-center" },
                            react_1["default"].createElement("div", { className: "col-lg-6" },
                                react_1["default"].createElement("div", { className: "breadcrumb-content" },
                                    react_1["default"].createElement("div", { className: "section-heading" },
                                        react_1["default"].createElement("h2", { className: "sec__title font-size-30 text-white" }, "Add Account")))),
                            react_1["default"].createElement("div", { className: "col-lg-6" },
                                react_1["default"].createElement("div", { className: "breadcrumb-list text-right" },
                                    react_1["default"].createElement("ul", { className: "list-items" },
                                        react_1["default"].createElement("li", null,
                                            react_1["default"].createElement("a", { href: "/", className: "text-white" }, "Home")),
                                        react_1["default"].createElement("li", null, "Dashboard"),
                                        react_1["default"].createElement("li", null, "Accounts"))))))),
                react_1["default"].createElement("div", { className: "dashboard-main-content" },
                    react_1["default"].createElement("div", { className: "container-fluid" },
                        react_1["default"].createElement("section", { className: "listing-form" },
                            react_1["default"].createElement("div", { className: "container-fluid" },
                                react_1["default"].createElement("div", { className: "row" },
                                    react_1["default"].createElement("div", { className: "col-lg-3" },
                                        react_1["default"].createElement("div", { className: "form-box" },
                                            react_1["default"].createElement("div", { className: "form-content contact-form-action" },
                                                react_1["default"].createElement(TreeView_1["default"], null))),
                                        react_1["default"].createElement("div", { className: "form-box" },
                                            react_1["default"].createElement("div", { className: "form-content contact-form-action" },
                                                react_1["default"].createElement(TabsComponents_1["default"], null)))),
                                    react_1["default"].createElement("div", { className: "col-lg-9" },
                                        react_1["default"].createElement("div", { className: "form-box" },
                                            react_1["default"].createElement("div", { className: "form-content contact-form-action" },
                                                react_1["default"].createElement("div", { className: "card" },
                                                    react_1["default"].createElement("div", { style: { background: 'purple', padding: 10 }, className: "card-header mt-2" },
                                                        react_1["default"].createElement("h1", { style: { color: '#fff' }, className: "text-center" }, "Account Ledger")),
                                                    react_1["default"].createElement("div", { className: "card-body" },
                                                        react_1["default"].createElement("h1", null, "Accounts Table"))))))))),
                        react_1["default"].createElement("div", { className: "border-top mt-5" }),
                        react_1["default"].createElement("div", { className: "row align-items-center" },
                            react_1["default"].createElement("div", { className: "col-lg-7" },
                                react_1["default"].createElement("div", { className: "copy-right padding-top-30px" },
                                    react_1["default"].createElement("p", { className: "copy__desc" },
                                        "\u00A9 Copyright Sadaftraders 2024. Developed by",
                                        react_1["default"].createElement("a", { target: "_blank", href: "" }, "Smartest Developers")))),
                            react_1["default"].createElement("div", { className: "col-lg-5" },
                                react_1["default"].createElement("div", { className: "copy-right-content text-right padding-top-30px" },
                                    react_1["default"].createElement("ul", { className: "social-profile" },
                                        react_1["default"].createElement("li", null,
                                            react_1["default"].createElement("a", { href: "#" },
                                                react_1["default"].createElement("i", { className: "lab la-facebook-f" }))),
                                        react_1["default"].createElement("li", null,
                                            react_1["default"].createElement("a", { href: "#" },
                                                react_1["default"].createElement("i", { className: "lab la-twitter" }))),
                                        react_1["default"].createElement("li", null,
                                            react_1["default"].createElement("a", { href: "#" },
                                                react_1["default"].createElement("i", { className: "lab la-instagram" }))),
                                        react_1["default"].createElement("li", null,
                                            react_1["default"].createElement("a", { href: "#" },
                                                react_1["default"].createElement("i", { className: "lab la-linkedin-in" }))))))))))),
        react_1["default"].createElement("div", { id: "back-to-top" },
            react_1["default"].createElement("i", { className: "la la-angle-up", title: "Go top" }))));
};
exports["default"] = AddAccount;
