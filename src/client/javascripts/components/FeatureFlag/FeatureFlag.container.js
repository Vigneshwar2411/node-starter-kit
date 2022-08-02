import { connect } from 'react-redux';
import { isFeatureEnabled } from '../../utils/redux-selectors';

const mapStateToProps = (state, ownProps) => ({
  show: isFeatureEnabled(state, ownProps.flag),
});

export default connect(mapStateToProps);
