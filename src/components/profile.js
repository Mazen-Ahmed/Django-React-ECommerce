import React, { Component } from 'react'
import * as authActions from '../store/actions/authActions' 
import * as productActions from '../store/actions/productsActions'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import Skeleton from 'react-loading-skeleton';
import {Bar} from 'react-chartjs-2'
class Profile extends Component {
    state={
        file:null
      }
    componentDidMount(){
        this.props.getUserProfile(localStorage.getItem('token'))
        this.props.getTopProducts(localStorage.getItem('token'))
    }


    handleEdit=(e)=>{
        e.preventDefault()

        const data=new FormData()
        
        this.setState({file:e.target.files[0]},()=>{
          data.append('avatar',this.state.file,this.state.file.name)
          data.append('token',localStorage.getItem('token'))
          this.props.updateUserImage(data)
          this.props.getUserProfile(localStorage.getItem('token'))
        })
    }

    handleChangePassword=(e)=>{
        e.preventDefault()
        this.props.updateUserPassword(e.target.password1.value,e.target.password2.value,e.target.password3.value,localStorage.getItem('token'))
        
    }
    render() {
        return (
            <div>
                <div className='w-full h-56 flex justify-center items-center ' >
                   <span className='text-gray-800  text-5xl font-bold border-b border-solid border-gray-800' >Profile</span>
                </div>
                <div className="grid md:grid-cols-2 w-3/4 md:w-3/4 m-auto md:grid-rows-1 grid-flow-row grid-col-1 grid-row-1 bg-white h-auto p-10 shadow-md rounded mb-10">
                <div  className='border-b-2 mb-2 pb-2 md:mr-2 md:mb-0 md:pb-0 md:border-b-0 md:border-r-2 border-gray-300 '> 

                { this.props.loading
                ?
                <div className='w-3/5 mt-6 m-auto'>
                    <Skeleton count={4} className='mt-4'/>
                    <Skeleton count={4} className='mt-4'/>
                    <Skeleton count={3} className='mt-4'/>
                    </div>
                :
                
                    
                this.props.changeLoad
                    
                    ?
                    <button type='submit' class="bg-gray-300 w-2/5  inline-flex justify-center opacity-50 cursor-not-allowed  pl-auto mt-4 m-auto float-right mr-2 hover:bg-gray-400 text-gray-800 font-bold py-2 px-auto rounded items-center">
                        <Loader
                            type="TailSpin"
                            color="#000"
                            height={20}
                            width={20}   
                            className='mr-2 mt-1 '     
                        />
                    <span>Change</span>
                    </button>
                    :
                <div>
                
                <button onClick={()=>this.avatar.click()} className=' bg-gray-300 w-2/5  pl-auto  m-auto  hover:bg-gray-400 text-gray-800 font-bold py-2 float-right mr-2 px-auto rounded items-center'> 
                <svg class="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                Change
                </button>
                
            
                <input type="file" style={{display:'none'}} onChange={(e)=>this.handleEdit(e)}name='upload' ref={avatar=>this.avatar=avatar}/>

                <br/>
                <img src={this.props.profile.avatar} className='rounded-full mt-6 h-48 w-48 m-auto ' alt=""/>
             
                <span className='text-gray-800 lg:ml-40 mt-10 font-bold text-1xl' >Username:<p className=' text-gray-700 ml-2 font-semibold inline-block italic'>{this.props.profile.username}</p></span><br/>
                <span className='text-gray-800 lg:ml-40 font-bold text-1xl' >Email:<p className=' text-gray-700 ml-2 font-semibold inline-block italic'>{this.props.profile.email}</p></span><br/>
                <span className='text-gray-800 lg:ml-40 font-bold text-1xl' >Points:<p className=' text-gray-700 ml-2 font-semibold inline-block italic'>{this.props.profile.points}</p></span><br/>
                </div>
                }
                
                </div>

                <div>
                <form onSubmit={this.handleChangePassword} className='flex flex-col  justify-center h-auto p-4 bg-white m-auto w-full mb-8'>
            <div class=" text-left m-auto w-full  ">
            {this.props.message
                ?
               
                    <div class="bg-teal-100 border border-teal-400 mb-4 text-teal-700 m-auto  w-full  mt-4 px-4 py-3 rounded relative" role="alert">
                        
                    <span class="block sm:inline">{this.props.message}</span>
                    </div>

                
                :
                ''
                }


            {this.props.error
                ?
                
                    Object.keys( this.props.error).map((key)=> {
                        return this.props.error && this.props.error[key].map(msg =>
                        <div class="bg-red-100 border border-red-400 mb-4 text-red-700 m-auto  w-full  mt-4 px-4 py-3 rounded relative" role="alert">
                            
                        <span class="block sm:inline">{msg}</span>
                    </div>)
                    })

                
                :
                ''
                }
            <span className='text-gray-800 text-1xl  md:text-3xl font-bold border-b  border-solid border-gray-800' >Change Password</span>

                     <label class="block text-gray-700 text-sm font-bold mb-2 ">
                        New Password
                    </label>
                    <input required name='password1'  class="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="New Password"/>

                 
                   
                    <label class="block text-gray-700 text-sm font-bold mb-2 ">
                        New Password(Confirmation)
                    </label>
                    <input required  name='password2' class="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="New PAssword(Confirmation)"/>
                    
                    
                    <label class="block text-gray-700 text-sm font-bold mb-2 ">
                        Current Password
                    </label>
                    <input required name='password3'  class="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Old Password"/>
           
            </div>
            {this.props.changeLoad
                    
                    ?
                    <button  class="bg-gray-300 w-full  inline-flex justify-center opacity-50 cursor-not-allowed  pl-auto mt-4 m-auto float-right mr-2 hover:bg-gray-400 text-gray-800 font-bold py-2 px-auto rounded items-center">
                        <Loader
                            type="TailSpin"
                            color="#000"
                            height={20}
                            width={20}   
                            className='mr-2 mt-1 '     
                        />
                    <span>Confirm</span>
                    </button>
                    :
            <button type='submit' class="bg-gray-300 w-full   pl-auto mt-4 m-auto  hover:bg-gray-400 text-gray-800 font-bold py-2 px-auto rounded items-center">
            <svg class="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>             
                Confirm
               </button>

            }
            
            </form>
                </div>             
                </div>
                <div className=" w-3/4 md:w-3/4 m-auto  bg-white h-auto  shadow-md rounded mb-10">
                <div className="header bg-gray-800 text-white w-full h-12 flex justify-center text-semibold text-2xl items-center">
                    Your Most Preferd products
                </div>

                <div className='chart'>
                <Bar data={this.props.topProducts&&this.props.topProducts}/>
                </div>

                </div>



            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticated:state.auth.token !== null,
        profile:state.auth.profile,
        loading:state.auth.loading,
        error:state.auth.error,
        message:state.auth.success,
        changeLoad:state.auth.changeLoad,
        topProducts:state.products.topProducts,

      }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        getUserProfile:(token)=>dispatch(authActions.getUserProfile(token)),
        updateUserPassword:(password1,password2,oldPassword,token)=>dispatch(authActions.updateUserPassword(password1,password2,oldPassword,token)),
        updateUserImage:(data)=>dispatch(authActions.updateUserImage(data)),
        getTopProducts:(token)=>dispatch(productActions.gettopproducts(token)),
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)