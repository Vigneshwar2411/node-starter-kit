/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ServerError from './ServerError';
import Unauthorized from './Unauthorized';
import Log from '../Log';

const SERVER_ERROR = '500';
const UNAUTHORIZED = '401';

const ErrorPage = ({
  where, title, type, error, info,
}) => {
  let renderedComponent = null;
  switch (type) {
    case SERVER_ERROR: {
      renderedComponent = <ServerError title={title} />;
      break;
    }
    case UNAUTHORIZED: {
      renderedComponent = <Unauthorized title={title} />;
      break;
    }
    default:
      renderedComponent = null;
  }

  return (
    <Log error={error} where={where} info={info}>
      {renderedComponent}
    </Log>
  );
};

ErrorPage.defaultProps = {
  error: {},
  info: {},
  title: '',
  type: '',
  where: '',
};

ErrorPage.propTypes = {
  error: PropTypes.object,
  info: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string,
  where: PropTypes.string,
};

export default ErrorPage;
