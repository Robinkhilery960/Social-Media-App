import { postDataApi } from "../../utils/fetchData";
import valid from "../../utils/valid";
import { GLOBALTYPES } from "./globalTypes"; 

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataApi("login", data);
     console.log(res)
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: res.data.access_token, user: res.data.user },
    });

    localStorage.setItem("firstLogin", true);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    console.log(error)
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.message },
    });
  }
};

// export function login(data){
//     return function(dispatch){
//         console.log(dispatch())
//     }
// }

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      const res = await postDataApi("refresh_token");
      // console.log(res)
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { token: res.data.access_token, user: res.data.user },
      });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {},
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.message },
      });
    }
  }
};

export const register = (data) => async (dispatch) => {
    const check=valid(data)
    console.log("data",data)
    // console.log(check)
    if(check.errLength>0){
        return dispatch({type:GLOBALTYPES.ALERT,payload:check.errMsg})
    }
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataApi("register", data);
    //  console.log(res)
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: res.data.access_token, user: res.data.user },
    });

    localStorage.setItem("firstLogin", true);

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (error) { 
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};


export const logout=()=>async(dispatch)=>{
     try {
      localStorage.removeItem("firstLogin")
      await postDataApi("logout")
      window.location.href = "/"
     } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
     }
}