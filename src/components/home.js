import React, { Component } from 'react'
import * as productsActions from '../store/actions/productsActions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Home extends Component {
    componentDidMount(){
        this.props.getLastAdded()
        this.props.getCartCount(localStorage.getItem('token'))

    }
    resize=(name)=>{
        let productName=null
        if(name.length > 62){
            productName=name.substr(0,62)+'...'
            return productName
      }else{
            productName=name
            return productName
      }
    }
    render() {
        return (
            <div>
                <header className=' w-full flex flex-col'>

                    <span className='text-gray-800 font-sans  font-bold text-5xl w-3/4 mt-32 ml-12 md:ml-20 mb-12'>Get All Your Needs with just a touch.</span>
                    <p className='text-gray-800 font-sans  font-semibold text-1xl w-3/4 md:w-1/2 ml-12 md:ml-20 mb-12'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover</p>
                   <Link to='/shop'>
                   <button className='bg-gray-800 w-64 rounded px-6 py-6 ml-12 md:ml-20 mb-12 text-white font-semibold hover:bg-gray-700'>
                        Shop Now
                    </button>
                   </Link>
                   
                </header>

                <div className='w-full pr-12 pl-12 md:pr-20 md:pl-20 mt-10' id='newArrivals'>
                <span className='text-gray-800 font-sans  font-bold text-3xl w-3/4 border-b-2 border-solid border-gray-800 '>New Arrivals</span>
                <div className='grid grid-flow-row grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 mt-10'>
                    {this.props.products && this.props.products.map(product=>{
                        return(
                       
                        <div className='bg-white rounded   overflow-hidden shadow-md hover:pointer'>
                        <img className=' h-64 w-auto object-cover ' src={product.image} alt=""/>
                        <p className='text-gray-800 font-semibold ml-2 '>{this.resize(product.name)}</p>
                       <br/>
                        <p className='text-gray-800 font-semibold ml-2 '>{product.price} EGP</p><br/>
                        <Link to={`/product/${product.id}`}>
                        <button  type='submit' className="bg-gray-300 ml-2 mb-2 justify-self-end mt-4 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded items-center">
                        <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path></svg>Product Details
                        </button>   
                        </Link>
                        </div>
                        
                        )
                    })

                    }
                </div>
                </div>  

                <hr className='w-64 items-center m-auto mt-10 mb-10'/>

                <div className='w-full pr-12 pl-12 md:pr-20 md:pl-20 mb-10 ' id='ourFeatures'>
                <span className='text-gray-800 font-sans  font-bold text-3xl w-3/4 border-b-2 border-solid border-gray-800 '>Our Features</span>
                <div className='grid grid-flow-row grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-3 lg:grid-rows-1 gap-4 mt-10'>
                    <div className='pr-2'>
                    <svg className="w-10 h-10 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>    
                    <span className='text-gray-800 font-bold text-2xl'>Free Shiping method</span>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                    </div>
                    
                    <div className='pr-2'>
                    <svg class="w-10 h-10 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>                    <span className='text-gray-800 font-bold text-2xl'>Secure Payment method</span>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                    </div>

                    <div className='pr-2'>
                    <svg class="w-10 h-10 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>                    <span className='text-gray-800 font-bold text-2xl'>Secure System</span>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                    </div>
                </div>
                </div>

                <hr className='w-64 items-center m-auto mt-10 mb-10'/>

                <div className='w-full mt-20 pr-12 pl-12 md:pr-20 md:pl-20 mb-10 ' id='ourFeatures'>
                <div className='grid grid-flow-row grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 gap-4 mt-10'>
                   
                            <div className='pr-2 h-64' id='cover'>
                            
                            </div>

                            <div className='pr-2'>
                            <span className='text-gray-800 font-sans  font-bold text-2xl md:text-3xl lg:text-4xl w-3/4 border-b-2 border-solid border-gray-800 mb-3'>Get The Best Quality From home</span>

                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                            <Link to='/shop'>
                           <button className='bg-gray-800 w-64 rounded px-2 py-6 mt-12 text-white font-semibold hover:bg-gray-700'>
                                Shop Now
                            </button>
                            </Link>
                            </div>
                </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        loading:state.products.loading,
        products:state.products.products,
        error:state.products.error,

    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        getLastAdded:()=>dispatch(productsActions.getLastAdded()),
        getCartCount:(token)=>dispatch(productsActions.getcartcount(token))

    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Home);