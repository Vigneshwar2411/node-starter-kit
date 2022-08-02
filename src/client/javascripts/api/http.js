import axios from 'axios';
import config from '../config';
import { isLocal } from '../utils/helpers';

const getBaseUrl = () => {
  /* istanbul ignore if */
  if (isLocal()) {
    return config.appRoute;
  }
  return `${config.appBaseURL}${config.appRoute}`;
};

const http = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    Accept: 'application/json',
  },
  maxContentLength: 1024 * 1024 * 20,
});

export default http;
