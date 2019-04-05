import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts()); // here we solve the issue of having many network requests for each user

  const userIds = _.uniq(_.map(getState().posts, 'userId')) // using lodash map function we go through posts and pull out the userId's
  userIds.forEach(id => dispatch(fetchUser(id))); // we don't need await down here since we don't have any additional logic running after this **** WE CAN'T USE a forEach loop with the async await syntax however

  // _.chain(getState().posts) // lo dash chain method, does the same thing as lines 7 and 8
  //   .map('userId')
  //   .uniq()
  //   .forEach(id => dispatch(fetchUser(id)))
  //   .value() // this line executes the chain 
}

export const fetchPosts = () => async dispatch => { // defining a function that is going to return a function
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data })
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
}

// MEMOIZE VERSION of solution in line 5

// export const fetchUser = (id) => dispatch => {
//   _fetchUser(id, dispatch)
// };
// const _fetchUser = _.memoize(async (id, dispatch) => { // underscore is indicating a private function, other engineers should not touch this
//   const response = await jsonPlaceholder.get(`/users/${id}`); // removing the memoize logic from the action creator allows us to only make the API get reqeust one time, check the network tab in the dev tools to see this in action

//   dispatch({ type: 'FETCH_USER', payload: response.data })
// });

// // WITH THIS MEMOIZE SOLUTION WE CAN ONLY CALL EACH USER FROM THE API ONCE WITH THIS ACTION CREATOR