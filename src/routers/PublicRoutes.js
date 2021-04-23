import { Redirect, Route } from 'react-router';

const PublicRoutes = ({ isLoggedIn, children, ...rest }) => {
  return (
    <Route {...rest}>{!isLoggedIn ? children : <Redirect to='/' />}</Route>
  );
};

export default PublicRoutes;
