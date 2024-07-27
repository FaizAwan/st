import React, { useState } from 'react';
import Link from 'next/link';
import { FaTachometerAlt, FaList, FaAngleDown, FaAngleRight, FaAngleDoubleRight ,  FaShoppingCart  } from 'react-icons/fa';
import styles from './LeftNavigation.module.css';

const LeftNavigation: React.FC = ({params}) => {
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (menu: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="sidebar-menu-wrap">
      <ul className="sidebar-menu toggle-menu list-items">
        <li className="page-active">
          <Link href="/" className={styles.navLink}>
            <FaTachometerAlt className="mr-2" />
            <span>Home</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <div onClick={() => handleToggle('menu1')} className={styles.navLink}>
            <FaList className="mr-2" />
            <span>Accounts</span>
            {openSubmenus['menu1'] ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          {openSubmenus['menu1'] && (
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <Link href="/addAccount" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>Add Accounts</span>
                </Link>
              </li>

              <li className={styles.subNavItem}>
                <Link href="/customers" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>Customers</span>
                </Link>
              </li>
              <li className={styles.subNavItem}>
                <Link href="/suppliers" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Suppliers</span>
                </Link>
              </li>
              <li className={styles.subNavItem}>
                <Link href="/banks" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Banks</span>
                </Link>
              </li>
              <li className={styles.subNavItem}>
                <Link href="/expenses" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Expenses</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className={styles.navItem}>
          <div onClick={() => handleToggle('menu2')} className={styles.navLink}>
            <FaList className="mr-2" />
            <span>Products</span>
            {openSubmenus['menu2'] ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          {openSubmenus['menu2'] && (
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <Link href="/category" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Category</span>
                </Link>
              </li>
              <li className={styles.subNavItem}>
                <Link href="/products" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Products</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className={styles.navItem}>
          <div onClick={() => handleToggle('menu3')} className={styles.navLink}>
            <FaShoppingCart  className="mr-2" />
            <span>Sales</span>
            {openSubmenus['menu3'] ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          {openSubmenus['menu3'] && (
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <Link href="/sales" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Sales List</span>
                </Link>
              </li>
              <li className={styles.subNavItem}>
                <Link href="/addSale" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Add Sale</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className={styles.navItem}>
          <div onClick={() => handleToggle('menu5')} className={styles.navLink}>
            <FaShoppingCart  className="mr-2" />
            <span>Return Sales</span>
            {openSubmenus['menu5'] ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          {openSubmenus['menu5'] && (
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <Link href="/returnSales" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Return Sales List</span>
                </Link>
              </li>
              <li className={styles.subNavItem}>
                <Link href="/addReturnSale" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Add Return Sale</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className={styles.navItem}>
          <div onClick={() => handleToggle('menu4')} className={styles.navLink}>
            <FaShoppingCart  className="mr-2" />
            <span>Purchases</span>
            {openSubmenus['menu4'] ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          {openSubmenus['menu4'] && (
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <Link href="/purchases" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Purchase List</span>
                </Link>
              </li>
              <li className={styles.subNavItem}>
                <Link href="/addPurchase" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Add Purchase</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className={styles.navItem}>
          <div onClick={() => handleToggle('menu6')} className={styles.navLink}>
            <FaShoppingCart  className="mr-2" />
            <span>Return Purchases</span>
            {openSubmenus['menu6'] ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          {openSubmenus['menu6'] && (
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <Link href="/returnPurchases" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Return Purchase List</span>
                </Link>
              </li>
              <li className={styles.subNavItem}>
                <Link href="/addReturnPurchase" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Add Return Purchase</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className={styles.navItem}>
          <div onClick={() => handleToggle('menu7')} className={styles.navLink}>
            <FaShoppingCart  className="mr-2" />
            <span>Vouchers</span>
            {openSubmenus['menu7'] ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          {openSubmenus['menu7'] && (
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <Link href="/vouchers" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Vouchers List</span>
                </Link>
              </li>
              <li className={styles.subNavItem}>
                <Link href="/vouchers/customers" className={styles.subNavLink}>
                <FaAngleDoubleRight  className="mr-2" />
                  <span>
                  Customer Vouchers</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

      </ul>
      </div>
  );
};

export default LeftNavigation;
