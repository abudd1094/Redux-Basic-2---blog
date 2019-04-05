export default (state = [], action) => { // first argument is the previous state from the last time the reducer runs, by default we set it to an empty array for the initial invocation
  switch (action.type) { // common to use switch statements inside reducers
    case 'FETCH_POSTS':
      return action.payload;
    default: 
      return state;
  }
};