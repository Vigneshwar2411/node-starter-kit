import { connect } from 'react-redux';
import {
  startLogFlusher,
  authStart,
} from '../../actions';
import { getAuthorizationDetails } from '../../utils/redux-selectors';

const mapStateToProps = state => getAuthorizationDetails(state);

const mapDispatchToProps = dispatch => ({
  setupApp: () => {
    dispatch(startLogFlusher());
  },
  authorize: () => {
    dispatch(authStart());
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
