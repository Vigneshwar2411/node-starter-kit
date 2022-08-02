import { connect } from 'react-redux';
import { logger } from '../../actions';
import { createLogDetails } from '../../utils/create-log-details';
import { LogTypes } from '../../constants';


const mapDispatchToProps = dispatch => ({
  log: (where, error, info) => {
    const logDetails = createLogDetails(where, LogTypes.COMPONENT, error, info);

    if (error) {
      dispatch(logger.error(logDetails));
    } else {
      dispatch(logger.info(logDetails));
    }
  },
});

export default connect(null, mapDispatchToProps);
