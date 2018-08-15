const initialState = {
  isAuth: false,
  username: null,
  token: null,
  admin_default: null
};

/**
 *
 *
 * @param {*} [state=initialState]
 * @param {*} action
 * @returns
 */
const Admin = (state = initialState, action) => {
  switch (action.type) {
    case 'ADMIN_LOGIN':
      return {
        ...state,
        isAuth: action.isAuth,
        username: action.username
      };
    case 'ADMIN_LOGOUT':
      return {
        isAuth: action.isAuth,
        username: null,
        token: null
      };
    case 'UPDATE_ADMIN_TOKEN':
      return {
        ...state,
        isAuth: action.isAuth,
        token: action.token
      };
    case 'UPDATE_ADMIN_DEFAULT':
      return {
        ...state,
        admin_default: [...action.data]
      };
    default:
      return state;
  }
};

export default Admin;
