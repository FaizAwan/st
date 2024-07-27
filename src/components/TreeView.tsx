import React, { useEffect } from 'react';
import styles from './TreeView.module.css';

const TreeView: React.FC = () => {
  useEffect(() => {
    const toggler = document.getElementsByClassName(styles.caret);
    const handleClick = function (this: HTMLElement) {
      const nested = this.parentElement?.querySelector(`.${styles.nested}`);
      if (nested) {
        nested.classList.toggle(styles.active);
        this.classList.toggle(styles['caret-down']);
      }
    };

    for (let i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener('click', handleClick);
    }

    // Clean up event listeners on component unmount
    return () => {
      for (let i = 0; i < toggler.length; i++) {
        toggler[i].removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <ul id="myUL">
      <li>
        <span className={styles.caret}>COA</span>
        <ul className={styles.nested}>
          <li>ASSET (Level1)
            <ul>
                    <li>
                    <span className={styles.caret}>CURRENT ASSET (Level2)</span>
                    <ul className={styles.nested}>
                    <li>Account Level 3</li>
                    <li>Account Level 3</li>
                    <li>
                        <span className={styles.caret}>Account Level 3</span>
                        <ul className={styles.nested}>
                        <li>Account Level 4</li>
                        <li>Account Level 4</li>
                        <li>Account Level 4</li>
                        <li>Account Level 4</li>
                        </ul>
                    </li>
                    </ul>
                </li>
            </ul>
          </li>
          
          <li>CAPITAL (Level1)</li>
          <li>EXPENSE (Level1)</li>
          <li>LIABILITY (Level1)</li>
          <li>REVENUE (Level1)</li>
          
        </ul>
      </li>
    </ul>
  );
};

export default TreeView;