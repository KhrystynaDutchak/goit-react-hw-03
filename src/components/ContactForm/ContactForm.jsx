import css from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

export default function ContactForm({ onSubmit }) {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name must not exceed 50 characters')
            .required('Name is required'),
        number: Yup.string()
            .matches(/^[0-9]+$/, 'Number must contain only digits')
            .min(3, 'Number must be at least 3 characters')
            .max(50, 'Number must not exceed 50 characters')
            .required('Number is required'),
    });
    
    const handleSubmit = (values, { resetForm }) => {
        const newContact = {
            id: nanoid(),
            name: values.name,
            number: values.number
        };
        onSubmit(newContact);
        resetForm();
    };

    return (
        <Formik
            initialValues={{ name: '', number: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form className={css.form}>
                    <Field type="text" name="name" placeholder="Name" className="input"/>
                    <ErrorMessage name="name" component="div" />

                    <Field type="text" name="number" placeholder="Number" className="input"/>
                    <ErrorMessage name="number" component="div" />

                    <button type="submit" className={css.button}>Add Contact</button>
                </Form>
            )}
        </Formik>
    );
}
