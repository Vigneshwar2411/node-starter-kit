import { AUTH_SUCCESS, AUTH_FAIL, AUTH_START } from '../actions/types';

const initialState = {
  authorized: false,
  isAuthorizing: true,
  profile: {
    name: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        isAuthorizing: true,
        profile: {
          name: '',
        },
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        authorized: true,
        isAuthorizing: false,
        profile: action.profile,
      };
    case AUTH_FAIL:
      return {
        ...state,
        authorized: false,
        isAuthorizing: false,
      };
    default:
      return state;
  }
};
