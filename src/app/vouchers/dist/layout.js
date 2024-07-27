"use strict";
exports.__esModule = true;
exports.metadata = void 0;
require("../globals.css");
var Header_1 = require("@/components/Header");
var AuthProvider_1 = require("@/provider/AuthProvider");
// import NextProgress from 'nextjs-progressbar';
exports.metadata = {
    title: 'Sadaf Traders - Leading the Way in Premium Food Trading',
    description: 'Sadaf Traders is a premier food trading company, dedicated to providing high-quality, diverse food products. With a commitment to excellence and customer satisfaction, we connect global markets with the finest culinary offerings. Discover the best in food trade with Sadaf Traders.'
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en", className: "light-style layout-navbar-fixed layout-menu-fixed layout-compact ", dir: "ltr", "data-theme": "theme-default", "data-assets-path": "template/assets/", "data-template": "vertical-menu-template" },
        React.createElement("head", null,
            React.createElement("meta", { httpEquiv: "content-type", content: "text/html; charset=utf-8" }),
            React.createElement("meta", { name: "author", content: "SmartestDevelopers" }),
            React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
            React.createElement("meta", { httpEquiv: "X-UA-Compatible", content: "ie=edge" }),
            React.createElement("title", null, "Dashboard - Sadaf Traders "),
            React.createElement("link", { rel: "icon", href: "images/favicon.png" }),
            React.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap", rel: "stylesheet" }),
            React.createElement("link", { rel: "stylesheet", href: "template/css/bootstrap.min.css" }),
            React.createElement("link", { rel: "stylesheet", href: "template/css/bootstrap-select.min.css" }),
            React.createElement("link", { rel: "stylesheet", href: "template/css/line-awesome.css" }),
            React.createElement("link", { rel: "stylesheet", href: "template/css/owl.carousel.min.css" }),
            React.createElement("link", { rel: "stylesheet", href: "template/css/owl.theme.default.min.css" }),
            React.createElement("link", { rel: "stylesheet", href: "template/css/jquery.fancybox.min.css" }),
            React.createElement("link", { rel: "stylesheet", href: "template/css/daterangepicker.css" }),
            React.createElement("link", { rel: "stylesheet", href: "template/css/animate.min.css" }),
            React.createElement("link", { rel: "stylesheet", href: "template/css/animated-headline.css" }),
            React.createElement("link", { rel: "stylesheet", href: "template/css/jquery-ui.css" }),
            React.createElement("link", { rel: "stylesheet", href: "template/css/flag-icon.min.css" }),
            React.createElement("link", { rel: "stylesheet", href: "template/css/style.css" })),
        React.createElement("body", null,
            React.createElement(AuthProvider_1["default"], null,
                React.createElement(Header_1["default"], null),
                children),
            React.createElement("div", { id: "back-to-top" },
                React.createElement("i", { className: "la la-angle-up", title: "Go top" })),
            React.createElement("script", { src: "template/js/jquery-3.4.1.min.js" }),
            React.createElement("script", { src: "template/js/jquery-ui.js" }),
            React.createElement("script", { src: "template/js/popper.min.js" }),
            React.createElement("script", { src: "template/js/bootstrap.min.js" }),
            React.createElement("script", { src: "template/js/bootstrap-select.min.js" }),
            React.createElement("script", { src: "template/js/moment.min.js" }),
            React.createElement("script", { src: "template/js/daterangepicker.js" }),
            React.createElement("script", { src: "template/js/owl.carousel.min.js" }),
            React.createElement("script", { src: "template/js/jquery.fancybox.min.js" }),
            React.createElement("script", { src: "template/js/jquery.countTo.min.js" }),
            React.createElement("script", { src: "template/js/animated-headline.js" }),
            React.createElement("script", { src: "template/js/jquery.sparkline.js" }),
            React.createElement("script", { src: "template/js/dashboard.js" }),
            React.createElement("script", { src: "template/js/chart.js" }),
            React.createElement("script", { src: "template/js/chart.extension.js" }),
            React.createElement("script", { src: "template/js/bar-chart.js" }),
            React.createElement("script", { src: "template/js/line-chart.js" }),
            React.createElement("script", { src: "template/js/jquery.ripples-min.js" }),
            React.createElement("script", { src: "template/js/main.js" }))));
}
exports["default"] = RootLayout;
