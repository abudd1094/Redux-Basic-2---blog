export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return [...state, action.payload]; // we must create a new array to let redux know something has changed, if we direct redux to the same spot in memory, it will not work
    default:
      return state;
  }
};