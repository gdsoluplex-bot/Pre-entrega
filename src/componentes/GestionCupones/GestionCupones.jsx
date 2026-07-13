import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "firebase/firestore";

const estadoInicial = {
    codigo: "",
    descuento: ""
};

const GestionCupones = () => {

    const [datosForm, setDatosForm] = useState(estadoInicial);
    const [cupones, setCupones] = useState([]);
    const [cuponAEditar, setCuponAEditar] = useState(null);

    // Obtener cupones (READ)
    const obtenerCupones = async () => {

        const respuesta = await getDocs(collection(db, "cupones"));

        const lista = respuesta.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setCupones(lista);
    };

    useEffect(() => {
        obtenerCupones();
    }, []);


    // Manejo de los cambios en el formulario
    const manejarCambio = (e) => {

        setDatosForm({
            ...datosForm,
            [e.target.name]: e.target.value
        });

    };

    // Crear o editar un cupón (CREATE o UPDATE)
    const manejarEnvio = async (e) => {

        e.preventDefault();

        if (!datosForm.codigo || !datosForm.descuento) {
            alert("Complete todos los campos");
            return;
        }

        if (cuponAEditar) {

            await updateDoc(
                doc(db, "cupones", cuponAEditar.id),
                {
                    codigo: datosForm.codigo,
                    descuento: Number(datosForm.descuento)
                }
            );

        } else {

            await addDoc(
                collection(db, "cupones"),
                {
                    codigo: datosForm.codigo,
                    descuento: Number(datosForm.descuento)
                }
            );

        }

        setDatosForm(estadoInicial);
        setCuponAEditar(null);

        obtenerCupones();

    };

    // Manejar Editar un cupón 
    const editarCupon = (cupon) => {

        setCuponAEditar(cupon);

        setDatosForm({
            codigo: cupon.codigo,
            descuento: cupon.descuento
        });

    };

    // Eliminar un cupón (DELETE)
    const eliminarCupon = async (id) => {

        await deleteDoc(doc(db, "cupones", id));

        if (cuponAEditar?.id === id) {
            setCuponAEditar(null);
            setDatosForm(estadoInicial);
        }

        obtenerCupones();

    };

    // Cancelar edición
    const cancelarEdicion = () => {
        setCuponAEditar(null);
        setDatosForm(estadoInicial);
    };

    return (
        <div>

            <h2>Gestión de Cupones</h2>

            <form onSubmit={manejarEnvio}>

                <input
                    type="text"
                    name="codigo"
                    placeholder="Código"
                    value={datosForm.codigo}
                    onChange={manejarCambio}
                />

                <input
                    type="number"
                    name="descuento"
                    placeholder="Descuento"
                    value={datosForm.descuento}
                    onChange={manejarCambio}
                />

                <button type="submit">
                    {cuponAEditar ? "Actualizar Cupón" : "Crear Cupón"}
                </button>

                {
                    cuponAEditar &&
                    <button
                        type="button"
                        onClick={cancelarEdicion}
                    >
                        Cancelar
                    </button>
                }

            </form>

            <hr />

            <h3>Listado</h3>

            {
                cupones.map((cupon) => (

                    <div
                        key={cupon.id}
                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            marginBottom: "10px"
                        }}
                    >
                        <p><strong>Código:</strong> {cupon.codigo}</p>

                        <p><strong>Descuento:</strong> {cupon.descuento}%</p>

                        <button
                            onClick={() => editarCupon(cupon)}
                        >
                            Editar
                        </button>

                        <button
                            onClick={() => eliminarCupon(cupon.id)}
                        >
                            Eliminar
                        </button>

                    </div>

                ))
            }

        </div>
    );
};

export default GestionCupones;