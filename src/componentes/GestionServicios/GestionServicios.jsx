// src/componentes/Gestion/Gestion.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc,addDoc, updateDoc, doc } from "firebase/firestore";
import ServicioForm from '../ServicioForm/ServicioForm.jsx';

const GestionServicios = () => {
    const [servicios, setServicios] = useState([]);

    const estadoInicialForm = {
        id: "",
        titulo: "",
        rubro: "",
        destacado: false,
        duracion: "",
        costo: 0,
        stock: 0,
        poster: "",
        descripcion: ""
    };

    const [servicioData, setServicioData] = useState(estadoInicialForm);

    const [posterFile, setPosterFile] = useState(null);

    const [loading, setLoading] = useState(false);

    // Manejar cambios de inputs

    const handleChange = (event) => {

    const { name, value, type, checked } = event.target;

    console.log(name, value);

    setServicioData({
        ...servicioData,
        [name]:type==="checkbox" ?checked : value
    });
};


    // Manejar cambio de imagen
    const handlePosterChange = (event) => {

        setPosterFile(event.target.files[0]);
    };

    const cargarServicios = async () => {
        const serviciosRef = collection(db, "servicios");
        const resp = await getDocs(serviciosRef);
        setServicios(
            resp.docs.map((doc) => ({ ...doc.data(),idFirestore: doc.id }))
        );
    };

    useEffect(() => {
        cargarServicios();
    }, []);

    // borrar servicio
    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
        if (confirmacion) {
            const docRef = doc(db, "servicios", id);
            await deleteDoc(docRef); // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente. 
            setServicios(servicios.filter(serv => serv.idFirestore !== id));
            // Limpiar formulario
            setServicioData(estadoInicialForm);
            setPosterFile(null);
            setServicioAEditar(null);
            alert("Servicio eliminado.");
        }
    };

    // editar servicio
    const [servicioAEditar, setServicioAEditar] = useState(null);
    const manejarEditar = (servicio) => {
	    setServicioAEditar(servicio);
        setServicioData(servicio)
    };

    const modoEdicion = servicioAEditar !== null;

      // Manejar envío
      const handleSubmit = async (event) => {
    
        event.preventDefault();
    
        // Validación
    if (!posterFile && !servicioAEditar) {
          alert("Debes seleccionar una imagen del servicio");
          return;
    }
    
        setLoading(true);

        // Simulamos demora real
        await new Promise((resolve) =>
          setTimeout(resolve, 2000)
        );


        let urlImagen = servicioData.poster;

        try {

        if (posterFile) {
          console.log("Subiendo poster...");

        const apiKey = 'b617e85d9593f6611bf328914d16be64';
        const formData = new FormData();
        formData.append("image", posterFile);
    
        const respuestaImgbb = await fetch(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            {
              method: "POST",
              body: formData,
            }
          );
    
          const datoImgbb = await respuestaImgbb.json();
          console.log(datoImgbb);
        
          if (datoImgbb.success) {
            console.log("Imagen subida correctamente ",datoImgbb);
            urlImagen = datoImgbb.data.url;
          } else {
            throw new Error('La subida de la imagen fallo',datoImgbb);
          }
        }
         
          // Servicio completo
          const nuevoServicio = {
            ...servicioData,
            poster: urlImagen
          };
    
          // Simulación de envío a API
          console.log("Enviando servicio a Firebase:",
            nuevoServicio);
    
        const serviciosCollection = collection(db, "servicios");
       
        if (servicioAEditar){
            const docRef =doc(
                db,"servicios",servicioAEditar.idFirestore
            );
            await updateDoc(docRef, nuevoServicio);
        }
        else {
            await addDoc(serviciosCollection, nuevoServicio);
        }

        await cargarServicios();

        setServicioData(estadoInicialForm);
        setPosterFile(null);
        setServicioAEditar(null);

        // Reseteamos el formulario solo si todo fue exitoso 
          alert("Servicio enviado correctamente");
    
          // Limpiar formulario
          setServicioData({estadoInicialForm});
    
          setPosterFile(null);
    
        } catch (error) {
    
          console.error(error);
    
          alert("No se pudo subir el servicio");
    
        } finally {
    
          setLoading(false);
        }
      };

    return (
        <div>
            <h2>Gestión de Servicios</h2>
            <hr />
            <ServicioForm 
                servicioData={servicioData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handlePosterChange={handlePosterChange}
                loading={loading}
                modoEdicion={modoEdicion}
            />
            <hr />
            <h3>Lista de Servicios</h3>
            <ul>
                {servicios.map((serv) => (
                    <li key={serv.idFirestore}>
                        {serv.titulo} - $ {serv.costo}
                        {/*acá agregaremos los botones de acción */}
                        <button onClick={() => manejarEditar(serv)} style={{ marginLeft: '10px' }}>Editar</button>
                        <button onClick={() => handleDelete(serv.idFirestore)} style={{ marginLeft: '10px' }}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default GestionServicios;