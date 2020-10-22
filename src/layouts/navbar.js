import React, { Component } from 'react';
import SignedOutLinks from '../components/signedOutLinks';
import SignedInLinks from '../components/signedInLinks';
import {connect} from 'react-redux'
import * as authActions from '../store/actions/authActions'
import {Link} from 'react-router-dom'

class NavBar extends Component {
    state={
        opened:false
    }
    render() {
        return (
            <nav className="grid ">
            <div className=' bg-gray-800 w-full flex md:items-center flex-wrap h-auto shadow-lg pt-6  pb-6 pl-12 pr-12'> 
            <div className='text-2xl md:items-center text-white md:mt-0  justify-end font-mono cursor-pointer focus:bg-none  font-bold'>
            <Link className='text-2xl text-white' to='/'><span  >E-Commerce</span></Link>   
            </div>
            
            <div className=' mt-0 h-auto cursor-pointer items-start md:hidden'  id='burger' style={{marginLeft:'auto'}}>
            {this.state.opened
            
            ?
            <span className='text-white'>
            <svg className="w-8 h-10 " fill="none" onClick={()=>this.setState({opened:false})} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </span>
            :
            <span className='text-white'>
            <svg className="w-8 h-10 " fill="none" onClick={()=>this.setState({opened:true})} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg> 
            </span>
            }
            </div>
            {this.props.isAuthenticated
             ?
             <SignedInLinks opened={this.state.opened}/>

             :   
            <SignedOutLinks opened={this.state.opened}/>
            }
          
            </div>
            </nav>
        )
    }
}

const mapStateToProps=state=>{
    return{
      isAuthenticated:state.auth.token !== null,
      error:state.auth.error,
      loading:state.auth.loading,
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return{
      authLogin:(username,password)=>dispatch(authActions.authLogin(username,password)),
    }
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(NavBar);