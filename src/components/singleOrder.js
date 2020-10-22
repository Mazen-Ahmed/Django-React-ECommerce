import React, { Component } from 'react'
import * as productActions from '../store/actions/productsActions'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import {Link, Redirect} from 'react-router-dom'

class SingleOrder extends Component {
    componentDidMount(){
               this.props.getOrder(this.props.match.params.orderID)

    }

    getTaxes=(num)=>{
        const final=(num * 14)/100
        return Math.round(final,4)
    }
    getFinal(num1,num2){
        const final=num1+num2
        return final
    }
    render() {
        return (
            <div>
                 <div className='w-full h-56 flex justify-center items-center ' >
                   <span className='text-gray-800  text-5xl font-bold border-b border-solid border-gray-800' >Single Order</span>
                </div>
                {
                        this.props.loading
                        ?
                       <center>
                        <Loader
                        type="TailSpin"
                        color="#000"
                        height={188}
                        width={120}   
                        className='w-full h-full mx-auto'     
                    />
                   </center>
                        :
                <div className='flex flex-col lg:flex-row  lg:pr-56 lg:pl-56 h-auto pb-4'>
              
                <div className='md:w-3/4 w-full  md:ml-0 md:mr-4 rounded mb-4'>
                {this.props.successMessage
                    ?
                    <div class="bg-teal-100 border-t-4 md:w-3/4 w-full mb-2 m-auto border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
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
                
                            {this.props.order.items && this.props.order.items.map(item=>{
                                    return(
                                        <div className="bg-white w-3/4 h-auto m-auto p-4 mt-2 shadow-md" key={item.id}>
                                        <img alt='img' className='object-cover h-32' src={`http://127.0.0.1:8000${item.product_obj.image}`} />

                                        <p className='font-semibold text-gray-800 ml-4 mt-4'>{item.product}</p>
                                    <span><p className='font-semibold text-gray-800 ml-4 inline-block '>{item.price} EGP</p><p className=' text-gray-500 ml-2 inline-block italic'>({item.product_obj.price} For each one)</p></span> 
                                    <br/>
                                    {item.features.map(feature=>{
                                        return(
                                            <p className='font-semibold text-gray-800 ml-4 '>{feature.values}</p> 
                                        )
                                    })}
                                        <form action="" className='ml-4'>    
                                        <label className="block text-gray-800 text-sm font-semibold mb-2 ">
                                                        Quantity
                                        </label>        
                                        <div className="inline-block relative w-20 mt-2 md:mt-0 lg:mr-12">
                                                        <input disabled value={item.quantity} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" />
                                                    
                                        </div>

                                        </form>
                                        
                                        
        
                                        </div>

                                    )
                                })
                            }
                        </div>


                        <div className='bg-white min-h-64 m-auto w-3/4  lg:w-1/4  flex flex-col rounded float-right mt-2  pl-2  shadow-lg '>
                            <span className='text-gray-800 font-sans  font-bold text-2xl w-3/4 border-b-2 border-solid border-gray-800 '>Order Details</span>
                            <span className='font-semibold mt-2'>User: {this.props.order.user} </span>
                            <span className='font-semibold mt-2'>Date: {this.props.order.created_at} </span>
                            <span className='font-semibold mt-2'>Invoice number: {this.props.order.invoice_number}</span>

                            <hr className='w-3/4 mr-auto ml-auto mt-4 mb-2'/>
                            <span className='font-semibold mt-2'>Shipping: 0.00 </span>
                            <span className='font-semibold mt-2'>Taxes: {this.getTaxes(this.props.order.total)} EGP</span>
                            <span className='font-semibold mt-2'>Price before using points: {this.getFinal(this.props.order.total,this.getTaxes(this.props.order.total))} EGP</span>
                            {this.props.order.final_order_price <= 0
                            ?
                            <span className='font-bold mt-2'>Final Price: {this.getFinal(this.props.order.total,this.getTaxes(this.props.order.total))} EGP</span>

                            :
                            <span className='font-bold mt-2 '>Final Price: {this.props.order.final_order_price} EGP</span>
                            }
                            <hr className='w-3/4 mr-auto ml-auto mt-4 mb-2'/>
                            { this.props.order.delivered
                            ?
                            <span className='font-semibold mt-2 mb-2'>Delivered: <input disabled checked type="checkbox" className=' shadow-md w-4 h-4 cursor-pointer'/></span>

                            :
                            <span  className='font-semibold mt-2 mb-2'>Delivered: <input onChange={()=>this.props.setdelivered(this.props.order.id)} type="checkbox" className=' shadow-md w-4 h-4 cursor-pointer'/></span>
                            }   
                            </div>


                </div>
                        }
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token !== null,
        products:state.products.products,
        loading:state.products.loading,
        order:state.products.order,
        error:state.products.error,
        successMessage:state.products.success,
        ord_points:state.products.ord_points,
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        deleteFromCart:(id,token)=>dispatch(productActions.deleteFromCart(id,token)),
        updateQuantity:(id,token,quantity)=>dispatch(productActions.updateQuantity(id,token,quantity)),
        getOrder:(id)=>dispatch(productActions.getSingleOrder(id)),
        setdelivered:(id)=>dispatch(productActions.setdelivered(id)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (SingleOrder)