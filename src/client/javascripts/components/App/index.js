import { withRouter } from 'react-router';
import app from './App';
import container from './App.container';

export default withRouter(container(app));
