import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';

import './AppInfo.style';

const AppInfo = ({ name }) => (
  <header>
    <div className="header-info">
      <span className="header-info__left">
        <Image className="mrcooper-logo" image="mrcooper-logo.png" />
        <span className="app-logo">App Logo</span>
      </span>
      <span className="header-info__right">
        Hi,
        {' '}
        <span className="user-name">{`${name}`}</span>
      </span>
    </div>
  </header>
);

AppInfo.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AppInfo;
