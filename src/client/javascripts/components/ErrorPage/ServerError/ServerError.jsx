import React from 'react';
import PropTypes from 'prop-types';
import L from '../../../utils/localization';
import './ServerError.style';

const ServerError = ({ title }) => {
  const headerTitle = title || L.t('ErrorPage.serverError.title');
  return (
    <div className="error server-error">
      <h2 className="title">{headerTitle}</h2>
      <div className="page-content">
        <h2>{L.t('ErrorPage.serverError.header')}</h2>
        <p className="line1">{L.t('ErrorPage.serverError.descriptionLine1')}</p>
        <p className="line2">{L.t('ErrorPage.serverError.descriptionLine2')}</p>
      </div>
    </div>
  );
};

ServerError.defaultProps = {
  title: null,
};

ServerError.propTypes = {
  title: PropTypes.string,
};

export default ServerError;
