import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed, selectedFeedState } from '../../services/feed/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const ordersState: TOrder[] | null = useSelector(selectedFeedState).orders;

  function handleGetFeeds() {
    dispatch(getFeed());
  }

  useEffect(() => {
    handleGetFeeds();
  }, [dispatch]);

  if (!ordersState.length) {
    return <Preloader />;
  }

  return <FeedUI orders={ordersState} handleGetFeeds={handleGetFeeds} />;
};
