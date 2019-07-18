const typeReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TYPE':
        return action.payload;
      case 'UNSET_TYPE':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default typeReducer;
  