import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import AuthProvider from '@/provider/AuthProvider'
// import NextProgress from 'nextjs-progressbar';

export const metadata: Metadata = {
  title: 'Sadaf Traders - Leading the Way in Premium Food Trading',
  description: 'Sadaf Traders is a premier food trading company, dedicated to providing high-quality, diverse food products. With a commitment to excellence and customer satisfaction, we connect global markets with the finest culinary offerings. Discover the best in food trade with Sadaf Traders.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light-style layout-navbar-fixed layout-menu-fixed layout-compact " dir="ltr" data-theme="theme-default" data-assets-path="template/assets/" data-template="vertical-menu-template">
    <head>
      <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      <meta name="author" content="SmartestDevelopers" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>Dashboard - Sadaf Traders </title>
      <link rel="icon" href="images/favicon.png" />
    </head>
    <body>
      {/* <NextProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        /> */}
      <AuthProvider>
        <Header/>
          {children}
      </AuthProvider>
      <div id="back-to-top">
        <i className="la la-angle-up" title="Go top"></i>
      </div>
      <script src="template/js/jquery-3.4.1.min.js"></script>
      <script src="template/js/jquery-ui.js"></script>
      <script src="template/js/popper.min.js"></script>
      <script src="template/js/bootstrap.min.js"></script>
      <script src="template/js/bootstrap-select.min.js"></script>
      <script src="template/js/moment.min.js"></script>
      <script src="template/js/daterangepicker.js"></script>
      <script src="template/js/owl.carousel.min.js"></script>
      <script src="template/js/jquery.fancybox.min.js"></script>
      <script src="template/js/jquery.countTo.min.js"></script>
      <script src="template/js/animated-headline.js"></script>
      <script src="template/js/jquery.sparkline.js"></script>
      <script src="template/js/dashboard.js"></script>
      <script src="template/js/chart.js"></script>
      <script src="template/js/chart.extension.js"></script>
      <script src="template/js/bar-chart.js"></script>
      <script src="template/js/line-chart.js"></script>
      <script src="template/js/jquery.ripples-min.js"></script>
      <script src="template/js/main.js"></script>
    </body>
    </html>
  )
}
