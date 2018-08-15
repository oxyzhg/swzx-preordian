const initialState = {
  selected_list: null,
  optional_list: null
};

/**
 *
 *
 * @param {*} [state=initialState]
 * @param {*} action
 * @returns
 */
const Selected = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_LIST':
      return {
        ...state,
        selected_list: [...action.data]
      };
    case 'UPDATE_OPTIONAL_LIST':
      return {
        ...state,
        optional_list: [...action.data]
      };

    default:
      return state;
  }
};

export default Selected;
