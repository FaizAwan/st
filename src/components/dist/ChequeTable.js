"use client";
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var jquery_1 = require("jquery");
var ChequeTable = function () {
    var _a = react_1.useState([{ id: 0, key: Date.now() + "-0" }]), rows = _a[0], setRows = _a[1];
    var _b = react_1.useState(["Cheque 1", "Cheque 2", "Cheque 3", "Cheque 4"]), products = _b[0], setProducts = _b[1];
    var _c = react_1.useState(0), subTotal = _c[0], setSubTotal = _c[1];
    var _d = react_1.useState(0), tax = _d[0], setTax = _d[1];
    var _e = react_1.useState(0), taxAmount = _e[0], setTaxAmount = _e[1];
    var _f = react_1.useState(0), totalAmount = _f[0], setTotalAmount = _f[1];
    var calcTotal = react_1.useCallback(function () {
        var taxAmount = (subTotal * tax) / 100;
        setTaxAmount(taxAmount);
        setTotalAmount(subTotal + taxAmount);
    }, [subTotal, tax]);
    var calc = react_1.useCallback(function () {
        var total = 0;
        jquery_1["default"]('#tab_logic tbody tr').each(function () {
            var qty = parseFloat(jquery_1["default"](this).find('.qty').val()) || 0;
            var price = parseFloat(jquery_1["default"](this).find('.price').val()) || 0;
            jquery_1["default"](this).find('.total').val((qty * price).toFixed(2));
            total += qty * price;
        });
        setSubTotal(total);
        calcTotal();
    }, [calcTotal]);
    react_1.useEffect(function () {
        jquery_1["default"]('#tab_logic tbody').on('keyup change', calc);
        jquery_1["default"]('#tax').on('keyup change', calcTotal);
    }, [calc, calcTotal]);
    var addRow = function () {
        var newRow = { id: rows.length, key: Date.now() + "-" + rows.length };
        setRows(__spreadArrays(rows, [newRow]));
    };
    var deleteRow = function (key) {
        setRows(rows.filter(function (row) { return row.key !== key; }));
    };
    var optionChecker = function (e) {
        var myOption = e.target.value;
        var s = 0;
        jquery_1["default"]('#tab_logic tbody tr select').each(function () {
            if (jquery_1["default"](this).val() === myOption)
                s++;
        });
        if (s > 1) {
            alert(myOption + " has been added already. Try a new one.");
        }
    };
    return (React.createElement("div", { className: "container" },
        React.createElement("div", { className: "row clearfix" },
            React.createElement("div", { className: "col-md-12" },
                React.createElement("table", { className: "table table-bordered table-hover", id: "tab_logic" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", { className: "text-center" }, " # "),
                            React.createElement("th", { className: "text-center" }, " Cheque Number "),
                            React.createElement("th", { className: "text-center" }, " Date "),
                            React.createElement("th", { className: "text-center" }, " Cheque Amount "),
                            React.createElement("th", { className: "text-center" }, " Note "),
                            React.createElement("th", { className: "text-center" }, " Actions "))),
                    React.createElement("tbody", null, rows.map(function (row, index) { return (React.createElement("tr", { id: "addr" + index, key: row.key },
                        React.createElement("td", null, index + 1),
                        React.createElement("td", null,
                            React.createElement("select", { className: "form-control", name: "product[" + index + "]", onChange: optionChecker },
                                React.createElement("option", { value: "" }, "Select Cheque"),
                                products.map(function (product, idx) { return (React.createElement("option", { key: idx, value: product }, product)); }))),
                        React.createElement("td", null,
                            React.createElement("input", { type: "date", name: "date[" + index + "]", placeholder: "Enter Date", className: "form-control date", step: "0", min: "0" })),
                        React.createElement("td", null,
                            React.createElement("input", { type: "number", name: "chequeAmount[" + index + "]", placeholder: "Enter Cheque Amount", className: "form-control chequeAmount", step: "0.00", min: "0" })),
                        React.createElement("td", null,
                            React.createElement("input", { type: "number", name: "total[" + index + "]", placeholder: "0.00", className: "form-control total", readOnly: true })),
                        React.createElement("td", null,
                            React.createElement("button", { className: "btn btn-danger", onClick: function () { return deleteRow(row.key); } }, "Delete")))); }))))),
        React.createElement("div", { className: "row clearfix" },
            React.createElement("div", { className: "col-md-12" },
                React.createElement("button", { onClick: addRow, className: "btn btn-success pull-left" }, "Add Row"))),
        React.createElement("div", { className: "row clearfix", style: { marginTop: 20 } },
            React.createElement("div", { className: "pull-right col-md-8" }, "\u00A0\u00A0"),
            React.createElement("div", { className: "pull-right col-md-4" },
                React.createElement("table", { className: "table table-bordered table-hover", id: "tab_logic_total" },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("th", { className: "text-center" }, "Grand Total"),
                            React.createElement("td", { className: "text-center" },
                                React.createElement("input", { type: "number", name: "total_amount", id: "total_amount", placeholder: "0.00", className: "form-control", value: totalAmount.toFixed(2), readOnly: true })))))))));
};
exports["default"] = ChequeTable;
