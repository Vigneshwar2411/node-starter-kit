import { connect } from 'react-redux';
import { fetchAllFeatureFlags } from '../../actions';
import { getAllFeatureFlags } from '../../utils/redux-selectors';

const mapStateToProps = state => ({
  flags: getAllFeatureFlags(state),
});

const mapDispatchToProps = dispatch => ({
  getFlags: () => dispatch(fetchAllFeatureFlags()),
});

export default connect(mapStateToProps, mapDispatchToProps);
