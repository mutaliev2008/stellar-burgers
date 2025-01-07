import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../services/user/userSlice';

type ProtectedRouteProps = {
  forAuthorized: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  forAuthorized,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthorized = useSelector(userSelectors.selectIsAuthenticated);
  const from = location.state?.from || '/';
  if (!forAuthorized && isAuthorized) {
    return <Navigate to={from} />;
  }

  if (forAuthorized && !isAuthorized) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
