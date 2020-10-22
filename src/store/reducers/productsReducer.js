import * as productsActions from "../actions/productsActions";

const updateObject=(state,newState)=>{
    return{
        ...state,
        ...newState
    }
}


const initialState = {
  products: [],
  orders:[],
  order:{},
  cart:[],
  product:{},
  topProducts:{},
  count:0,
  categories:[],
  brands:[],
  error: null,
  loading: false,
  singleLoad:false,
  successMessage:null,
  success:null,
  cartcount:0,
  points:0,
  ord_points:0

};


const setPoints = (state, action) => {
    return updateObject(state, {
      ord_points: action.points,
      loading: false
    });
  };

  
const setDelivered = (state, action) => {
    return updateObject(state, {
    success: action.message,
      loading: false
    });
  };
  
  

export const getLastAddedStart=(state,action)=>{
    return updateObject(state,{
        loading:true,
        error:null,
        count:0,
        success:null,

        successMessage:null,

    })
}



export const getLastAddedSuccess=(state,action)=>{
    return updateObject(state,{
        products:action.products,
        loading:false,
        count:0,
        successMessage:null,
        success:null,

        error:null
    })
}



export const getLastAddedFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,       
        count:0,
        successMessage:null,
        success:null,

        error:action.error
    })
}



export const getPoints=(state,action)=>{
    return updateObject(state,{
        points:action.points,
        error:null
    })
}




export const getShopStart=(state,action)=>{
    return updateObject(state,{
        loading:true,
        count:0,
        successMessage:null,
        success:null,

        error:null
    })
}



export const getShopSuccess=(state,action)=>{
    return updateObject(state,{
        products:action.products,
        loading:false,
        count:action.count,
        successMessage:null,
        success:null,

        error:null
    })
}



export const getShopFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:action.error,
        successMessage:null,
        success:null,

    })
}



export const getTopProducts=(state,action)=>{
    return updateObject(state,{
        topProducts:action.products,
        count:0,
        success:null,

        error:null
    })
}



export const getOrdersStart=(state,action)=>{
    return updateObject(state,{
        loading:true,
        count:0,
        success:null,
        error:null
    })
}
export const getOrdersSuccess=(state,action)=>{
    return updateObject(state,{
        orders:action.orders,
        loading:false,
        error:null
    })
}
export const getOrdersFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:action.error,
        successMessage:null,

    })
}






export const getCategoriesStart=(state,action)=>{
    return updateObject(state,{
        loading:true,
        count:0,
        successMessage:null,
        error:null
    })
}
export const getCategoriesSuccess=(state,action)=>{
    return updateObject(state,{
        categories:action.categories,
        successMessage:null,

        error:null
    })
}
export const getCategoriesFailed=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        successMessage:null,

    })
}


export const getBrandsStart=(state,action)=>{
    return updateObject(state,{
        loading:true,
        count:0,
        successMessage:null,
        error:null
    })
}



export const getBrandsSuccess=(state,action)=>{
    return updateObject(state,{
        brands:action.brands,
        successMessage:null,
        error:null
    })
}



export const getBrandsFailed=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        successMessage:null,

    })
}





export const getCartCount=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        cartcount:action.count,

    })
}



export const addToCartStart=(state,action)=>{
  return updateObject(state,{
        loading:true,
        error:null,
        successMessage:null,

    })
}

export const addToCartSuccess=(state,action)=>{
    return updateObject(state,{
        loading:false,
        successMessage:action.successMessage,

    })
}

export const addToCartFailed=(state,action)=>{
   return updateObject(state,{
        loading:false,
        error:action.error,
        successMessage:null,
    })
}







export const getCartStart=(state,action)=>{
    return updateObject(state,{
        loading:true,
        count:0,
        successMessage:null,
        error:null
    })
}



export const getCartSuccess=(state,action)=>{
    return updateObject(state,{
        loading:false,
        successMessage:null,
        cart:action.products,
        error:null
    })
}


export const getCartFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:action.error,
        cart:[],
        successMessage:null,
    })
}





export const deleteFromCartStart=(state,action)=>{
    return updateObject(state,{
        count:0,
        successMessage:null,
        error:null
    })
}



export const deleteFromCartSuccess=(state,action)=>{
    return updateObject(state,{
        loading:false,
        successMessage:action.successMessage,
        error:null
    })
}


export const deleteFromCartFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:action.error,
        successMessage:null,
    })
}



export const updateQuantityStart=(state,action)=>{
    return updateObject(state,{
        count:0,
        successMessage:null,
        error:null
    })
}



export const updateQuantitySuccess=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:null
    })
}


export const updateQuantityFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:action.error,
        successMessage:null,
    })
}



export const getSingleProductStart=(state,action)=>{
    return updateObject(state,{
        singleLoad:true,
        count:0,
        successMessage:null,
        error:null
    })
}



