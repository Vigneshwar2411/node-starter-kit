import React from 'react';
import L from '../../../utils/localization';

const Unauthorized = () => (
  <div className="error unauthorized">
    <p>{L.t('ErrorPage.unauthorized')}</p>
  </div>
);

export default Unauthorized;
