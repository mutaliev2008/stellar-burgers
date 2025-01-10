import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { TCenter } from './type';
import { OrderInfoWithTitleUI } from '../ui/order-info-whit-modal';

export const OrderDetails: FC<TCenter> = memo(({ title, children }) => {
  const location = useLocation();
  const [titleStyle, setTitleStyle] = useState('text_type_main-large');

  useEffect(() => {
    if (/feed|profile/i.test(location.pathname)) {
      setTitleStyle('text_type_digits-default');
    }
  });

  return (
    <>
      <OrderInfoWithTitleUI
        title={title}
        titleStyle={titleStyle}
        children={children}
      />
    </>
  );
});
