import PropTypes from 'prop-types';
import { renderIf } from '../../utils/helpers';

const FeatureFlag = ({ show, children }) => renderIf(() => show, () => children);

FeatureFlag.propTypes = {
  flag: PropTypes.string.isRequired,
  children: PropTypes.node,
  show: PropTypes.bool,
};

export default FeatureFlag;
