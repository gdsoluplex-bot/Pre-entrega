import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useState, useEffect } from 'react';

const ServiciosDb = () => {
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        const serviDB = collection(db, "servicios"); 
        getDocs(serviDB).then((resp) => { 
            setServicios(resp.docs.map((doc) => { 
                return { ...doc.data(), id: doc.id } 
            })
        ); 
    })
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez

        return (
            <div>
                <h2>Servicios Db</h2>
                <div>
                 {servicios.map(serv => ( 
                    <div key={serv.id} > 
                        <img src={serv.poster} alt={serv.titulo} style={{ width: '100px' }} /> 
                        <h3>{serv.titulo}</h3> 
                        <p>Rama: {serv.rubro}</p> 
                        <p>Precio: ${serv.costo}</p> 
                        <p>Stock: {serv.stock} unidades</p> 
                        <hr /> 
                    </div> 
                 ))} 
                </div>
            </div>
        );
    };

export default ServiciosDb;