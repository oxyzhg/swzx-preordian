export const updateAdmin = username => ({
  type: 'ADMIN_LOGIN',
  isAuth: true,
  username
});

export const updateOptionalList = () => ({
  type: 'ADMIN_LOGOUT',
  isAuth: false
});

export const updateAdminToken = token => ({
  type: 'UPDATE_ADMIN_TOKEN',
  isAuth: true,
  token
});

export const updateAdminDefault = data => ({
  type: 'UPDATE_ADMIN_DEFAULT',
  data
});
