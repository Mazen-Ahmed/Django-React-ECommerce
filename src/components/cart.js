import React, { Component } from 'react'
import * as productActions from '../store/actions/productsActions'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import {Link, Redirect} from 'react-router-dom'

class Cart extends Component {
    state={
        qty:0,
        points:0,
        error:null,
    }
    componentDidMount(){
        this.props.getCart(localStorage.getItem('token'))
        this.props.getPoints(localStorage.getItem('token'))
    }
    handleQuantity=(e,id)=>{
        this.setState({qty:e},()=>{
            this.props.updateQuantity(id,localStorage.getItem('token'),this.state.qty)
        })
    }
    getTaxes=(num)=>{
        const final=(num * 14)/100
        return Math.round(final,4)
    }
    getFinal(num1,num2){
        const final=num1+num2
        return final
    }
   

    
      handlePoints=(pts)=>{
        if(pts > this.props.points ){
              this.setState({error:'invalid points amount'})
              this.setState({points:0})
        }else{
            this.setState({points:pts})
            this.setState({error:null})
          }
        }
    render() {
        let val= this.props.ord_points ? this.props.ord_points : this.state.points
        let err=null
        let final=this.props.cart.total-(this.state.points/4)
        if( (this.props.cart.total-(val/4)) <= 0){
            final=this.props.cart.total
            err='high amount of points for this order.'
            }else{
             final=this.props.cart.total-(val/4)
            }
        if(!this.props.isAuthenticated) return <Redirect to='/signin'/>
        
        return (
            <div className='overflow-y-auto'>
                <div className='w-full h-56 flex justify-center items-center ' >
                   <span className='text-gray-800  text-5xl font-bold border-b border-solid border-gray-800' >Cart</span>
                </div>
               
                <div className='w-full md:pr-8 md:pl-8 m-auto mb-20'>
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
                    this.props.cart.items &&this.props.cart.items.length>0
                    ?
                    <div className='flex flex-col lg:flex-row  lg:pr-56 lg:pl-56 h-auto'>
                        <div className='md:w-3/4 w-full  md:ml-0 md:mr-4 rounded'>
                            {this.props.cart.items && this.props.cart.items.map(item=>{
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
                                                        <select onChange={event=>this.handleQuantity(event.target.value,item.id)} value={item.quantity} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                            <option>6</option>
                                                            <option>7</option>
                                                            <option>8</option>
                                                            <option>9</option>
                                                            <option>10</option>

                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center mb-6 px-2 text-gray-700">
                                                            <svg className="fill-current h-4 w-4 mt-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                        </div>
                                        </div>

                                        </form>
                                        
                                        
                                        <button onClick={()=>this.props.deleteFromCart(item.id,localStorage.getItem('token'))} className='text-white bg-red-600 ml-4 mt-4 rounded p-2 '>
                                        <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> Remove from cart
                                        </button>
                                        </div>

                                    )
                                })
                            }
                        </div>
                            <div className='bg-white min-h-64 m-auto w-3/4  lg:w-1/4  flex flex-col rounded float-right mt-2  pl-2  shadow-lg '>
                            <span className='text-gray-800 font-sans  font-bold text-2xl w-3/4 border-b-2 border-solid border-gray-800 '>Check Out</span>
                        
                            <span className='font-semibold mt-4'>total: {this.props.cart.total} EGP</span>
                            <span className='font-semibold mt-4'>Shipping: 0.00 </span>
                            <span className='font-semibold mt-4'>Taxes: {this.getTaxes(this.props.cart.total)} EGP</span>
                            
                            <label htmlFor="points" className='mt-4 font-semibold text-gray-800'>
                                Enter Points To get Discount
                            </label>
                            <input
                                type="number"
                                name="points"
                                id='points'
                                placeholder="Points"
                                min='0'
                                defaultValue={val}
                                onChange={(event)=>this.handlePoints(event.target.value)}
                                className=" shadow  border rounded w-3/4  py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <p className=' text-gray-600  inline-block italic'>(you have {this.props.points} points)</p>
                            <p className=' text-red-600 font-semibold inline-block italic'>{err}</p>
                            {this.state.error
                            ?                           
                            <p className=' text-red-600 font-semibold inline-block italic'>{this.state.error}.</p>
                            :
                            ''
                            }

                            <hr className='w-3/4 mr-auto ml-auto mt-2 mb-2'/>
                            <span className='font-bold mb-4'>Final Price: {this.getFinal(final,this.getTaxes(this.props.cart.total))} </span>
                            {this.state.error || this.props.cart.total-(this.state.points/4)<=0
                            ?
                            <Link  to='#'>
                            <button  className='text-white bg-green-300 mr-2 mb-2  rounded p-2 cursor-not-allowed '>
                            <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Proceede To Checkout
                            </button>
                            </Link>
                            :
                            <Link to='/checkout'>
                            <button onClick={()=>this.props.setPoints(this.state.points)} className='text-white bg-green-600 mr-2 mb-2  rounded p-2 '>
                            <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Proceede To Checkout
                            </button>
                            </Link>
                            }   
                            </div>


                    </div>
                    
    
                
                :
                <span className='font-bold text-4xl h-auto m-auto w-full flex justify-center items-center mt-10 mb-20'><svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> No Items Here Yet.</span>
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
        points:state.products.points,
        ord_points:state.products.ord_points,
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        getCart:(token)=>dispatch(productActions.getCart(token)),
        deleteFromCart:(id,token)=>dispatch(productActions.deleteFromCart(id,token)),
        updateQuantity:(id,token,quantity)=>dispatch(productActions.updateQuantity(id,token,quantity)),
        submitOrders:(token,order_id,points)=>dispatch(productActions.submitOrders(token,order_id,points)),
        getPoints:(token)=>dispatch(productActions.getpoints(token)),
        setPoints:(points)=>dispatch(productActions.setOrderPoints(points))
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (Cart)