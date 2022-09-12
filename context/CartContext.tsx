import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import prisma from '../lib/prisma';


interface CartItem extends IProduct {
    quantity?: number;
    
}

type ShoppingCartContext = {

  getItemQuantity?: (id: number) => number
  increaseCartQuantity?: (id: number) => void
  decreaseCartQuantity?: (id: number) => void
  removeFromCart?: (id: number) => void
  cartQuantity?: number
  items?: CartItem[]
  setCartItems?: (item: any) => void
  onAdd?: (product: IProduct, quantity: number) => void
  totalQuantity: number
  
}

const Context = createContext({} as ShoppingCartContext)

export function CartContext  ({children} :{children: ReactNode}) {

    const [items, setItems] = useState<CartItem[]>([])
    const [totalQuantity, setTotalQuantity] = useState<number>(0)


    const onAdd = (product: IProduct, q: number) => {

        if(items.length === 0) {
            setItems([...items, {...product, quantity: q}])
            toast.success(`${product.title} added to cart successfully`)
            setTotalQuantity(prv => prv+q)
        }

        if(items.length > 0) {
            const findProduct = items.find(item => item.id === product.id)


            if (findProduct){
                const updatedProduct = items.map(item => {
                    if(item.id === findProduct.id){
                        setTotalQuantity(prv => prv + q)
                        toast.success(`${item.title} added to cart successfully`)
                        return {...item, quantity: item.quantity! + q }
                    }
                    return item
                })
                setItems(updatedProduct)
                // console.log('found')
            }else{
                setTotalQuantity(prv => prv + q)
                toast.success(`${product.title} added to cart successfully`)
                setItems([...items, {...product, quantity: q}])
            }
        }






        
    }
    console.log(items)
    
    const cartItems = () => items


    return(
        <>
        <Context.Provider value={{
            onAdd,
            items,
            totalQuantity
        }}>
            {children}
        </Context.Provider>
        </>
    )
}
export function useCartContext (){
    return useContext(Context)
}  