import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import MainRouter from './routes'
import './App.css';
import Main from './layouts/main'
import {connect} from 'react-redux'
import * as authActions from './store/actions/authActions'
import * as productActions from './store/actions/productsActions'


class App extends React.Component {
  componentWillMount() {
    this.props.loginCheck()
     this.props.getcartcount(localStorage.getItem('token'))
}
render(){
  return (
    <div className="App ">
      <BrowserRouter>
      <Main>
      <MainRouter/>
      </Main>
      </BrowserRouter>
      </div>

  );
}
}

const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null,
  }
}


const mapDispatchToProps=dispatch=>{
  return{
    loginCheck:()=>dispatch(authActions.authCheck()),
    getcartcount:(token)=>dispatch(productActions.getcartcount(token)),

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
