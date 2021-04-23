import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { firebase } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/actions/authActions';

import AuthRouter from './AuthRouter';
import JournalScreen from '../components/journal/JournalScreen';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user && dispatch(loginAction(user.uid, user.displayName));
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
      setChecking(false);
    });
  }, [dispatch]);

  return (
    <>
      {checking ? (
        <h1>Cargando...</h1>
      ) : (
        <Router>
          <div>
            <Switch>
              <PublicRoutes isLoggedIn={isLoggedIn} path='/auth'>
                <AuthRouter />
              </PublicRoutes>

              <PrivateRoutes isLoggedIn={isLoggedIn} exact path='/'>
                <JournalScreen />
              </PrivateRoutes>

              <Redirect to='/auth/login' />
            </Switch>
          </div>
        </Router>
      )}
    </>
  );
};

export default AppRouter;
