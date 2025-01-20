import React, { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusText: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const statusStyles: { [key: string]: string } = {
    pending: '#E52B1A',
    done: '#00CCCC',
    default: '#F2F2F3'
  };

  const textStyle = status ? statusStyles[status] : statusStyles.default;

  return (
    <OrderStatusUI
      textStyle={textStyle}
      text={status ? statusText[status] : 'Неизвестный статус'}
    />
  );
};
