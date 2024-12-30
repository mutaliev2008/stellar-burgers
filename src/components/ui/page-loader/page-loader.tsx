import React from 'react';
import { Preloader } from '../preloader';
import styles from './page-loader.module.css';

export const PageLoader = () => (
  <div className={styles.overlay}>
    <Preloader />
  </div>
);
