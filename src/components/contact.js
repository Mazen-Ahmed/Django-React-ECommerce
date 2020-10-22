import React, { Component } from 'react'

class Contact extends Component {
    state={
        success:null
    }
    handle=(e)=>{
        e.preventDefault()
        this.setState({
            success:'thanks for your message'
        })
    }
    render() {
        return (
            <div>
            <div className='w-full h-56 bg-gray-100 flex justify-center items-center ' >
            
               <span className='text-gray-800  text-5xl font-bold border-b border-solid border-gray-800' >Contact Us</span>
            </div>
            {this.state.success
                    ?
                    <div class="bg-teal-100 border-t-4 w-3/4 md:w-2/5 mb-2 m-auto border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                        <div class="flex">
                        <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                        <div>
                            <p class="font-bold">Success Message</p>
                            <p class="text-sm">{this.state.success}.</p>
                        </div>
                        </div>
                    </div>
                    :
                    ''
                    }
            <form onSubmit={this.handle} className='flex flex-col  justify-center h-auto p-4 bg-white m-auto w-3/4 md:w-2/5 shadow-md rounded-md mb-8'>
            <div class=" text-left m-auto w-full md:w-3/4  ">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ">
                        Email
                    </label>
                    <input required   class="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='email' id="email" type="email" placeholder="Email"/>

                 
                    <label class="block text-gray-700 text-sm font-bold mb-2 ">
                        Message
                    </label>
                    <textarea required  class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='password' id="password" rows={4} placeholder="Password"/>
                    
           
            </div>
            <button type='submit' class="bg-gray-300 w-full md:w-3/4  pl-auto mt-4 m-auto  hover:bg-gray-400 text-gray-800 font-bold py-2 px-auto rounded items-center">
            <svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                    <span>Send</span>
                </button>
            
            </form>
            </div>
        )
    }
}

export default Contact