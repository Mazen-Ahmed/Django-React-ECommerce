import axios from 'axios'
import {authCheck} from './authActions'
export const GET_LAST_ADDED_START='getLastAddedStart'
export const GET_LAST_ADDED_SUCCESS='getLastAddedSuccess'
export const GET_LAST_ADDED_FAILED='getLastAddedFailed'
export const GET_SHOP_START='getShopStart'
export const GET_SHOP_SUCCESS='getShopSuccess'
export const GET_SHOP_FAILED='getShopFailed'
export const GET_CART_COUNT='getCartCount'
export const ADD_TO_CART_START='addToCartStart'
export const ADD_TO_CART_SUCCESS='addToCartSuccess'
export const ADD_TO_CART_FAILED='addToCartFailed'
export const GET_CART_START='getCartStart'
export const GET_CART_SUCCESS='getCartSuccess'
export const GET_CART_FAILED='getCartFailed'
export const DELETE_FROM_CART_START='deleteFromCartStart'
export const DELETE_FROM_CART_SUCCESS='deleteFromCartSuccess'
export const DELETE_FROM_CART_FAILED='deleteFromCartFailed'
export const UPDATE_QUANTITY_START='updateQuantityStart'
export const UPDATE_QUANTITY_SUCCESS='updateQuantitySuccess'
export const UPDATE_QUANTITY_FAILED='updateQuantityFailed'
export const GET_SINGLE_PRODUCT_START='getSingleProductStart'
export const GET_SINGLE_PRODUCT_SUCCESS='getSingleProductSuccess'
export const GET_SINGLE_PRODUCT_FAILED='getSingleProductFailed'
export const GET_CATEGORIES_START='getCategoriesStart'
export const GET_CATEGORIES_SUCCESS='getCategoriesSuccess'
export const GET_CATEGORIES_FAILED='getCategoriesFailed'
export const GET_BRANDS_START='getBrandsStart'
export const GET_BRANDS_SUCCESS='getBrandsSuccess'
export const GET_BRANDS_FAILED='getBrandsFailed'
export const SUBMIT_ORDERS_START='submitOrdersStart'
export const SUBMIT_ORDERS_SUCCESS='submitOrdersSuccess'
export const SUBMIT_ORDERS_FAILED='submitOrdersFailed'
export const GET_ORDERS_START='getOrdersStart'
export const GET_ORDERS_SUCCESS='getOrdersSuccess'
export const GET_ORDERS_FAILED='getOrdersFailed'
export const GET_SINGLE_ORDER_START='getSingleOrderStart'
export const GET_SINGLE_ORDER_SUCCESS='getSingleOrderSuccess'
export const GET_SINGLE_ORDER_FAILED='getSingleOrderFailed'
export const GET_POINTS='getPoints'
export const GET_TOP_PRODUCTS='getTopProducts'
export const SET_ORDER_POINTS='setOrderPoints'
export const SET_DELIVERED='setDelivered'


export const getTopProducts=(products)=>{
    return{
        type:GET_TOP_PRODUCTS,
        products
    }
}

export const getPoints=(points)=>{
    return{
        type:GET_POINTS,
        points
    }
}

export const setDelivered=(message)=>{
    return{
        type:SET_DELIVERED,
        message
    }
}



export function setOrderPoints(points){
    localStorage.setItem('points',points)
    return{
        type:SET_ORDER_POINTS,
        points
    }
}



export const getCartCount=(count)=>{
    return{
        type:GET_CART_COUNT,
        count
    }
}

export const getLastAddedStart=()=>{
    return{
        type:GET_LAST_ADDED_START
    }
}

export const getLastAddedSuccess=(products)=>{
    return{
        type:GET_LAST_ADDED_SUCCESS,
        products
    }
}

export const getLastAddedFailed=(error)=>{
    return{
        type:GET_LAST_ADDED_FAILED,
        error
    }
}



export const addToCartStart=()=>{
    return{
        type:ADD_TO_CART_START
    }
}

