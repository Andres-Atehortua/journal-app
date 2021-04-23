import { Redirect, Route } from 'react-router';

const PrivateRoutes = ({ isLoggedIn, children, ...rest }) => {
  return (
    <Route {...rest}>
      {isLoggedIn ? children : <Redirect to='/auth/login' />}
    </Route>
  );
};

export default PrivateRoutes;
