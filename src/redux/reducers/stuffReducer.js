const stuffReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_STUFF':
      return action.payload;
    case 'UNSET_STUFF':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default stuffReducer;
