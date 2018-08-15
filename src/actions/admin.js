export const adminLogin = username => ({
  type: 'ADMIN_LOGIN',
  isAuth: true,
  username
});

export const adminLogout = () => ({
  type: 'ADMIN_LOGOUT',
  isAuth: false
});

export const updateAdminToken = (token, expiresAt) => ({
  type: 'UPDATE_ADMIN_TOKEN',
  isAuth: true,
  token,
  expiresAt
});

export const updateOptionalList = data => ({
  type: 'ADMIN_OPTIONAL_LIST',
  data
});

export const updateAdminDefault = data => ({
  type: 'ADMIN_ADMIN_DEFAULT',
  data
});