export const getSingleProductSuccess=(state,action)=>{
    return updateObject(state,{
        singleLoad:false,
        successMessage:null,
        product:action.product,
        error:null
    })
}


export const getSingleProductFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:action.error,
        successMessage:null,
    })
}




export const getSingleOrderStart=(state,action)=>{
    return updateObject(state,{
        loading:true,
        count:0,
        successMessage:null,
        error:null
    })
}
export const getSingleOrderSuccess=(state,action)=>{
    return updateObject(state,{
        loading:false,
        order:action.order,
        error:null
    })
}
export const getSingleOrderFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:action.error,
        successMessage:null,
    })
}






export const submitOrdersStart=(state,action)=>{
    return updateObject(state,{
        loading:true,
        successMessage:null,
        error:null
    })
}



export const submitOrdersSuccess=(state,action)=>{
    return updateObject(state,{
        loading:false,
        successMessage:action.successMessage,
        error:null,
        ord_points:0
    })
}


export const submitOrdersFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:action.error,
        successMessage:null,
    })
}



const ProductsReducer=(state=initialState,action)=>{
    switch (action.type) {
        case productsActions.GET_LAST_ADDED_START: return getLastAddedStart(state,action)
        case productsActions.GET_LAST_ADDED_SUCCESS: return getLastAddedSuccess(state,action)
        case productsActions.GET_LAST_ADDED_FAILED: return getLastAddedFailed(state,action)
        case productsActions.GET_SHOP_START: return getShopStart(state,action)
        case productsActions.GET_SHOP_SUCCESS: return getShopSuccess(state,action)
        case productsActions.GET_SHOP_FAILED: return getShopFailed(state,action)
        case productsActions.GET_CART_COUNT: return getCartCount(state,action)
        case productsActions.ADD_TO_CART_START: return addToCartStart(state,action)
        case productsActions.ADD_TO_CART_SUCCESS: return addToCartSuccess(state,action)
        case productsActions.ADD_TO_CART_FAILED: return addToCartFailed(state,action)
        case productsActions.GET_CART_START: return getCartStart(state,action)
        case productsActions.GET_CART_SUCCESS: return getCartSuccess(state,action)
        case productsActions.GET_CART_FAILED: return getCartFailed(state,action)
        case productsActions.DELETE_FROM_CART_START: return deleteFromCartStart(state,action)
        case productsActions.DELETE_FROM_CART_SUCCESS: return deleteFromCartSuccess(state,action)
        case productsActions.DELETE_FROM_CART_FAILED: return deleteFromCartFailed(state,action)
        case productsActions.UPDATE_QUANTITY_START: return updateQuantityStart(state,action)
        case productsActions.UPDATE_QUANTITY_SUCCESS: return updateQuantitySuccess(state,action)
        case productsActions.UPDATE_QUANTITY_FAILED: return updateQuantityFailed(state,action)
        case productsActions.GET_SINGLE_PRODUCT_START: return getSingleProductStart(state,action)
        case productsActions.GET_SINGLE_PRODUCT_SUCCESS: return getSingleProductSuccess(state,action)
        case productsActions.GET_SINGLE_PRODUCT_FAILED: return getSingleProductFailed(state,action)
        case productsActions.GET_CATEGORIES_START: return getCategoriesStart(state,action)
        case productsActions.GET_CATEGORIES_SUCCESS: return getCategoriesSuccess(state,action)
        case productsActions.GET_CATEGORIES_FAILED: return getCategoriesFailed(state,action)
        case productsActions.GET_BRANDS_START: return getBrandsStart(state,action)
        case productsActions.GET_BRANDS_SUCCESS: return getBrandsSuccess(state,action)
        case productsActions.GET_BRANDS_FAILED: return getBrandsFailed(state,action)
        case productsActions.SUBMIT_ORDERS_START: return submitOrdersStart(state,action)
        case productsActions.SUBMIT_ORDERS_SUCCESS: return submitOrdersSuccess(state,action)
        case productsActions.SUBMIT_ORDERS_FAILED: return submitOrdersFailed(state,action)
        case productsActions.GET_POINTS: return getPoints(state,action)
        case productsActions.GET_ORDERS_START: return getOrdersStart(state,action)
        case productsActions.GET_ORDERS_SUCCESS: return getOrdersSuccess(state,action)
        case productsActions.GET_ORDERS_FAILED: return getOrdersFailed(state,action)
        case productsActions.GET_SINGLE_ORDER_START: return getSingleOrderStart(state,action)
        case productsActions.GET_SINGLE_ORDER_SUCCESS: return getSingleOrderSuccess(state,action)
        case productsActions.GET_SINGLE_ORDER_FAILED: return getSingleOrderFailed(state,action)
        case productsActions.GET_TOP_PRODUCTS: return getTopProducts(state,action)
        case productsActions.SET_ORDER_POINTS: return setPoints(state,action)
        case productsActions.SET_DELIVERED: return setDelivered(state,action)


        default:
            return state;
    }
}


export default ProductsReducer;