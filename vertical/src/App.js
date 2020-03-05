import React, { Component } from 'react';
import Layout from './components/Layout/';
import { withRouter, Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

import routes from './routes';
import './custom.css';
import './App.scss';

import axios from 'axios';

// Get all Auth methods
import { isUserAuthenticated } from './helpers/authUtils';

function withLayout(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    render() {
      return <Layout>
        <WrappedComponent></WrappedComponent>
      </Layout>
    }
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  getData = () => {
    axios.get('http://localhost:3010/getdata')
      .then(d => console.log(d))
      .catch(e => console.log(e))
  }

  componentDidMount () {
    // setInterval(() => {
    //   this.getData();
    // }, 5000)
  }

  render() {

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        isUserAuthenticated() === true
          ? <Component {...props} />
          : <Redirect to='/logout' />
      )} />
    )

    return (
      <React.Fragment>
        <Router>
          <Switch>
            {routes.map((route, idx) =>
              route.ispublic ?
                <Route path={route.path} component={withLayout(route.component)} key={idx} />
                :
                <PrivateRoute path={route.path} component={withLayout(route.component)} key={idx} />
            )}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}


export default withRouter(App);


