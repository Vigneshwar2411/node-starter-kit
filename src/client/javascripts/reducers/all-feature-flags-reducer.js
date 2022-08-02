import { UPDATE_ALL_FEATURE_FLAGS } from '../actions/types';

const initialState = {
  local: {},
  dev: {},
  qa: {},
  uat: {},
  production: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_ALL_FEATURE_FLAGS: {
      return action.featureFlags;
    }
    default:
      return state;
  }
}
