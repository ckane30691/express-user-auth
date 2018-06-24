import React from 'react';
import { Provider } from 'react-redux';
// import { AuthRoute, ProtectedRoute } from '../util/route_util.jsx';
// import SessionFormContainer from './session_form/session_form_container';

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter,
  withRouter
} from 'react-router-dom';

class App extends React.Component {

  render() {
    return(
      <div>
        <Switch>
          // <AuthRoute exact path="/" component={SessionFormContainer} />
          // <AuthRoute exact path="/login" component={SessionFormContainer} />
        </Switch>
      </div>
    );
  }
}




export default withRouter(App);
