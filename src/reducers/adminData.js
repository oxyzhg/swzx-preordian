const initialState = {
  isAuth: false,
  token: null,
  expiresAt: null,
  username: null,
  optional_list: null,
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
        token: null,
        expiresAt: null,
        username: null
      };
    case 'UPDATE_ADMIN_TOKEN':
      return {
        ...state,
        isAuth: action.isAuth,
        token: action.token,
        expiresAt: action.expiresAt
      };
    case 'UPDATE_OPTIONAL_LIST':
      return {
        ...state,
        optional_list: [...action.data]
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
