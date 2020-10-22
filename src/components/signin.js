import React, { Component } from 'react'
import * as authActions from '../store/actions/authActions' 
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import GoogleLogin from 'react-google-login'

class Signin extends Component {
    handleSubmit = e => {
        e.preventDefault()
        const name=e.target.username.value;
        const password=e.target.password.value;
        console.log(name,password)
        this.props.login(name,password)
      };
     
    
    render() {
        const dis= this.props.loading ? 'disabled' : ''
        if(this.props.isAuthenticated) return <Redirect to='/' />
        return (
            <div>
                <div className='w-full h-56 bg-gray-100 flex justify-center items-center' >
                
                   <span className='text-gray-800  text-5xl font-bold border-b border-solid border-gray-800' >Signin</span>
                </div>
                <form onSubmit={this.handleSubmit} className='flex flex-col  justify-center h-auto p-4 bg-white shadow-md rounded m-auto w-3/4 md:w-2/5   mb-8'>
                                      
                {this.props.error
                ?
                
                    Object.keys(this.props.error).map((key)=> {
                        return this.props.error[key] && this.props.error[key].map(msg =>
                        <div className="bg-red-100 border border-red-400 mb-4 text-red-700 m-auto  w-full md:w-3/4 mt-4 px-4 py-3 rounded relative" role="alert">
                        
                        <span className="block sm:inline">{msg}</span>
                    </div>)
                    })

                
                :
                ''
                }
                    <div className=" text-left m-auto w-full md:w-3/4  ">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ">
                        Username
                    </label>
                    <input required disabled={dis}  className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='username' id="username" type="text" placeholder="Username"/>
                    </div>

                    <div className="mt-5 text-left m-auto w-full md:w-3/4  ">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ">
                        Password
                    </label>
                    <input required disabled={dis} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='password' id="password" type="password" placeholder="Password"/>
                    </div>
                    
                    {this.props.loading
                    
                    ?
                    <button type='submit' className="bg-gray-300 w-full md:w-3/4 inline-flex justify-center opacity-50 cursor-not-allowed  pl-auto mt-4 m-auto  hover:bg-gray-400 text-gray-800 font-bold py-2 px-auto rounded items-center">
                        <Loader
                            type="TailSpin"
                            color="#000"
                            height={20}
                            width={20}   
                            className='mr-2 mt-1 '     
                        />
                    <span>Signin</span>
                    </button>
                    :
                    
                    <button type='submit' className="bg-gray-300 w-full md:w-3/4  pl-auto mt-4 m-auto  hover:bg-gray-400 text-gray-800 font-bold py-2 px-auto rounded items-center">
                    <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                    <span>Signin</span>
                    </button>
                    }
                  
                    </form >
                </div>
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


const mapDispatchToProps=(dispatch)=>{
    return{
        login:(username,password)=>dispatch(authActions.authLogin(username,password)),

    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Signin);