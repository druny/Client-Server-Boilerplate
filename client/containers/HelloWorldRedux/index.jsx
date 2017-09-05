/* eslint no-console: 0 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HelloWorldRedux extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  componentWillMount() {
    console.log('[Component Will Mount]');
  }

  render() {
    return (
      <div>
        <h1>{ this.props.name }</h1>
        <p>{ this.props.description }</p>
        <p>Higher component</p>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = ({ test: { name, description } }) => ({ name, description });
const mapDispatchToProps = ({ });

export default connect(mapStateToProps, mapDispatchToProps)(HelloWorldRedux);
