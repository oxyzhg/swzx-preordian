const initialState = {
  server: 'https://api.youthol.cn',
  localhost: 'http://localhost:5000/api',
  test: 'http://192.168.1.104/youthAPI/public/api'
};

/**
 *
 *
 * @param {*} [state=initialState]
 * @param {*} action
 * @returns
 */
const baseUrl = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default baseUrl;