export const addToCartSuccess=(successMessage)=>{
    return{
        type:ADD_TO_CART_SUCCESS,
        successMessage
    }
}

export const addToCartFailed=(error)=>{
    return{
        type:ADD_TO_CART_FAILED,
        error
    }
}





export const getShopStart=()=>{
    return{
        type:GET_SHOP_START
    }
}

export const getShopSuccess=(products,count)=>{
    return{
        type:GET_SHOP_SUCCESS,
        products,
        count
    }
}

export const getShopFailed=(error)=>{
    return{
        type:GET_SHOP_FAILED,
        error
    }
}



export const getCategoriesStart=()=>{
    return{
        type:GET_CATEGORIES_START
    }
}

export const getCategoriesSuccess=(categories)=>{
    return{
        type:GET_CATEGORIES_SUCCESS,
        categories
    }
}

export const getCategoriesFailed=(error)=>{
    return{
        type:GET_CATEGORIES_FAILED,
        error
    }
}



export const submitOrdersStart=()=>{
    return{
        type:SUBMIT_ORDERS_START
    }
}

export const submitOrdersSuccess=(successMessage)=>{
    return{
        type:SUBMIT_ORDERS_SUCCESS,
        successMessage
    }
}

export const submitOrdersFailed=(error)=>{
    return{
        type:SUBMIT_ORDERS_FAILED,
        error
    }
}



export const getOrdersStart=()=>{
    return{
        type:GET_ORDERS_START
    }
}

export const getOrdersSuccess=(orders)=>{
    return{
        type:GET_ORDERS_SUCCESS,
        orders
    }
}

export const getOrdersFailed=(error)=>{
    return{
        type:GET_ORDERS_FAILED,
        error
    }
}




export const getSingleOrderStart=()=>{
    return{
        type:GET_SINGLE_ORDER_START
    }
}

export const getSingleOrderSuccess=(order)=>{
    return{
        type:GET_SINGLE_ORDER_SUCCESS,
        order
    }
}

export const getSingleOrderFailed=(error)=>{
    return{
        type:GET_SINGLE_ORDER_FAILED,
        error
    }
}



export const getBrandsStart=()=>{
    return{
        type:GET_BRANDS_START
    }
}

export const getBrandsSuccess=(brands)=>{
    return{
        type:GET_BRANDS_SUCCESS,
        brands
    }
}

export const getBrandsFailed=(error)=>{
    return{
        type:GET_BRANDS_FAILED,
        error
    }
}




export const getCartStart=()=>{
    return{
        type:GET_CART_START
    }
}

export const getCartSuccess=(products)=>{
    return{
        type:GET_CART_SUCCESS,
        products
    }
}

export const getCartFailed=(error)=>{
    return{
        type:GET_CART_FAILED,
        error
    }
}






export const getSingleProductStart=()=>{
    return{
        type:GET_SINGLE_PRODUCT_START
    }
}

export const getSingleProductSuccess=(product)=>{
    return{
        type:GET_SINGLE_PRODUCT_SUCCESS,
        product
    }
}

export const getSingleProductFailed=(error)=>{
    return{
        type:GET_SINGLE_PRODUCT_FAILED,
        error
    }
}



export const deleteFromCartStart=()=>{
    return{
        type:DELETE_FROM_CART_START
    }
}

export const deleteFromCartSuccess=(successMessage)=>{
    return{
        type:DELETE_FROM_CART_SUCCESS,
        successMessage
    }
}

export const deleteFromCartFailed=(error)=>{
    return{
        type:DELETE_FROM_CART_FAILED,
        error
    }
}





export const updateQuantityStart=()=>{
    return{
        type:UPDATE_QUANTITY_START
    }
}

export const updateQuantitySuccess=()=>{
    return{
        type:UPDATE_QUANTITY_SUCCESS,
        
    }
}

