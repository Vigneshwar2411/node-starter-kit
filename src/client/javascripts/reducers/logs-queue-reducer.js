import { ADD_LOG_TO_QUEUE, REMOVE_ALL_LOGS_FROM_QUEUE } from '../actions/types';
import * as dateUtils from '../utils/date-utils';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_LOG_TO_QUEUE: {
      const logDetails = {
        ...action.options,
        logLevel: action.logLevel,
        datetime: dateUtils.now().toISOString(),
      };
      return [].concat(state, [logDetails]);
    }
    case REMOVE_ALL_LOGS_FROM_QUEUE: {
      return [];
    }
    default:
      return state;
  }
}
