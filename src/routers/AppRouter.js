import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/auth'>
            <AuthRouter />
          </Route>
          <Route exact path='/'>
            <JournalScreen />
          </Route>

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
