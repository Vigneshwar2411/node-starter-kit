/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

class Log extends React.Component {
  componentDidMount() {
    const {
      log, where, error, info,
    } = this.props;
    log(where, error, info);
  }

  render() {
    return this.props.children;
  }
}

Log.defaultProps = {
  children: null,
  error: {},
  info: {},
  log: /* istanbul ignore next */ () => ({}),
  where: '',
};

Log.propTypes = {
  children: PropTypes.node,
  error: PropTypes.object,
  info: PropTypes.object,
  log: PropTypes.func,
  where: PropTypes.string,
};

export default Log;