export const updateQuantityFailed=(error)=>{
    return{
        type:UPDATE_QUANTITY_FAILED,
        error
    }
}









export const getLastAdded=()=>{
    return dispatch=>{
        dispatch(getLastAddedStart())
        axios.get('http://127.0.0.1:8000/products/products-home-list/')
        .then(res=>{
            dispatch(getLastAddedSuccess(res.data))
        }).catch(err=>{
            dispatch(getLastAddedFailed(err))
        })
    }
}




export const getShop=(page,name,category,brand,min,max)=>{
    return dispatch=>{
        dispatch(getShopStart())
        if(name){
            if(page){
                axios.get(`http://127.0.0.1:8000/products/products-shop-list/?name=${name}&page=${page}`,{headers:{'category':category,'brand':brand,'min':min,'max':max}})
                .then(res=>{
                    const products=res.data.results
                    const count=res.data.count+1
                    dispatch(getShopSuccess(products,count))
                }).catch(err=>{
                    dispatch(getShopFailed(err))
                })
            }else{
                axios.get(`http://127.0.0.1:8000/products/products-shop-list/?name=${name}&page=${1}`,{headers:{'category':category,'brand':brand,'min':min,'max':max}})
                .then(res=>{
                    const categories=[]
                    const features=[]
                    const products=res.data.results
                    const count=res.data.count+1
                    for (var i in res.data){
                        categories.push(i.category)
                    }
                    console.log(categories);
                    dispatch(getShopSuccess(products,count))
                }).catch(err=>{
                    dispatch(getShopFailed(err))
                })
            }
        }else{
        if(page){
        axios.get(`http://127.0.0.1:8000/products/products-shop-list/?page=${page}`,{headers:{'category':category,'brand':brand,'min':min,'max':max}})
        .then(res=>{
            const products=res.data.results
            const count=res.data.count+1
            dispatch(getShopSuccess(products,count))
        }).catch(err=>{
            dispatch(getShopFailed(err))
        })
    }else{

        axios.get(`http://127.0.0.1:8000/products/products-shop-list/?page=${1}`,{headers:{'category':category,'brand':brand,'min':min,'max':max}})
        .then(res=>{
            const categories=[]
            const features=[]
            const brands=[]
            const products=res.data.results
            const count=res.data.count+1
            products.map(prod=>{
                if(!categories.find(cat=>cat===prod.category)){
                    categories.push(prod.category)
                }
            })
            products.map(prod=>{
                console.log(prod.brand);
                if(!brands.find(brand=>brand===prod.brand)){
                    brands.push(prod.brand)
                }
            })
          
            dispatch(getShopSuccess(products,count))
        }).catch(err=>{
            dispatch(getShopFailed(err))
        })
    }
    }
}
}


export const getcartcount=(token)=>{
    return dispatch=>{
       
        axios.get('http://127.0.0.1:8000/orders/getcartcount/',{headers:{'token':token}})
        .then(res=>{
            dispatch(getCartCount(res.data))
        })
    }
}


export const getpoints=(token)=>{
    return dispatch=>{
       
        axios.get('http://127.0.0.1:8000/users/getuserpoints/',{headers:{'token':token}})
        .then(res=>{
            dispatch(getPoints(res.data))
        })
    }
}





export const addToCart=(id,token,feats)=>{
    console.log('feats',feats);
    return dispatch=>{
        dispatch(addToCartStart())
        axios.post('http://127.0.0.1:8000/orders/addtocart/',{id:id,token:token,feats:feats})
        .then(res=>{
            const message='added to the cart'
            dispatch(addToCartSuccess(res.data.message))
            dispatch(getcartcount(token))
        }).catch(err=>{
            dispatch(addToCartFailed(err.response.data.message))
        })
    }
}



export const getCart=(token)=>{
    return dispatch=>{
        dispatch(getCartStart())
        dispatch(getcartcount(token))
        dispatch(authCheck())
        axios.get('http://127.0.0.1:8000/orders/cart/',{headers:{'token':token}})
        .then(res=>{
            dispatch(getCartSuccess(res.data))
            
        }).catch(err=>{
            dispatch(getCartFailed(err))
        })
    }
}



