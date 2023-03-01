import { getDataApi, patchDataApi, postDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import { imageUpload } from "../../utils/imageUpload";
import { deleteData } from "./globalTypes";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
};

export const getProfileUsers =
  ({ users, id, auth }) =>
  async (dispatch) => {
    console.log("users", users);
    console.log(users.every((user) => user._id !== id));

    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
        const res = await getDataApi(`user/${id}`, auth.token);
        dispatch({ type: PROFILE_TYPES.GET_USER, payload: res.data });
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      } catch (error) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: error.message },
        });
      }
    }
  };

export const updateProfileUser =
  ({ userData, avatar, auth }) =>
  async (dispatch) => {
    if (!userData.fullName)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please add your Full Name" },
      });

    if (!userData.fullName.length > 25)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Full Name cannot exceed more than 20 characters" },
      });

    if (!userData.story.length > 200)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Story cannot exceed more than 200 characters" },
      });

    try {
      let media;
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      if (avatar) media = await imageUpload([avatar]);

      const res = await postDataApi(
        "user",
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token
      );
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: res.data.user,
        },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.message },
      });
    }
  };

export const follow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    // console.log({users,user,auth})
    const newUser = { ...user, followers: [...user.followers, auth.user] };
    // console.log(newUser)
    dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });
    try {
      await patchDataApi(`user/${user._id}/follow`, null, auth.token);
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.message },
      });
    }
  };

export const unFollow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    console.log({ users, user, auth });
    const newUser = {
      ...user,
      followers: deleteData(user.followers, auth.user._id),
    };
    // console.log(newUser)
    dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: deleteData(auth.user.following, user._id),
        },
      },
    });
    try {
      await patchDataApi(`user/${user._id}/unfollow`, null, auth.token);
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.message },
      });
    }
  };
