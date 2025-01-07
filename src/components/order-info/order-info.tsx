import React, { FC, useMemo, useEffect, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import {
  getOrderNumber,
  selectOrderData
} from '../../services/order/orderSlice';
import { selectedFeedState } from '../../services/feed/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();
  const orderData = useSelector(selectOrderData);
  const ingredients: TIngredient[] = useSelector(selectedFeedState).ingredients;
  console.log(orderData?.status);

  useEffect(() => {
    if (number) {
      dispatch(getOrderNumber(Number(number)));
    }
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          const count = ingredient.type === 'bun' ? 2 : 1;
          acc[item] = {
            ...ingredient,
            count
          };
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
