import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from '../ErrorPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      errorInfo: undefined,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { error, errorInfo } = this.state;
    if (error) {
      if (!error.message) {
        error.message = 'Unknown Error';
        return <ErrorPage where="ErrorBoundary" type="500" error={error} info={errorInfo} />;
      }

      if (error.type === '401') {
        return <ErrorPage where="ErrorBoundary" type="401" error={error} info={errorInfo} />;
      }
    }
    return this.props.children;
  }
}

ErrorBoundary.defaultProps = {
  children: null,
};

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;
