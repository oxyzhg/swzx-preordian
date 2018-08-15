export const login = username => ({
  type: 'AUTH_LOGIN',
  isAuth: true,
  username
});

export const logout = () => ({
  type: 'AUTH_LOGOUT',
  isAuth: false
});

export const updateToken = (token, expiresAt) => ({
  type: 'UPDATE_AUTH_TOKEN',
  isAuth: true,
  token,
  expiresAt
});
