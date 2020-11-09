import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  //No se puede invocar directamente,
  //tenemos que dispatch porque hay que invocar internamente el dispatch
  await dispatch(fetchPosts());

  // const userIds = _.uniq(_.map(getState().posts, "userId"));

  // userIds.forEach((id) => dispatch(fetchUser(id)));

  //El value hace q se ejecuten los steps
  //Metodo con _ y chain
  _.chain(getState().posts)
    .map('userId')
    .uniqueId()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POST", payload: response.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};


// //memoize version
// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
