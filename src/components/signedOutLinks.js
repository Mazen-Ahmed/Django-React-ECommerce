import React from 'react'
import {Link} from 'react-router-dom'


export default function SignedOutLinks({opened}) {
    let state=opened ? 'block' : 'hidden'
    return (
       
           
            <div className={`md:inline-flex mt-4 md:mt-0 md:flex-row md:ml-auto md:w-auto w-full md:items-center items-start flex flex-col md:h-auto  ${state}  `} id='menu'>
               
                    <Link to='/'><span className='inline-flex md:mr-4 font-bold text-white  text-1xl cursor-pointer hover:underline ' >Home </span></Link>
                    <Link to='/shop'><span className=' inline-flex md:mr-4 md:inline-block font-bold text-white  text-1xl cursor-pointer hover:underline ' >Shop </span></Link>
                    <Link to='/contact'><span className=' inline-flex md:mr-4 md:inline-block font-bold text-white  text-1xl cursor-pointer hover:underline ' >Contact </span></Link>
                    <Link to='/signin'><span className='inline-flex md:mr-4 md:inline-block font-bold text-white  text-1xl cursor-pointer hover:underline ' >Signin </span></Link>
                    <Link to='/signup'><span className='inline-flex md:mr-4 md:inline-block font-bold text-white  text-1xl cursor-pointer hover:underline ' >Signup </span></Link>
                
           
            </div>
    )
}
