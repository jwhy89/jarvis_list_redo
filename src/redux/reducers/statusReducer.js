const statusReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_STATUS':
        return action.payload;
      case 'UNSET_STATUS':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default statusReducer;
  