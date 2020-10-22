import * as authActions from "../actions/authActions";

const updateObject=(state,newState)=>{
    return{
        ...state,
        ...newState
    }
}


const initialState = {
  token: null,
  error: null,
  signupErrors:null,
  loading: false,
  profile:{},
  changeLoad:false,
};



const signupFailed = (state, action) => {
  return updateObject(state, {
    signupErrors: action.error,
    loading: false
  });
};


const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
   
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
  });
};






export const getUserProfileStart=(state,action)=>{
  return updateObject(state,{
      loading:true,
      error:null,
      changeLoad:false,

      success:null
  })
}

export const getUserProfileSuccess=(state,action)=>{
  return updateObject(state,{
      loading:false,
      error:null,
      profile:action.user,
      success:null,
      changeLoad:false,


  })
}


export const getUserProfileFailed=(state,action)=>{
  return updateObject(state,{
      loading:false,
      error:action.error,
      changeLoad:false,

      success:null

  })
}




export const updateUserProfileStart=(state,action)=>{
  return updateObject(state,{
      loading:true,
      changeLoad:true,

      error:null
  })
}

export const updateUserProfileSuccess=(state,action)=>{
  return updateObject(state,{
      loading:false,
      error:null,
      success:action.message,
      changeLoad:false,

  })
}


export const updateUserProfileFailed=(state,action)=>{
  return updateObject(state,{
      loading:false,
      changeLoad:false,
      error:action.error
  })
}








const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.AUTH_START:return authStart(state, action);
    case authActions.AUTH_SUCCESS:return authSuccess(state, action);
    case authActions.AUTH_FAIL:return authFail(state, action);
    case authActions.AUTH_LOGOUT:return authLogout(state, action);
    case authActions.SIGNUP_FAILED:return signupFailed(state, action);
    case authActions.GET_USER_PROFILE_START: return getUserProfileStart(state,action);
    case authActions.GET_USER_PROFILE_SUCCESS: return getUserProfileSuccess(state,action);
    case authActions.GET_USER_PROFILE_FAILED: return getUserProfileFailed(state,action);
    case authActions.UPDATE_USER_PROFILE_START: return updateUserProfileStart(state,action);
    case authActions.UPDATE_USER_PROFILE_SUCCESS: return updateUserProfileSuccess(state,action);
    case authActions.UPDATE_USER_PROFILE_FAILED: return updateUserProfileFailed(state,action);
    default:
      return state;
  }
};

export default authReducer;