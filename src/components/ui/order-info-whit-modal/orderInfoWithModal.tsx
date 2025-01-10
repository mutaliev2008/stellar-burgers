import { FC, memo } from 'react';

import styles from './orderInfoWithModal.module.css';

import { TOrderInfoWithTitleUI } from './type';

export const OrderInfoWithTitleUI: FC<TOrderInfoWithTitleUI> = memo(
  ({ title, titleStyle, children }) => (
    <>
      <div className={styles.center}>
        <div className={styles.header}>
          <h3 className={`${styles.title} text ${titleStyle}`}>{title}</h3>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  )
);
