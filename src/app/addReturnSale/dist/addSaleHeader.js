"use strict";
exports.__esModule = true;
var react_1 = require("react");
function addSaleHeader() {
    return (react_1["default"].createElement("div", { className: "dashboard-content-wrap" },
        react_1["default"].createElement("div", { className: "dashboard-bread dashboard--bread dashboard-bread-2" },
            react_1["default"].createElement("div", { className: "container-fluid" },
                react_1["default"].createElement("div", { className: "row align-items-center" },
                    react_1["default"].createElement("div", { className: "col-lg-6" },
                        react_1["default"].createElement("div", { className: "breadcrumb-content" },
                            react_1["default"].createElement("div", { className: "section-heading" },
                                react_1["default"].createElement("h2", { className: "sec__title font-size-30 text-white" }, "add Sale")))),
                    react_1["default"].createElement("div", { className: "col-lg-6" },
                        react_1["default"].createElement("div", { className: "breadcrumb-list text-right" },
                            react_1["default"].createElement("ul", { className: "list-items" },
                                react_1["default"].createElement("li", null,
                                    react_1["default"].createElement("a", { href: "/", className: "text-white" }, "Home")),
                                react_1["default"].createElement("li", null, "Dashboard"),
                                react_1["default"].createElement("li", null, "Sales")))))))));
}
exports["default"] = addSaleHeader;
