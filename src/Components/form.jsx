
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import "./form.css"

const formSchema = yup.object().shape({
    nombre: yup.string().required(),
    apellido1: yup.string().required(),
    apellido2: yup.string(),
    documento: yup.string(),
    localidad: yup.string().required(),
    phone: yup.string().required().matches(/^[0-9]{9}$/, 'Teléfono no válido')
});

const Formulario = () => {
    return (
        <Formik
            initialValues={{
                nombre: '',
                apellido1: '',
                apellido2: '',
                documento: '',
                municipio_nombre: '',
                cp: '',
                phone: ''
            }}
            validationSchema={formSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    // retrieve postal code from MongoDB
                    const res = await axios.get(`http://127.0.0.1:3000/postalcode/${values.municipio_nombre}`);
                    const cp = res.data;

                                        // save form data to MongoDB
                                        const data = {
                                            nombre: values.nombre,
                                            apellido1: values.apellido1,
                                            apellido2: values.apellido2,
                                            documento: values.documento,
                                            localidad: values.municipio_nombre,
                                            cp: cp,
                                            phone: values.phone
                                        };
                    
                                        await axios.post('http://127.0.0.1:3000/formdata', data);
                                        alert("Form data has been saved to MongoDB.");
                                        
                    
                                    } catch (err) {
                                        console.error(err);
                                    } finally {
                                        setSubmitting(false);
                                    }
                                }}
                            >
                                {({ errors, touched, isSubmitting }) => (
                                    <Form className='form'>
                                        <label>
                                            Nombre:
                                            <Field className='form-input' type="text" name="nombre" />
                                            {errors.nombre && touched.nombre && <p className="error">{errors.nombre}</p>}
                                        </label>
                                        <label>
                                            Apellido1:
                                            <Field className='form-input' type="text" name="apellido1" />
                                            {errors.apellido1 && touched.apellido1 && <p className="error">{errors.apellido1}</p>}
                                        </label>
                                        <label>
                                            Apellido2:
                                            <Field className='form-input' type="text" name="apellido2" />
                                            {errors.apellido2 && touched.apellido2 && <p className="error">{errors.apellido2}</p>}
                                        </label>
                                        <label>
                                            Documento:
                                            <Field className='form-input' type="text" name="documento" />
                                            {errors.documento && touched.documento && <p className="error">{errors.documento}</p>}
                                        </label>
                                        <label>
                        Localidad:
                        <Field className='form-input' type="text" name="localidad" />
                        {errors.municipio_nombre && touched.municipio_nombre && <p className="error">{errors.municipio_nombre}</p>}
                    </label>
                    <label>
                        Teléfono:
                        <Field className='form-input' type="text" name="phone" />
                        {errors.phone && touched.phone && <p className="error">{errors.phone}</p>}
                    </label>
                    <label>
                        Código Postal:
                        <Field className='form-input' type="text" name="cp" disabled />
                    </label>
                    <button className='form-button' type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default Formulario;
                    
