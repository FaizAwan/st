"use strict";
exports.__esModule = true;
var routes_1 = require("@/constants/routes");
var AuthProvider_1 = require("@/provider/AuthProvider");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var GUEST_ROUTES = [routes_1.LOGIN_ROUTE, routes_1.REGISTER_ROUTE];
var useAuthentication = function () {
    var user = AuthProvider_1.AuthContext().user;
    var userInfo = (user === null || user === void 0 ? void 0 : user.user) || null;
    var router = navigation_1.useRouter();
    var currentRoute = window.location.pathname;
    react_1.useEffect(function () {
        if (!userInfo && !GUEST_ROUTES.includes(currentRoute)) {
            router.push(routes_1.LOGIN_ROUTE);
        }
        if (userInfo && GUEST_ROUTES.includes(currentRoute)) {
            router.push(routes_1.PROFILE_ROUTE);
        }
    }, [currentRoute, router, userInfo]); // Added dependencies here
};
exports["default"] = useAuthentication;
