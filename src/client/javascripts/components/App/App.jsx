import React from 'react';
import PropTypes from 'prop-types';
import AppInfo from '../AppInfo';
import ContentArea from '../ContentArea';
import L from '../../utils/localization';

import './App.style';

class App extends React.PureComponent {
  componentDidMount() {
    this.props.authorize();
  }

  render() {
    if (!this.props.authorized && !this.props.isAuthorizing) {
      return <div>{L.t('ErrorPage.unauthorized')}</div>;
    }
    if (this.props.isAuthorizing) {
      return <div className="authorizing">Authorizing...</div>;
    }
    return (
      <div>
        <AppInfo name={this.props.profile.name} />
        <ContentArea />
      </div>
    );
  }
}

App.propTypes = {
  authorize: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired,
  isAuthorizing: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
