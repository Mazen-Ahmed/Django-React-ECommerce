import React, { Component } from 'react'
import Cards from 'react-credit-cards';
import * as productActions from '../store/actions/productsActions'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'

class Checkout extends Component {
    state={
        qty:0,
        visible:false,
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
        points:0,
    }


    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
      }
      
      handleInputChange = (e) => {
        const { name, value } = e.target;
        
        this.setState({ [name]: value });
      }

      handleSubmitOrder=()=>{
          if(this.state.expiry === '' || this.state.name === '' || this.state.number === '' || this.state.cvc==='' ){
            this.setState({error:'Invalid Data'})

          }else{
            if(this.state.points > localStorage.getItem('points') ){
                this.setState({error:'Invalid Points'})
            }else{
              
                this.props.submitOrders(localStorage.getItem('token'),this.props.cart.id,localStorage.getItem('points'))
                this.setState({error:null})
                this.setState({visible:false})

               
            }
            }  
      }
    render() {
        if(this.props.successMessage){
                this.props.history.push('/orders')
        }
        if(this.props.cart.length == 0) return <Redirect to='/cart'/>
        if(!this.props.isAuthenticated) return <Redirect to='/'/>
        console.log(localStorage.getItem('points'));
        return (
            <div>
                  <div className='w-full h-56 flex justify-center items-center ' >
                   <span className='text-gray-800  text-5xl font-bold border-b border-solid border-gray-800' >Checkout</span>
                </div>

                <div className='bg-white w-3/4 md:w-2/5 m-auto pt-10 pb-10 mb-10 shadow-md rounded-md'>
                    {
                        this.props.loading
                        ?
                        <center>
                        <Loader
                        type="TailSpin"
                        color="#000"
                        height={120}
                        width={120}   
                        className='w-full h-full mx-auto'     
                            />
                        </center>
                        :
                  
                            <div id="PaymentForm" className='w-full m-auto'>
                            {this.state.error
                            ?
                            <div className="bg-red-100 border-t-4 w-3/4 xl:w-3/5 mb-2 m-auto border-red-500 rounded-b text-red-900 px-4  shadow-md" role="alert">
                                <div className="flex">
                                <div className="py-1"><svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                                <div>
                                    <p className="font-bold">Error</p>
                                    <p className="text-sm">{this.state.error}.</p>
                                </div>
                                </div>
                            </div>
                            :
                            ''
                            }   
                            <Cards
                            cvc={this.state.cvc}
                            expiry={this.state.expiry}
                            focused={this.state.focus}
                            name={this.state.name}
                            number={this.state.number}
                            className='mb-2 w-3/4'
                            
                            />
                            <form className='flex flex-col justify-center items-center pl-2 pr-2 mt-2'>
                                <input
                                type="tel"
                                name="number"
                                required
                                placeholder="Card Number"
                                maxLength='16'
                                className=" shadow  border rounded w-full  py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                                defaultValue={this.state.number}
                            />
                              <input
                                type="text"
                                name="name"
                                required
                                placeholder="Name"
                                className=" shadow  border rounded w-full  py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                defaultValue={this.state.name}
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                              <input
                                type="tel"
                                name="expiry"
                                maxLength='4'
                                required
                                className=" shadow  border rounded w-full   inline-block  py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                defaultValue={this.state.expiry}
                                placeholder="Valid thru"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                             <input
                                type="tel"
                                name="cvc"
                                maxLength='4'
                                required
                                defaultValue={this.state.cvc}
                                className=" shadow w-full border rounded inline-block py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="CVC"
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                           
                            <button onClick={this.handleSubmitOrder} className="bg-gray-300  w-full  pl-auto mt-4 m-auto  hover:bg-gray-400 text-gray-800 font-bold py-2 px-auto rounded items-center">
                            <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Submit Order
                            </button>
                            </form>
                            </div>
    }
                            </div>
            </div>
        )
    }
}


const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token !== null,
        products:state.products.products,
        loading:state.products.loading,
        cart:state.products.cart,
        error:state.products.error,
        successMessage:state.products.successMessage
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        getCart:(token)=>dispatch(productActions.getCart(token)),
        deleteFromCart:(id,token)=>dispatch(productActions.deleteFromCart(id,token)),
        updateQuantity:(id,token,quantity)=>dispatch(productActions.updateQuantity(id,token,quantity)),
        submitOrders:(token,order_id,points)=>dispatch(productActions.submitOrders(token,order_id,points)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (Checkout)