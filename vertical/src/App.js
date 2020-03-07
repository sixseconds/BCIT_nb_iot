import React, { Component } from 'react';
import Layout from './components/Layout/';
import { withRouter, Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import routes from './routes';
import './custom.css';
import './App.scss';

import axios from 'axios';

function withLayout(WrappedComponent) {
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

  render() {

    return (
      <React.Fragment>
        <Router>
          <Switch>
            
            {
              routes.map((route, index) => 
                <Route path={route.path} component={withLayout(route.component)} key={index} />
              )
            }
            
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}


export default withRouter(App);


