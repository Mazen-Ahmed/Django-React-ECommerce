import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton';
import * as productActions from '../store/actions/productsActions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


class Orders extends Component {
    
    componentDidMount(){
        this.props.getOrders(localStorage.getItem('token'))
        this.props.getcartcount(localStorage.getItem('token'))
    }

    render() {
        return (
            <div>
                <div className='w-full h-56 flex justify-center items-center ' >
                   <span className='text-gray-800  text-5xl font-bold border-b border-solid border-gray-800' >My Orders</span>
                </div>
                {
                    this.props.successMessage
                    ?
                    <div class="bg-teal-100 border-t-4 w-3/4 md:w-3/5 mb-2 m-auto border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                        <div class="flex">
                        <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                        <div>
                            <p class="font-bold">Success Message</p>
                            <p class="text-sm">{this.props.successMessage}.</p>
                        </div>
                        </div>
                    </div>
                    :
                    ''
                }

                {
                    this.props.loading
                    ?
                    <div className='w-3/5 m-auto'>
                    <Skeleton count={3} className='mt-4'/>
                    <Skeleton count={3} className='mt-4'/>
                    <Skeleton count={3} className='mt-4'/>
                    </div>
                    :
                    this.props.orders.length >0
                ?
                    this.props.orders.map(order=>{
                        return(
                        <div className='w-3/5 m-auto bg-white mb-2 rounded-md shadow-md h-48 p-6 pb-4 '>
                            <span className='font-semibold text-gray-800'>Invoice Number: <p className='text-gray-500 inline-block'>{order.invoice_number}</p></span><br/>
                            <span className='font-semibold text-gray-800'>User: <p className='text-gray-500 inline-block'>{order.user}</p></span><br/>
                            <span className='font-semibold text-gray-800'>Date: <p className='text-gray-500 inline-block'>{order.created_at}</p></span><br/>
                            <Link to={`/order/${order.id}`}>
                        <button  type='submit' class="bg-gray-300 float-right  px-4 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded items-center">
                        <svg class="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path></svg>Order Details
                        </button>   
                        </Link>
                        </div>
                        )
                    })
                :
                <span className='font-bold text-3xl m-auto w-full flex justify-center items-center mt-10 mb-16'><svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> No Orders Here Yet.</span>


                }

            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        products:state.products.products,
        loading:state.products.loading,
        count:state.products.count,
        error:state.products.error,
        orders:state.products.orders,
        successMessage:state.products.successMessage
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        getcartcount:(token)=>dispatch(productActions.getcartcount(token)),
        addToCart:(id,token,feats)=>dispatch(productActions.addToCart(id,token,feats)),
        getBrands:()=>dispatch(productActions.getBrands()),
        getOrders:(token)=>dispatch(productActions.getOrders(token)),

    }
}


export default connect(mapStateToProps,mapDispatchToProps) (Orders)