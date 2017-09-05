/* eslint no-console: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { browserHistory } from 'react-router';

import { defaultAction } from '../../actions/test';
import HelloWorldRedux from '../../containers/HelloWorldRedux';
import HelloWorld from './../../components/HelloWorld';
import Header from './../../components/Header';

class App extends React.Component {
  static propTypes = {
    test: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    defaultAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    test: {},
  };

  componentWillMount() {
    console.log('[Name]: %s | [Description]: %s ', this.props.test.name, this.props.test.description);

    this.props.defaultAction();
  }

  render() {
    return (
      <Router history={browserHistory}>
        <div className="app">
          <Header />
          <Switch>
            <Route exact path="/" component={HelloWorld} />
            <Route path="/test" component={HelloWorldRedux} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ test }) => ({ test });
const mapDispatchToProps = ({ defaultAction });

export default connect(mapStateToProps, mapDispatchToProps)(App);
