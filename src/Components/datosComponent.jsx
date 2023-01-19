import React from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdbreact';
import { useState, useEffect } from 'react';
import axios from 'axios';



const DatosComponent = () => {

    const API = 'http://127.0.0.1:3000/';

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        axios.get(API)
            .then((response) => {
                setDatos(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const _id = datos.map((datos) => {
        return datos._id;
    });

    const codigo_postal = datos.map((datos) => {
        return datos.codigo_postal;
    });

    const municipio_nombre = datos.map((datos) => {
        return datos.municipio_nombre;
    });

    const municipio_id = datos.map((datos) => {
        return datos.municipio_id;
    });

    return (
        <MDBTable align='middle'>
            <MDBTableHead className='table-dark'>
                <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Nombre</th>
                    <th scope='col'>Documento</th>
                    <th scope='col'>Acciones</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {datos.map((data, index) => (
                    <tr key={index}>
                        <td>{data._id}</td>
                        <td>{data.codigo_postal}</td>
                        
                        <td>{data.municipio_id}</td>
                        <td>
                            <MDBBtn color='link' rounded size='sm'>
                                <MDBIcon fas icon="pen" />
                                Editar
                            </MDBBtn>
                            <MDBBtn color='link' rounded size='sm'>
                                <MDBIcon fas icon="trash" />
                                Borrar
                            </MDBBtn>
                        </td>
                    </tr>
                ))}
            </MDBTableBody>
        </MDBTable>
    );
}

export default DatosComponent;

