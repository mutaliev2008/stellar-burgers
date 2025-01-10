import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import { useDispatch } from '../../services/store';
import styles from './app.module.css';
import { getIngredients } from '../../services/feed/feedSlice';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { getUser } from '../../services/user/userSlice';
import { OrderDetails } from '../order-info-whit-title';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const locationState = location.state as { background?: Location };
  const background = locationState && location.state?.background;

  const closeModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
    if (localStorage.getItem('refreshToken')) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute forAuthorized={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute forAuthorized={false}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute forAuthorized={false}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute forAuthorized={false}>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute forAuthorized>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute forAuthorized>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        {}
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <OrderDetails title={`#${location.pathname.match(/\d+/)}`}>
              <OrderInfo />
            </OrderDetails>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <OrderDetails title={`Детали ингредиента`}>
              <IngredientDetails />
            </OrderDetails>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute forAuthorized>
              <OrderDetails title={`#${location.pathname.match(/\d+/)}`}>
                <OrderInfo />
              </OrderDetails>
            </ProtectedRoute>
          }
        />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${location.pathname.match(/\d+/)}`}
                onClose={closeModal}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute forAuthorized>
                <Modal
                  title={`#${location.pathname.match(/\d+/)}`}
                  onClose={closeModal}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
