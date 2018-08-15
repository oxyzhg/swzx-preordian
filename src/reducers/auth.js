const initialState = {
  isAuth: false,
  token: null,
  uid: null,
  userinfo: null
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
        uid: action.uid,
        userinfo: action.userinfo
      };
    case 'AUTH_LOGOUT':
      return {
        isAuth: action.isAuth,
        token: null,
        uid: null,
        userinfo: null
      };
    case 'UPDATE_AUTH_TOKEN':
      return {
        ...state,
        isAuth: action.isAuth,
        token: action.token
      };
    default:
      return state;
  }
};

export default Auth;
