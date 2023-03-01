import { GLOBALTYPES } from "./globalTypes";
import { postDataApi , getDataApi} from "../../utils/fetchData";
// import { getFormData } from "../../utils/imageUpload";
import { imageUpload } from "../../utils/imageUpload";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST:"LOADING_POST",
  GET_POST:"GET_POST",
  UPDATE_POST:"UPDATE_POST"
};

export const createPost =
  ({ content, images, auth }) =>
  async (dispatch) => {
  let media=[]
    try {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: true },
      });
      if(images.length>0) media=await imageUpload(images)

      const res=await postDataApi('posts', {content,images:media}, auth.token)

      // console.log(res)
        
      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { loading: true },
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: false },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };


export const getPosts =
  (token) =>
  async (dispatch) => { 
    try {
      dispatch({
        type: POST_TYPES.LOADING_POST,
        payload: true,
      });
      
      const res=await getDataApi('posts', token)

      console.log(res)
        
      dispatch({
        type: POST_TYPES.GET_POST,
        payload:res.data,
      });

      dispatch({
        type: POST_TYPES.LOADING_POST,
        payload: false,
      });
      
 
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };


export const updatePost =
  ({content,images,auth, status}) =>
  async (dispatch) => { 
    let media=[];
    const imgNewUrl=images.filter(img=>!img.url)
    const imgOldUrl=images.filter(img=>img.url)

      console.log("imgNewUrl",imgNewUrl)
      console.log("imgOldUrl",imgOldUrl)
    // console.log("imgNewUrl,imgOldUrl",imgNewUrl,imgOldUrl)

    if(status.content===content && imgNewUrl.length===0 && imgOldUrl.length===status.image.length) return ;

    try {
      
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: true },
      });

      if(imgNewUrl.length>0) media=await imageUpload(imgNewUrl)
      
      const res=await postDataApi(`post/${status._id}`,{content, images:[...imgOldUrl, ...media]}, auth.token)

      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: res.data.newPost,
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });
       
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.message },
      });
    }
  };
