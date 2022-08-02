import { isUnauthenticatedURL } from 'app/utils/is-unauthenticated-url';

describe('is-authenticated-url', () => {
  test('should return false for authenticated urls', () => {
    expect(isUnauthenticatedURL('not an unauthenticated url')).toBeFalsy();
  });
});
