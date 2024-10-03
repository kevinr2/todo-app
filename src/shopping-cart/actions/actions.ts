import { getCookie, hasCookie, setCookie } from "cookies-next"

export const getCookieCart = ():{ [id:string]:number} =>{
    if(hasCookie("cart")){
        const cookiesCart = JSON.parse(  getCookie('cart') as string ?? '{}');
        return cookiesCart;
    }
    return{}
}

export const addProductToCart = (id:string)=>{

    const cookieCart = getCookieCart()
    if(cookieCart[id]){
        cookieCart[id]= cookieCart[id] + 1
    }else{
        cookieCart[id]= 1
    }
    setCookie("cart", JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id:string)=>{

    const cookiesCart = getCookieCart()
    delete cookiesCart[id]
    setCookie("cart", JSON.stringify(cookiesCart))
}

export const removeSingleItemFromCart = (id:string)=>{
    const cookieCart = getCookieCart()
    if(!cookieCart[id])return

    const itemInCart = cookieCart[id]-1
    if(itemInCart <=0){
        delete cookieCart[id]
    }else{
        cookieCart[id]= itemInCart
    }

   setCookie("cart", JSON.stringify(cookieCart))
}