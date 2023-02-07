import { getDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
};

export const getProfileUsers =
  ({ users, id, auth }) =>
  async (dispatch) => {
    console.log("users",users)
    console.log(users.every(user=>user._id!==id))

    if(users.every(user=>user._id!==id)){ 
       
        try {
          dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
          const res = await getDataApi(`user/${id}`, auth.token);
          dispatch({type:PROFILE_TYPES.GET_USER,payload:res.data})
          dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
        } catch (error) {
          dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.message } });
        }
    }
  };
