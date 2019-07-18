const pdReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PD':
        return action.payload;
      case 'UNSET_PD':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default pdReducer;
  