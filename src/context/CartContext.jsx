import { useState, useContext, createContext } from 'react';
export const CartContext = createContext();

//custom hook - hook personalizado
//Consumidor
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        const itemInCart = cart.find(item => item.id === product.id);
        if (itemInCart) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
    };

    const clearCart = () => {
        setCart([]);
    };
    //total de productos
    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0); //acc es acumulador
    };

    //Precio total
    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    };

    //cantidad de un producto especifico
    const getCantidadActual = (productId) => { 
        const item = cart.find(item => item.id === productId); 
        return item ? item.quantity : 0; 
    };

    return (
        <CartContext.Provider 
            value={{ 
                cart, 
                addToCart, 
                clearCart, 
                getCartQuantity, 
                getCartTotal,
                getCantidadActual 
            }}>
            {children}
        </CartContext.Provider>
    );
};