export const deleteFromCart=(id,token)=>{
    return dispatch=>{
        dispatch(deleteFromCartStart())
        axios.delete(`http://127.0.0.1:8000/orders/deletefromcart/${id}/`,{authorization:`token ${token}`})
        .then(res=>{
            dispatch(deleteFromCartSuccess(res.data))
            dispatch(getCart(token))
            dispatch(getcartcount(token))
        }).catch(err=>{
            dispatch(deleteFromCartFailed(err))
        })
    }
}



export const updateQuantity=(id,token,quantity)=>{
    return dispatch=>{
        dispatch(updateQuantityStart())
        axios.post('http://127.0.0.1:8000/orders/orderdetailsquantity/',{'token': token,'id':id,'quantity':quantity})
        .then(res=>{
            dispatch(updateQuantitySuccess(res.data))
            dispatch(getCart(token))
        }).catch(err=>{
            dispatch(updateQuantityFailed(err))
        })
    }
}



export const getSingleProduct=(id)=>{
    return dispatch=>{
        dispatch(getSingleProductStart())
        axios.get(`http://127.0.0.1:8000/products/single/${id}/`)
        .then(res=>{
            dispatch(getSingleProductSuccess(res.data))
        }).catch(err=>{
            dispatch(getSingleProductFailed(err))
        })
    }
}



export const getBrands=()=>{
    return dispatch=>{
        dispatch(getBrandsStart())
        axios.get('http://127.0.0.1:8000/products/brands/')
        .then(res=>{
            dispatch(getBrandsSuccess(res.data))
        }).catch(err=>{
            dispatch(getBrandsFailed(err))
        })
    }
}


export const getCategories=()=>{
    return dispatch=>{
        dispatch(getCategoriesStart())
        axios.get('http://127.0.0.1:8000/products/category/')
        .then(res=>{
            dispatch(getCategoriesSuccess(res.data))
        }).catch(err=>{
            dispatch(getCategoriesFailed(err))
        })
    }
}

export const submitOrders=(token,order_id,points)=>{
    return dispatch=>{
        dispatch(submitOrdersStart())
        axios.post('http://127.0.0.1:8000/orders/checkout/',{token:token,order_id:order_id,points:points})
        .then(res=>{
            const mess='Your Order Was Submitted Successfully'
            dispatch(submitOrdersSuccess(mess))
        }).catch(err=>{
            dispatch(submitOrdersFailed(err))
        })
    }
}



export const getOrders=(token)=>{
    return dispatch=>{
        dispatch(getOrdersStart())
        axios.get('http://127.0.0.1:8000/orders/orderslist/',{headers:{'token':token}})
        .then(res=>{
            dispatch(getOrdersSuccess(res.data))
        }).catch(err=>{
            dispatch(getOrdersFailed(err))
        })
    }
}

export const getSingleOrder=(id)=>{
    return dispatch=>{
        dispatch(getSingleOrderStart())
        axios.get(`http://127.0.0.1:8000/orders/singleorder/${id}/`)
        .then(res=>{
            dispatch(getSingleOrderSuccess(res.data))
        }).catch(err=>{
            dispatch(getSingleProductFailed(err))
        })
    }
}



export const gettopproducts=(token)=>{
    return dispatch=>{
        axios.get('http://127.0.0.1:8000/orders/topuserproducts/',{headers:{'token':token}})
        .then(res=>{
            dispatch(getTopProducts(res.data))
        })
    }
}



export const setdelivered=(id)=>{
    return dispatch=>{
        axios.post('http://127.0.0.1:8000/orders/delivered/',{'id':id})
        .then(res=>{
            const message ='order state was changed thank you'
            dispatch(setDelivered(message))
            dispatch(getSingleOrder(id))

        })
    }
}