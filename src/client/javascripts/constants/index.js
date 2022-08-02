export const RouterPaths = {
  FORBIDDEN: '/forbidden',
  ROOT: '/',
  VIEW_FLAGS: '/view_flags',
  UNAUTHORIZED: '/unauthorized',
};

export const LogTypes = {
  SAGA: 'saga',
  COMPONENT: 'component',
};

export const ButtonTypes = {
  PRIMARY: 'primary',
  REVERSE: 'reverse',
  OUTLINE: 'outline',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  all: /* istanbul ignore next */ () => ['primary', 'reverse', 'outline', 'secondary', 'tertiary'],
};

export const DefaultSessionTimeout = {
  EXPIRY_IN_MINUTES: 15,
  WARNING_IN_MINUTES: 2,
};
