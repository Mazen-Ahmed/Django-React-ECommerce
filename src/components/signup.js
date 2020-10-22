import React, { Component } from 'react'
import * as authActions from '../store/actions/authActions' 
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
class Signup extends Component {

    handleSubmit = e => {
        e.preventDefault()
        const name=e.target.username.value;
        const password1=e.target.password1.value;
        const password2=e.target.password2.value;
        const email=e.target.email.value;

        console.log(name,password1,password2,email)
        this.props.signup(name,email,password1,password2)
      };
    render() {
        const dis= this.props.loading ? 'disabled' : ''
        if(this.props.isAuthenticated) return <Redirect to='/' />
        return (
            <div>
                <div className='w-full h-56 bg-gray-100  flex justify-center items-center' >
                    
                   <span className='text-gray-800 font-bold text-5xl border-b border-solid border-gray-800' >Signup</span>
                </div>
                <form onSubmit={this.handleSubmit} className='flex flex-col  justify-center w-3/4 md:w-2/5 shadow-md rounded m-auto h-auto p-4 bg-white mb-8'>
                {this.props.error
                ?
                
                    Object.keys(this.props.error).map((key)=> {
                        return this.props.error[key] && this.props.error[key].map(msg =>
                        <div class="bg-red-100 border border-red-400 mb-4 text-red-700 m-auto  w-full md:w-3/4 mt-4 px-4 py-3 rounded relative" role="alert">
                        
                        <span class="block sm:inline">{msg}</span>
                    </div>)
                    })

                
                :
                ''
                }
                   <div class=" text-left m-auto w-full md:w-3/4  ">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ">
                        Username
                    </label>
                    <input required disabled={dis}  class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='username'  type="text" placeholder="Username"/>
                    </div>
                    <div class="mt-5 text-left m-auto w-full md:w-3/4 ">
                    <label class="block text-gray-700 text-sm font-bold mb-2 " >
                        Password
                    </label>
                    <input required disabled={dis} class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='password1'  type="password" placeholder="Password"/>
                    </div>


                    
                    <div class="mt-5 text-left m-auto w-full md:w-3/4 ">
                    <label class="block text-gray-700 text-sm font-bold mb-2 " >
                        Confirm Password
                    </label>
                    <input required disabled={dis} class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='password2'  type="password" placeholder="Password(Confirmation)"/>
                    </div>


                    <div class="mt-5 text-left m-auto w-full md:w-3/4 ">
                    <label class="block text-gray-700 text-sm font-bold mb-2 " >
                        Email
                    </label>
                    <input required disabled={dis} class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='email'  type="email" placeholder="Email"/>
                    </div>


                    {this.props.loading
                    
                    ?
                    <button type='submit' class="bg-gray-300 w-full md:w-3/4 inline-flex justify-center opacity-50 cursor-not-allowed  pl-auto mt-4 m-auto  hover:bg-gray-400 text-gray-800 font-bold py-2 px-auto rounded items-center">
                        <Loader
                            type="TailSpin"
                            color="#000"
                            height={20}
                            width={20}   
                            className='mr-2 mt-1 '     
                        />
                    <span>Signup</span>
                    </button>
                    :
                    
                    <button type='submit' class="bg-gray-300 w-full md:w-3/4  pl-auto mt-4 m-auto  hover:bg-gray-400 text-gray-800 font-bold py-2 px-auto rounded items-center">
                   <svg class="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    <span>Signup</span>
                    </button>
                    }
                    </form>
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
        signup:(username,email,password1,password2)=>dispatch(authActions.authSignup(username,email,password1,password2))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Signup)