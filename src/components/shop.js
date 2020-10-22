import React, { Component } from 'react'
import { Pagination } from 'antd';
import * as productActions from '../store/actions/productsActions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';


class Shop extends Component {
    state = {
        current: 1,
        name:null,
        category:null,
        brand:null,
        min:null,
        max:null,
        error:null
      };
      componentDidMount(){
        this.props.getShop()
        this.props.getBrands()
        this.props.getCategories()
      }
    
      onChange = (page) => {
       this.props.getShop(page,this.state.name,this.state.category,this.state.brand,this.state.min,this.state.max)
       this.setState({current:page})
      };
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

    handleShop=()=>{
        console.log(this.state.name,this.state.min);
        this.props.getShop(1,this.state.name,this.state.category,this.state.brand,this.state.min,this.state.max)

    }
    render() {
        let sk = [];
        for(var i=0 ; i<9 ; i++){
            sk.push(<div key={i}>
                        <h1><Skeleton height={250} width={200}/></h1>
                        <Skeleton count={2} />
                      </div>);
                        }
        return (
            <div>
                <div className='w-full h-56 flex justify-center items-center ' >
                   <span className='text-gray-800  text-5xl font-bold border-b border-solid border-gray-800' >Shop</span>
                </div>
                <div className='h-auto ml-10 mr-10 bg-gray-800 m-auto rounded-md mb-10  flex lg:flex-row flex-col items-center justify-center py-4' >


                <div className="inline-block relative w-40 lg:mr-12">
                    <label className="block text-white text-sm font-bold mb-2 ">
                        Search by name
                    </label>
                    <input required onChange={(event)=>this.setState({name:event.target.value})}  className=" shadow appearance-none border rounded w-full py-2 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='name' id="password" type="text" placeholder="Name"/>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2  text-gray-700">
                        <svg className="w-8 h-8 mt-8 bg-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>                        </div>
                    </div>

                    <div className="inline-block relative w-40 lg:mr-12">
                    <label className="block text-white text-sm font-bold mb-2 ">
                        category
                    </label>
                        <select onChange={(event)=>this.setState({category:event.target.value})} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option>select category</option>
                            {this.props.categories&&this.props.categories.map(category=>{
                                return(
                                <option key={category.id} value={category.id}>{category.name}</option>
                                )
                            })
                            }
                            </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ">
                            <svg className="fill-current h-4 w-4 mt-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>

                    <div className="inline-block relative w-40 mt-2 md:mt-0 lg:mr-12">
                    <label className="block text-white text-sm font-bold mb-2 ">
                        brand
                    </label>
                        <select onChange={(event)=>this.setState({brand:event.target.value})} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option>select brand</option>
                            {this.props.brands&&this.props.brands.map(brand=>{
                                return(
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                                )
                            })
                            }
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4 mt-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>

                   

                    
                    <div className="inline-block relative w-40 lg:w-20 lg:mr-4">
                    <label className="block text-white text-sm font-bold mb-2 ">
                        Min. Price
                    </label>
                    <input onChange={(event)=>this.setState({min:event.target.value})} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  id="username" type="number" placeholder="Min "/>
                    </div>
                    <div className="inline-block relative w-40 lg:w-20">
                    <label className="block text-white text-sm font-bold mb-2 ">
                        Max. Price
                    </label>
                    <input onChange={(event)=>this.setState({max:event.target.value})} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"   id="username" type="number" placeholder="Max "/>
                    </div>
                    <button onClick={this.handleShop} className='bg-white w-40 lg:w-auto rounded px-12 py-2 lg:ml-10 mt-6  text-gray-800 font-semibold hover:bg-gray-200'>
                        Apply
                    </button>
                </div>

                {
                    this.props.loading
                    ?
                    <div className='grid grid-flow-row gap-4 md:grid-rows-5 md:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 pl-10 pr-10'>
                        
                       {sk}
                   </div>
                    :
                    this.props.products&&this.props.products.length > 0
                    ?
                <div className='grid grid-flow-row gap-4 md:grid-rows-5 md:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 pl-10 pr-10'>
              
                     {this.props.products.map(product=>{
                        return(
                       
                        <div className='bg-white rounded  overflow-hidden shadow-lg hover:pointer' key={product.id}>
                        <img className=' h-64 w-auto object-cover ' src={product.image} alt=""/>
                        <span className='text-gray-800 font-semibold ml-2 '>{this.resize(product.name)}</span>
                       <br/>
                        <span className='text-gray-800 font-semibold ml-2 '>{product.price} EGP</span><br/>
                       
                        <Link to={`/product/${product.id}`}>
                        <button  type='submit' className="bg-gray-300 ml-2 mb-2 w-1/2 justify-self-end mt-4 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded items-center">
                        <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path></svg>Product Details
                        </button>   
                        </Link>
                        </div>  
                        
                        )
                    })}
               
                

                </div>
                 :
                 <span className='font-bold text-4xl m-auto w-full flex justify-center items-center mt-10 mb-16'><svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> Can't find this product.</span>
 
                     }
                <div className='justify-end flex items-center mb-10 mt-4 mr-16'>
                    {this.props.count && this.props.count > 0
                    ?
                <Pagination current={this.state.current} onChange={this.onChange} total={this.props.count && this.props.count} />
                    :
                    ''
                    }
                </div>
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
        categories:state.products.categories,
        brands:state.products.brands
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        getShop:(page,name,category,brand,min,max)=>dispatch(productActions.getShop(page,name,category,brand,min,max)),
        addToCart:(id,token,feats)=>dispatch(productActions.addToCart(id,token,feats)),
        getBrands:()=>dispatch(productActions.getBrands()),
        getCategories:()=>dispatch(productActions.getCategories()),

    }
}


export default connect(mapStateToProps,mapDispatchToProps) (Shop);