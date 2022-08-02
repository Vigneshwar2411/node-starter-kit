import { UPDATE_FEATURE_FLAGS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_FEATURE_FLAGS: {
      return action.featureFlags;
    }
    default:
      return state;
  }
}
