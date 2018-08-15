export const login = userinfo => ({
  type: 'AUTH_LOGIN',
  isAuth: true,
  uid: userinfo.id,
  userinfo
});

export const logout = () => ({
  type: 'AUTH_LOGOUT',
  isAuth: false
});

export const updateToken = token => ({
  type: 'UPDATE_AUTH_TOKEN',
  isAuth: true,
  token
});
