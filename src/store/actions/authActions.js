
import axios from 'axios'
export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const SIGNUP_FAILED='SignupFailed' 
export const GET_USER_PROFILE_START='getUserProfileStart'
export const GET_USER_PROFILE_SUCCESS='getUserProfileSuccess'
export const GET_USER_PROFILE_FAILED='getUserProfileFailed'
export const UPDATE_USER_PROFILE_START='updateUserProfileStart'
export const UPDATE_USER_PROFILE_SUCCESS='updateUserProfileSuccess'
export const UPDATE_USER_PROFILE_FAILED='updateUserProfileFailed'
export const UPDATE_USER_IMAGE_START='updateUserImageStart'
export const UPDATE_USER_IMAGE_SUCCESS='updateUserImageSuccess'
export const UPDATE_USER_IMAGE_FAILED='updateUserImageFailed'



export const getUserProfileStart=()=>{
  return{
      type:GET_USER_PROFILE_START
  }
}
export const getUserProfileSuccess=(user)=>{
  return{
      type:GET_USER_PROFILE_SUCCESS,
      user
  }
}
export const getUserProfileFailed=(error)=>{
  return{
      type:GET_USER_PROFILE_FAILED,
      error
  }
}




export const updateUserProfileStart=()=>{
  return{
      type:UPDATE_USER_PROFILE_START
  }
}
export const updateUserProfileSuccess=(message)=>{
  return{
      type:UPDATE_USER_PROFILE_SUCCESS,
      message
  }
}
export const updateUserProfileFailed=(error)=>{
  return{
      type:UPDATE_USER_PROFILE_FAILED,
      error
  }
}


export const updateUserImageStart=()=>{
  return{
      type:UPDATE_USER_IMAGE_START
  }
}
export const updateUserImageSuccess=(message)=>{
  return{
      type:UPDATE_USER_IMAGE_SUCCESS,
      message
  }
}
export const updateUserImageFailed=(error)=>{
  return{
      type:UPDATE_USER_IMAGE_FAILED,
      error
  }
}



export const SignupFailed = (error) => {
  return {
    type: SIGNUP_FAILED,
    error:error
  };
};



export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (token,avatar) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
   avatar,
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
 

  return {
    type: AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username: username,
        password: password
      },{headers:{accept:'application/json'}})
      .then(res => {
        const token = res.data.key;
        const username= res.data.username
        const avatar=res.data.avatar
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token,avatar));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err.response.data));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/rest-auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      },{headers:{accept:'application/json'}})
      .then(res => {
          const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        const username= res.data.username
        const avatar=res.data.avatar
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token,avatar));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err.response.data));
        console.log(err.response.data);
      });
  };
};

export const authCheck = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const avatar=localStorage.getItem('avatar')
    dispatch(authSuccess(token,avatar));
  };
};






export const getUserProfile=(token)=>{
  return dispatch=>{
      dispatch(getUserProfileStart())
      axios.get('http://127.0.0.1:8000/users/profile/',{headers:{'Authorization':`Token ${token}`,accept:'application/json', 'Content-Type': 'application/json',}})
      .then(res=>{
          dispatch(getUserProfileSuccess(res.data[0]))

      }).catch(err=>{
          dispatch(getUserProfileFailed(err))
      })
  }
}




export const updateUserPassword=(password1,password2,oldPassword,token)=>{
  return dispatch=>{
      dispatch(updateUserProfileStart())
      axios.post('http://127.0.0.1:8000/rest-auth/password/change/',{'new_password1':password1,'new_password2':password2,'old_password':oldPassword},{headers:{'Authorization':`Token ${token}`}})
      .then(res=>{
          const message='updated successfully'
          dispatch(updateUserProfileSuccess(message))
      }).catch(err=>{ 
          dispatch(updateUserProfileFailed(err.response.data))
      })
  }
}





export const updateUserImage=(data)=>{
  return dispatch=>{
      dispatch(updateUserProfileStart())
      axios.post('http://127.0.0.1:8000/users/editprofile/',data)
      .then(res=>{
          const message='updated successfully'
          dispatch(updateUserProfileSuccess(message))
      }).catch(err=>{ 
          dispatch(updateUserProfileFailed(err.response.data))
      })
  }
}

