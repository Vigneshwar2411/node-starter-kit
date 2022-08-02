import React from 'react';
import PropTypes from 'prop-types';
import './FeatureFlagsPage.style';

const getFlagValue = flag => (flag ? flag.toString() : 'false');

class FeatureFlagsPage extends React.Component {
  componentDidMount() {
    this.props.getFlags();
  }

  render() {
    const { flags } = this.props;
    return (
      <div className="feature-flags-page">
        <h2 className="title">Feature Flags</h2>
        <div className="feature-flags">
          <table>
            <tbody>
              <tr>
                <td />
                <td>local</td>
                <td>dev</td>
                <td>QA</td>
                <td>UAT</td>
                <td>Production</td>
              </tr>
              {flags.flags ? flags.flags.map(flag => (
                <tr key={flag}>
                  <td>{flag}</td>
                  <td>{getFlagValue(flags.local[flag])}</td>
                  <td>{getFlagValue(flags.dev[flag])}</td>
                  <td>{getFlagValue(flags.qa[flag])}</td>
                  <td>{getFlagValue(flags.uat[flag])}</td>
                  <td>{getFlagValue(flags.production[flag])}</td>
                </tr>
              )) : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

FeatureFlagsPage.defaultProps = {
  flags: {
    local: {},
    dev: {},
    qa: {},
    production: {},
    flags: [],
  },
  getFlags: /* istanbul ignore next */ () => ({}),
};

FeatureFlagsPage.propTypes = {
  flags: PropTypes.shape({
    local: PropTypes.object,
    dev: PropTypes.object,
    qa: PropTypes.object,
    production: PropTypes.object,
    flags: PropTypes.arrayOf(PropTypes.string),
  }),
  getFlags: PropTypes.func,
};

export default FeatureFlagsPage;
