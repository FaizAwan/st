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
var link_1 = require("next/link");
var image_1 = require("next/image");
var useAuthentication_1 = require("@/hooks/useAuthentication");
var AuthProvider_1 = require("@/provider/AuthProvider");
var profile_1 = require("@/validationSchema/profile");
var auth_1 = require("firebase/auth");
var react_1 = require("react");
var database_1 = require("firebase/database");
var Products = function () {
    useAuthentication_1["default"]();
    var _a = profile_1.useProfileValidation(), handleSubmit = _a.handleSubmit, register = _a.register, errors = _a.formState.errors;
    var _b = react_1.useState([]), Products = _b[0], setProducts = _b[1];
    var _c = profile_1.useProfilePasswordValidation(), passwordHandleSubmit = _c.handleSubmit, registerPassword = _c.register, passwordErrors = _c.formState.errors;
    var user = AuthProvider_1.AuthContext().user;
    var _d = react_1.useState(), visibleForm = _d[0], setVisibility = _d[1];
    var userInfo = user.user;
    react_1.useEffect(function () {
        var db = database_1.getDatabase();
        var ProductsRef = database_1.ref(db, 'Products/');
        database_1.onValue(ProductsRef, function (snapshot) {
            var data = snapshot.val();
            var ProductsList = Object.keys(data).map(function (key) { return (__assign({ id: key }, data[key])); });
            setProducts(ProductsList);
        });
    }, []);
    var submitForm = function (_a) {
        var name = _a.name, photo = _a.photo;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (name && photo) {
                    auth_1.updateProfile(userInfo, {
                        displayName: name,
                        photoURL: photo
                    }).then(function (response) {
                        console.log("profile updated");
                        setVisibility("");
                    })["catch"](function (e) {
                        console.log("failed to update profile ", e.message);
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    var submitPasswordForm = function (_a) {
        var password = _a.password;
        if (password) {
            auth_1.updatePassword(userInfo, password).then(function (response) {
                console.log("password changed");
                setVisibility("");
            })["catch"](function (e) {
                console.log("failed to changes password ", e.message);
            });
        }
    };
    return (React.createElement("div", null,
        React.createElement("section", { className: "dashboard-area" },
            React.createElement("div", { className: "dashboard-nav dashboard--nav" },
                React.createElement("div", { className: "container-fluid" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-lg-12" },
                            React.createElement("div", { className: "menu-wrapper" },
                                React.createElement("div", { className: "logo mr-5" },
                                    React.createElement("a", { href: "index.html" }, "SADAF TRADERS"),
                                    React.createElement("div", { className: "menu-toggler" },
                                        React.createElement("i", { className: "la la-bars" }),
                                        React.createElement("i", { className: "la la-times" })),
                                    React.createElement("div", { className: "user-menu-open" },
                                        React.createElement("i", { className: "la la-user" }))),
                                React.createElement("div", { className: "dashboard-search-box" },
                                    React.createElement("div", { className: "contact-form-action" },
                                        React.createElement("form", { action: "#" },
                                            React.createElement("div", { className: "form-group mb-0" },
                                                React.createElement("input", { className: "form-control", type: "text", name: "text", placeholder: "Search" }),
                                                React.createElement("button", { className: "search-btn" },
                                                    React.createElement("i", { className: "la la-search" })))))),
                                React.createElement("div", { className: "nav-btn ml-auto" },
                                    React.createElement("div", { className: "notification-wrap d-flex align-items-center" },
                                        React.createElement("div", { className: "notification-item mr-2" },
                                            React.createElement("div", { className: "dropdown" },
                                                React.createElement("a", { href: "#", className: "dropdown-toggle drop-reveal-toggle-icon", id: "notificationDropdownMenu", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
                                                    React.createElement("i", { className: "la la-bell" }),
                                                    React.createElement("span", { className: "noti-count" }, "4")),
                                                React.createElement("div", { className: "dropdown-menu dropdown-reveal dropdown-menu-xl dropdown-menu-right" },
                                                    React.createElement("div", { className: "dropdown-header drop-reveal-header" },
                                                        React.createElement("h6", { className: "title" },
                                                            "You have ",
                                                            React.createElement("strong", { className: "text-black" }, "4"),
                                                            " notifications")),
                                                    React.createElement("div", { className: "list-group drop-reveal-list" },
                                                        React.createElement("a", { href: "#", className: "list-group-item list-group-item-action" },
                                                            React.createElement("div", { className: "msg-body d-flex align-items-center" },
                                                                React.createElement("div", { className: "icon-element flex-shrink-0 mr-3 ml-0" },
                                                                    React.createElement("i", { className: "la la-bell" })),
                                                                React.createElement("div", { className: "msg-content w-100" },
                                                                    React.createElement("h3", { className: "title pb-1" }, "Your request has been sent"),
                                                                    React.createElement("p", { className: "msg-text" }, "2 min ago")))),
                                                        React.createElement("a", { href: "#", className: "list-group-item list-group-item-action" },
                                                            React.createElement("div", { className: "msg-body d-flex align-items-center" },
                                                                React.createElement("div", { className: "icon-element bg-2 flex-shrink-0 mr-3 ml-0" },
                                                                    React.createElement("i", { className: "la la-check" })),
                                                                React.createElement("div", { className: "msg-content w-100" },
                                                                    React.createElement("h3", { className: "title pb-1" }, "Your account has been created"),
                                                                    React.createElement("p", { className: "msg-text" }, "1 day ago")))),
                                                        React.createElement("a", { href: "#", className: "list-group-item list-group-item-action" },
                                                            React.createElement("div", { className: "msg-body d-flex align-items-center" },
                                                                React.createElement("div", { className: "icon-element bg-3 flex-shrink-0 mr-3 ml-0" },
                                                                    React.createElement("i", { className: "la la-user" })),
                                                                React.createElement("div", { className: "msg-content w-100" },
                                                                    React.createElement("h3", { className: "title pb-1" }, "Your account updated"),
                                                                    React.createElement("p", { className: "msg-text" }, "2 hrs ago")))),
                                                        React.createElement("a", { href: "#", className: "list-group-item list-group-item-action" },
                                                            React.createElement("div", { className: "msg-body d-flex align-items-center" },
                                                                React.createElement("div", { className: "icon-element bg-4 flex-shrink-0 mr-3 ml-0" },
                                                                    React.createElement("i", { className: "la la-lock" })),
                                                                React.createElement("div", { className: "msg-content w-100" },
                                                                    React.createElement("h3", { className: "title pb-1" }, "Your password changed"),
                                                                    React.createElement("p", { className: "msg-text" }, "Yesterday"))))),
                                                    React.createElement("a", { href: "#", className: "dropdown-item drop-reveal-btn text-center" }, "View all")))),
                                        React.createElement("div", { className: "notification-item mr-2" },
                                            React.createElement("div", { className: "dropdown" },
                                                React.createElement("a", { href: "#", className: "dropdown-toggle drop-reveal-toggle-icon", id: "messageDropdownMenu", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
                                                    React.createElement("i", { className: "la la-envelope" }),
                                                    React.createElement("span", { className: "noti-count" }, "4")),
                                                React.createElement("div", { className: "dropdown-menu dropdown-reveal dropdown-menu-xl dropdown-menu-right" },
                                                    React.createElement("div", { className: "dropdown-header drop-reveal-header" },
                                                        React.createElement("h6", { className: "title" },
                                                            "You have ",
                                                            React.createElement("strong", { className: "text-black" }, "4"),
                                                            " messages")),
                                                    React.createElement("div", { className: "list-group drop-reveal-list" },
                                                        React.createElement("a", { href: "#", className: "list-group-item list-group-item-action" },
                                                            React.createElement("div", { className: "msg-body d-flex align-items-center" },
                                                                React.createElement("div", { className: "avatar flex-shrink-0 mr-3" },
                                                                    React.createElement(image_1["default"], { alt: "tagLine", src: "/template/images/team8.jpg", layout: "fill", objectFit: "cover" })),
                                                                React.createElement("div", { className: "msg-content w-100" },
                                                                    React.createElement("div", { className: "d-flex align-items-center justify-content-between" },
                                                                        React.createElement("h3", { className: "title pb-1" }, "Steve Wornder"),
                                                                        React.createElement("span", { className: "msg-text" }, "3 min ago")),
                                                                    React.createElement("p", { className: "msg-text" }, "Ancillae delectus necessitatibus no eam")))),
                                                        React.createElement("a", { href: "#", className: "list-group-item list-group-item-action" },
                                                            React.createElement("div", { className: "msg-body d-flex align-items-center" },
                                                                React.createElement("div", { className: "avatar flex-shrink-0 mr-3" },
                                                                    React.createElement(image_1["default"], { alt: "tagLine", src: "/template/images/team9.jpg", layout: "fill", objectFit: "cover" })),
                                                                React.createElement("div", { className: "msg-content w-100" },
                                                                    React.createElement("div", { className: "d-flex align-items-center justify-content-between" },
                                                                        React.createElement("h3", { className: "title pb-1" }, "Marc Twain"),
                                                                        React.createElement("span", { className: "msg-text" }, "1 hrs ago")),
                                                                    React.createElement("p", { className: "msg-text" }, "Ancillae delectus necessitatibus no eam")))),
                                                        React.createElement("a", { href: "#", className: "list-group-item list-group-item-action" },
                                                            React.createElement("div", { className: "msg-body d-flex align-items-center" },
                                                                React.createElement("div", { className: "avatar flex-shrink-0 mr-3" },
                                                                    React.createElement(image_1["default"], { alt: "tagLine", src: "/template/images/team10.jpg", layout: "fill", objectFit: "cover" })),
                                                                React.createElement("div", { className: "msg-content w-100" },
                                                                    React.createElement("div", { className: "d-flex align-items-center justify-content-between" },
                                                                        React.createElement("h3", { className: "title pb-1" }, "Enzo Ferrari"),
                                                                        React.createElement("span", { className: "msg-text" }, "2 hrs ago")),
                                                                    React.createElement("p", { className: "msg-text" }, "Ancillae delectus necessitatibus no eam")))),
                                                        React.createElement("a", { href: "#", className: "list-group-item list-group-item-action" },
                                                            React.createElement("div", { className: "msg-body d-flex align-items-center" },
                                                                React.createElement("div", { className: "avatar flex-shrink-0 mr-3" },
                                                                    React.createElement(image_1["default"], { alt: "tagLine", src: "/template/images/team11.jpg", layout: "fill", objectFit: "cover" })),
                                                                React.createElement("div", { className: "msg-content w-100" },
                                                                    React.createElement("div", { className: "d-flex align-items-center justify-content-between" },
                                                                        React.createElement("h3", { className: "title pb-1" }, "Lucas Swing"),
                                                                        React.createElement("span", { className: "msg-text" }, "3 hrs ago")),
                                                                    React.createElement("p", { className: "msg-text" }, "Ancillae delectus necessitatibus no eam"))))),
                                                    React.createElement("a", { href: "#", className: "dropdown-item drop-reveal-btn text-center" }, "View all")))),
                                        React.createElement("div", { className: "notification-item" },
                                            React.createElement("div", { className: "dropdown" },
                                                React.createElement("a", { href: "#", className: "dropdown-toggle", id: "userDropdownMenu", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
                                                    React.createElement("div", { className: "d-flex align-items-center" },
                                                        React.createElement("div", { className: "avatar avatar-sm flex-shrink-0 mr-2" },
                                                            React.createElement(image_1["default"], { alt: "tagLine", src: "/template/images/team8.jpg", layout: "fill", objectFit: "cover" })),
                                                        React.createElement("span", { className: "font-size-14 font-weight-bold" }, "Royel Admin"))),
                                                React.createElement("div", { className: "dropdown-menu dropdown-reveal dropdown-menu-md dropdown-menu-right" },
                                                    React.createElement("div", { className: "dropdown-item drop-reveal-header user-reveal-header" },
                                                        React.createElement("h6", { className: "title text-uppercase" }, "Welcome!")),
                                                    React.createElement("div", { className: "list-group drop-reveal-list user-drop-reveal-list" },
                                                        React.createElement("a", { href: "admin-dashboard-settings.html", className: "list-group-item list-group-item-action" },
                                                            React.createElement("div", { className: "msg-body" },
                                                                React.createElement("div", { className: "msg-content" },
                                                                    React.createElement("h3", { className: "title" },
                                                                        React.createElement("i", { className: "la la-user mr-2" }),
                                                                        " Edit Profile")))),
                                                        React.createElement("a", { href: "admin-dashboard-orders.html", className: "list-group-item list-group-item-action" },
                                                            React.createElement("div", { className: "msg-body" },
                                                                React.createElement("div", { className: "msg-content" },
                                                                    React.createElement("h3", { className: "title" },
                                                                        React.createElement("i", { className: "la la-shopping-cart mr-2" }),
                                                                        "Products")))),
                                                        React.createElement("a", { href: "#", className: "list-group-item list-group-item-action" },
                                                            React.createElement("div", { className: "msg-body" },
                                                                React.createElement("div", { className: "msg-content" },
                                                                    React.createElement("h3", { className: "title" },
                                                                        React.createElement("i", { className: "la la-bell mr-2" }),
                                                                        "Messages")))),
                                                        React.createElement("a", { href: "admin-dashboard-settings.html", className: "list-group-item list-group-item-action" },
                                                            React.createElement("div", { className: "msg-body" },
                                                                React.createElement("div", { className: "msg-content" },
                                                                    React.createElement("h3", { className: "title" },
                                                                        React.createElement("i", { className: "la la-gear mr-2" }),
                                                                        "Settings")))),
                                                        React.createElement("div", { className: "section-block" }),
                                                        React.createElement("a", { href: "index.html", className: "list-group-item list-group-item-action" },
                                                            React.createElement("div", { className: "msg-body" },
                                                                React.createElement("div", { className: "msg-content" },
                                                                    React.createElement("h3", { className: "title" },
                                                                        React.createElement("i", { className: "la la-power-off mr-2" }),
                                                                        "Logout"))))))))))))))),
            React.createElement("div", { className: "dashboard-content-wrap" },
                React.createElement("div", { className: "dashboard-bread dashboard--bread dashboard-bread-2" },
                    React.createElement("div", { className: "container-fluid" },
                        React.createElement("div", { className: "row align-items-center" },
                            React.createElement("div", { className: "col-lg-6" },
                                React.createElement("div", { className: "breadcrumb-content" },
                                    React.createElement("div", { className: "section-heading" },
                                        React.createElement("h2", { className: "sec__title font-size-30 text-white" }, "Products")))),
                            React.createElement("div", { className: "col-lg-6" },
                                React.createElement("div", { className: "breadcrumb-list text-right" },
                                    React.createElement("ul", { className: "list-items" },
                                        React.createElement("li", null,
                                            React.createElement("a", { href: "/", className: "text-white" }, "Home")),
                                        React.createElement("li", null, "Dashboard"),
                                        React.createElement("li", null, "Products"))))))),
                React.createElement("div", { className: "dashboard-main-content" },
                    React.createElement("div", { className: "container-fluid" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-lg-12" },
                                React.createElement("div", { className: "form-box" },
                                    React.createElement("div", { className: "form-title-wrap" },
                                        React.createElement("div", { className: "d-flex align-items-center justify-content-between" },
                                            React.createElement("div", null,
                                                React.createElement("h3", { className: "title" }, "Product Lists"),
                                                React.createElement("p", { className: "font-size-14" }, "Showing 1 to 8 of 20 results")),
                                            React.createElement("div", { className: "select-contain" },
                                                React.createElement(link_1["default"], { href: "addProduct", className: "btn btn-primary" }, " Add Product ")))),
                                    React.createElement("div", { className: "form-content" },
                                        React.createElement("div", { className: "table-form table-responsive" },
                                            React.createElement("table", { className: "table" },
                                                React.createElement("thead", null,
                                                    React.createElement("tr", null,
                                                        React.createElement("th", { scope: "col" }, "Product Name"),
                                                        React.createElement("th", { scope: "col" }, "Urdu Name"),
                                                        React.createElement("th", { scope: "col" }, "Main Category"),
                                                        React.createElement("th", { scope: "col" }, "Category"),
                                                        React.createElement("th", { scope: "col" }, "Price"),
                                                        React.createElement("th", { scope: "col" }, "Status"),
                                                        React.createElement("th", { scope: "col" }, "Action"))),
                                                React.createElement("tbody", null, Products.map(function (Product) { return (React.createElement("tr", { key: Product.id },
                                                    React.createElement("td", null,
                                                        React.createElement("div", { className: "table-content" },
                                                            React.createElement("h3", { className: "title" }, Product.name))),
                                                    React.createElement("td", null,
                                                        React.createElement("div", { className: "table-content" },
                                                            React.createElement("h3", { className: "title" }, Product.urdu_name))),
                                                    React.createElement("td", null, Product.main_category),
                                                    React.createElement("td", null, Product.category),
                                                    React.createElement("td", null,
                                                        Product.packing,
                                                        " KG"),
                                                    React.createElement("td", null, Product.status),
                                                    React.createElement("td", null,
                                                        React.createElement("div", { className: "table-content" },
                                                            React.createElement("a", { href: "", className: "theme-btn theme-btn-small mr-2", "data-toggle": "tooltip", "data-placement": "top", title: "Edit" },
                                                                React.createElement("i", { className: "la la-pencil" })),
                                                            React.createElement("a", { href: "#", className: "theme-btn theme-btn-small", "data-toggle": "modal", "data-target": "#modalPopup" },
                                                                React.createElement("i", { className: "la la-trash" })))))); })))))))),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-lg-12" },
                                React.createElement("nav", { "aria-label": "Page navigation example" },
                                    React.createElement("ul", { className: "pagination" },
                                        React.createElement("li", { className: "page-item" },
                                            React.createElement("a", { className: "page-link page-link-nav", href: "#", "aria-label": "Previous" },
                                                React.createElement("span", { "aria-hidden": "true" },
                                                    React.createElement("i", { className: "la la-angle-left" })),
                                                React.createElement("span", { className: "sr-only" }, "Previous"))),
                                        React.createElement("li", { className: "page-item" },
                                            React.createElement("a", { className: "page-link page-link-nav", href: "#" }, "1")),
                                        React.createElement("li", { className: "page-item active" },
                                            React.createElement("a", { className: "page-link page-link-nav", href: "#" },
                                                "2 ",
                                                React.createElement("span", { className: "sr-only" }, "(current)"))),
                                        React.createElement("li", { className: "page-item" },
                                            React.createElement("a", { className: "page-link page-link-nav", href: "#" }, "3")),
                                        React.createElement("li", { className: "page-item" },
                                            React.createElement("a", { className: "page-link page-link-nav", href: "#", "aria-label": "Next" },
                                                React.createElement("span", { "aria-hidden": "true" },
                                                    React.createElement("i", { className: "la la-angle-right" })),
                                                React.createElement("span", { className: "sr-only" }, "Next"))))))),
                        React.createElement("div", { className: "border-top mt-5" }),
                        React.createElement("div", { className: "row align-items-center" },
                            React.createElement("div", { className: "col-lg-7" },
                                React.createElement("div", { className: "copy-right padding-top-30px" },
                                    React.createElement("p", { className: "copy__desc" },
                                        "\u00A9 Copyright SadafTraders. Made with",
                                        React.createElement("span", { className: "la la-hand-rock-o" }),
                                        " by ",
                                        React.createElement("a", { href: "https://smartestdevelopers.com" }, "SmartestDevelopers")))),
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
exports["default"] = Products;
