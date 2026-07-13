import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Cart = () => {

    const { cart, clearCart, getCartTotal } = useCart();

    console.log(cart);
    
    if (cart.length === 0) {
        return (
            <div>
                <h1>El carrito está vacío</h1>
                <p>Agrega productos para continuar la compra.</p>
                <Link to="/servicios"> Ver Servicios </Link>
            </div>
        );
    }

    return (
        <div> <h1>Carrito de Compras</h1> 
        {cart.map(item => (
            <div key={item.id} className="cart-item"> 
            <h4>{item.nombre}</h4> 
            <p>Cantidad: {item.quantity}</p> 
            <p>Precio unitario: $ {item.precio}</p> 
            <p>Subtotal: $ {item.precio * item.quantity}</p> 
            </div>
        ))} 
        <hr /> 
        <h3>Total a pagar: $ {getCartTotal()}</h3> 
        <button onClick={clearCart}>Vaciar Carrito</button> 

        <Link to="/" onClick={()=>{
            alert("Gracias por comprar");
            clearCart();
        }}
        > 
        Finalizar Compra 
        </Link>
    </div>);
};

export default Cart;