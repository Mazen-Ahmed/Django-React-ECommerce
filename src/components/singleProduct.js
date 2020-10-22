import React, { Component } from 'react'
import * as productActions from '../store/actions/productsActions'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import Skeleton from 'react-loading-skeleton';

class SingleProduct extends Component {
    state={
        variations:[]
    }
    componentDidMount(){
        this.props.getSingleProduct(this.props.match.params.productID)
    }
    handleChange=(value)=>{
        this.setState({
            variations:[...this.state.variations,value]
        })
    }

    handleAddToCart=()=>{
        
    }
    render() {
        let mess=null
        if(this.props.successMessage){
                mess=<div class="bg-teal-100 border-t-4 w-3/4 md:w-3/5 mb-2 m-auto border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                        <div class="flex">
                        <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                        <div>
                            <p class="font-bold">Success Message</p>
                            <p class="text-sm">{this.props.successMessage}.</p>
                        </div>
                        </div>
                    </div>
        }else if(this.props.error){
            mess=<div class="bg-red-100 border-t-4 w-3/4 md:w-3/5 mb-2 m-auto border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
                        <div class="flex">
                        <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                        <div>
                            <p class="font-bold">Error</p>
                            <p class="text-sm">{this.props.error}.</p>
                        </div>
                        </div>
                    </div>
        }
        console.log(this.state.variations);
        return (
            <div >
                
              
                <div className='w-full h-56 flex justify-center items-center ' >
                    
                   <span className='text-gray-800  text-5xl font-bold border-b border-solid border-gray-800' >Single Product</span>
                </div>
               
                {mess}
                {this.props.singleLoad
                ?
                <div className='w-3/4 md:w-3/5 m-auto'>
                <Skeleton count={3} className='mt-4'/>
                <Skeleton count={3} className='mt-4'/>
                <Skeleton count={3} className='mt-4'/>
                </div>
                :
                <div className='grid md:grid-cols-2 w-3/4 md:w-3/5 m-auto md:grid-rows-1 grid-flow-row grid-col-1 grid-row-1 bg-white h-auto p-10 shadow-md rounded mb-10'>
                   
                    <div className='border-b-2 mb-2 pb-2 md:mr-2 md:mb-0 md:pb-0 md:border-b-0 md:border-r-2 border-gray-300 '>
                <span className='font-semibold text-gray-800 '>{this.props.product.name}</span>
                <img className='justify-center h-64' src={this.props.product.image} alt=""/>

                    </div>
                    <div className='ml-2 flex flex-col  justify-between'>
                    <p className='font-semibold text-gray-800 '>Brand: <p className='font-semibold text-gray-600 '>{this.props.product.brand}</p></p>    
                    <p className='font-semibold text-gray-800 mt-2'>Category: <p className='font-semibold text-gray-600 '>{this.props.product.category}</p></p> 
                    <p className='font-semibold text-gray-800 mt-2'>Description: <p className='font-semibold text-gray-600 w-1/2'>{this.props.product.description}</p></p> 
                    <p className='font-semibold text-gray-800 mt-2'>Price: <p className='font-semibold text-gray-600 '>{this.props.product.price} EGP</p></p>    
                    {this.props.product.feature&&this.props.product.feature.length > 0
                    ?
                    this.props.product.feature&&this.props.product.feature.map(feat=>{
                        return(
                            <div class="inline-block relative mt-2  md:mt-0  w-40 lg:mr-12">
                            <label class="block text-gray-800 text-sm font-semibold mb-2 ">
                                {feat.featurename}
                            </label>
                                <select  onChange={event=>this.handleChange(event.target.value)} class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                    <option>select {feat.featurename}</option>
                                    {feat.values.map(value=>{
                                        return(
                                            <option value={value.id}>{value.values}</option>
                                        )
                                    })}
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4 mt-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        )
                    })
                   
                    :
                    ''

                    }

                    {this.props.loading
                    
                    ?
                    <button type='submit' class="bg-gray-300 w-full md:w-3/4 inline-flex justify-center opacity-50 cursor-not-allowed  pl-auto mt-2 hover:bg-gray-400 text-gray-800 font-bold py-2 px-auto rounded items-center">
                        <Loader
                            type="TailSpin"
                            color="#000"
                            height={20}
                            width={20}   
                            className='mr-2 mt-1 '     
                        />
                    <span>Add To Cart</span>
                    </button>
                    :
                    this.props.isAuthenticated
                    ?
                    <button onClick={()=>this.props.addToCart(this.props.product.id,localStorage.getItem('token'),this.state.variations)} type='submit' class="bg-gray-300 mt-2 w-full md:w-3/4 justify-self-end hover:bg-gray-400 text-gray-800 font-bold py-2 rounded items-center">
                    <svg class="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg><span>Add To Cart</span>
                    </button>
                    :

                    <>
                    <p className=' text-red-600 font-semibold inline-block italic'>Please Sign Up To A Able To Use Cart.</p>

                    <button class="bg-gray-300 w-full md:w-3/4 inline-flex justify-center opacity-50 cursor-not-allowed  pl-auto mt-2  text-gray-800 font-bold py-2 px-auto rounded items-center">
                      <svg class="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    <span>Add To Cart</span>
                    </button>
                    </>
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
        product:state.products.product,
        loading:state.products.loading,
        singleLoad:state.products.singleLoad,
        error:state.products.error,
        successMessage:state.products.successMessage,
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        getSingleProduct:(id)=>dispatch(productActions.getSingleProduct(id)),
        addToCart:(id,token,feats)=>dispatch(productActions.addToCart(id,token,feats))
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (SingleProduct)