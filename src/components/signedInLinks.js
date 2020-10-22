import React from 'react'
import {Link} from 'react-router-dom'
import * as authActions from '../store/actions/authActions'
import {connect} from 'react-redux'
import {useState} from 'react'

 function SignedOutLinks(props) {
    const [opened,setOpened]=useState(false)
    let menu=opened ?'block':'hidden'
    let state=props.opened ? 'block' : 'hidden'
    const handleOpen=()=>{
        if(opened){
            setOpened(false)
        }else{
            setOpened(true)
        }
    }
    return (
       <>
        <div className={`md:inline-flex mt-4 md:mt-0 md:flex-row md:ml-auto md:w-auto w-full md:items-center items-start flex flex-col md:h-auto  ${state}  `} id='menu'>
                     <Link to='/'><span className='inline-flex md:mr-4 font-bold text-white  text-1xl cursor-pointer hover:underline ' >Home </span></Link>
                    <Link to='/shop'><span className=' inline-flex md:mr-4 md:inline-block font-bold text-white  text-1xl cursor-pointer hover:underline ' >Shop </span></Link>
                    <Link to='/contact'><span className=' inline-flex md:mr-4 md:inline-block font-bold text-white  text-1xl cursor-pointer hover:underline ' >Contact </span></Link>
                    <span className='cursor-pointer' onClick={handleOpen}>
                    <span className='text-1xl md:mt-4 md:mr-4 text-white font-bold mr-2' ><img className='h-6 w-6 rounded-full inline-block mr-1 border-white border-solid border-2' src={localStorage.getItem('avatar')} />
                    {localStorage.getItem('username')} 
                    {opened
                    ?
                    <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                    :   
                    <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    }  
                    </span></span>
                    <div className={`w-40 h-auto p-4 px-8 ${menu}  flex flex-col bg-gray-800 rounded-md absolute mt-24 md:mt-48 md:ml-40 `}>
                    <Link to='/profile' > <span className='w-20 text-1xl  text-white  rounded font-bold' >
                    <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg> Profile
                        </span></Link>

                    <Link to='/orders' > <span className='w-20 text-1xl  text-white  rounded font-bold' >
                    <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg> Orders
                        </span></Link>    
                    
                    <Link to='/cart' > <span className='w-20 text-1xl  text-white  rounded font-bold' >
                    <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> Cart ({props.cartcount})
                        </span></Link>

                    <Link to='/' onClick={()=>props.logout()}> <span className='w-20 text-1xl mt-12 text-white  rounded font-bold' >
                    <svg className="w-5 h-5 inline-block " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg> Logout
                    </span></Link>
                    </div>
                </div>
               
                    </>
    )
}

const mapStateToProps=state=>{
    return{
      isAuthenticated:state.auth.token !== null,
      error:state.auth.error,
      loading:state.auth.loading,
      cartcount:state.products.cartcount

    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return{
      logout:()=>dispatch(authActions.logout()),
    }
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(SignedOutLinks)