import * as actions from 'client/javascripts/actions/authorization';

describe('actions/authorization', () => {
  test('authStart action', () => {
    expect(actions.authStart()).toStrictEqual({
      type: 'auth_start',
    });
  });

  test('authSuccess action', () => {
    expect(actions.authSuccess({ name: 'John Doe' })).toStrictEqual({
      type: 'auth_success',
      profile: {
        name: 'John Doe',
      },
    });
  });

  test('authFail action', () => {
    expect(actions.authFail()).toStrictEqual({
      type: 'auth_fail',
    });
  });
});
