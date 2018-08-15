const initialState = {
  isAuth: false,
  token: null,
  expiresAt: null,
  username: null
};

/**
 *
 *
 * @param {*} [state=initialState]
 * @param {*} action
 * @returns
 */
const Auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN':
      return {
        ...state,
        isAuth: action.isAuth,
        username: action.username
      };
    case 'AUTH_LOGOUT':
      return {
        isAuth: action.isAuth,
        token: null,
        expiresAt: null,
        username: null
      };
    case 'UPDATE_AUTH_TOKEN':
      return {
        ...state,
        isAuth: action.isAuth,
        token: action.token,
        expiresAt: action.expiresAt
      };
    default:
      return state;
  }
};

export default Auth;
