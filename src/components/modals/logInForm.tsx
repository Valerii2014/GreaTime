import { Formik, Field, Form, ErrorMessage } from 'formik'

import * as Yup from 'yup'

interface logInFormInterface {
    password: string
    email: string
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Неверный формат электронной почты')
        .required('Обязательное поле'),
    password: Yup.string()
        .required('Обязательное поле')
        .min(2, 'Пароль должен содержать минимум 8 символов')
        .max(20, 'Пароль не должен минимум больше 20 символов'),
})

const initialValues = {
    email: '',
    password: '',
}

const onSubmit = (values: logInFormInterface) => {
    // Здесь можно выполнить дополнительные действия при отправке формы
    console.log(values)
}

const LogInForm = () => (
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
    >
        <Form className="modal_form">
            <div className="modal_form_input-wrapper">
                <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Ваш Email:"
                />
                <ErrorMessage
                    name="email"
                    component="div"
                    className="modal_form_error"
                />
            </div>

            <div className="modal_form_input-wrapper">
                <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Ваш пароль:"
                />
                <ErrorMessage
                    name="password"
                    component="div"
                    className="modal_form_error"
                />
            </div>

            <button type="submit" className="button button_modal">
                Войти
            </button>
        </Form>
    </Formik>
)

export default LogInForm
