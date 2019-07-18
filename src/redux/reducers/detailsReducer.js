const detailsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DETAILS':
        console.log('in details reducer', action.payload.data[0]);
        return action.payload.data[0];
      case 'UNSET_DETAILS':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default detailsReducer;
  