import { cookies } from "next/headers";
import { Product, products } from '../../../products/data/products';
import { ItemCard } from "@/shopping-cart/components/ItemCart";
import { WidgetItem } from '../../../components/WidgetItem';


export const metadata = {
 title: 'Carrito de compras',
 description: 'Carrito de compras',
};

interface ProductInCart {
    product:Product,
    quantify:number
}

const getProductsCart = (cart:{[id:string]:number})=>{

    const productInCart:ProductInCart[]=[]
    
    for(const id of Object.keys(cart)){
        const product = products.find(prod=> prod.id === id)
        if(product){
            productInCart.push({product:product,quantify:cart[id]})  
         }
    }
     return productInCart
}

export default function CartPage() {
    const cookieStore = cookies()
    const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}") as {[id:string]:number}
    const productInCart = getProductsCart(cart)
    const totalTopay = productInCart.reduce((prev,current)=>(current.product.price *current.quantify)+prev,0)
  return (
    <div>
        <h1 className='text-5xl'>Productos en el carrito</h1>
        <hr className='mb-2' />
        <div className='flex felx-col sm:flex-row gap-2 w-full'>
            <div className="flex flex-col gap-2 w-full sm:w-8/12">
                {
                    productInCart.map( ({product,quantify}) =>(
                        <ItemCard key={product.id} product={product} quantity={quantify} />
                    ))
                }
            </div>
            <div className="flex flex-col w-full sm:w-4/12">
                <WidgetItem title="Total a pagar">
                    <div className="mt-2 flex justify-center gap-4">
                        <h3 className="text-3xl font-bold text-gray-700">{(totalTopay*1.15).toFixed(2)}</h3>
                    </div>
                    <span className="font-bold text-center text-gray-500 ">Impuesto del 15%:{(totalTopay * 0.15).toFixed(2)}</span>
                </WidgetItem>
            </div>
        </div>
    </div>
  )
}
