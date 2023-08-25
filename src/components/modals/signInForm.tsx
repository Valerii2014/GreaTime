import { Formik, Field, Form, ErrorMessage, FieldProps } from 'formik'
import * as Yup from 'yup'
import MaskedInput from 'react-text-mask'

const phoneMask = [
    '+',
    '3',
    '8',
    ' ',
    '(',
    /[0-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
]

interface logInFormInterface {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    password: string
    passwordCheck: string
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Обязательное поле')
        .max(30, 'Имя не должно превышать 30 символов'),
    lastName: Yup.string()
        .required('Обязательное поле')
        .max(30, 'Фамилия не должна превышать 30 символов'),
    email: Yup.string()
        .email('Неверный формат электронной почты')
        .required('Обязательное поле'),
    phoneNumber: Yup.string()
        .matches(/^\+38 \(\d{3}\) \d{3} \d{4}$/, 'Неверный формат номера')
        .required('Обязательное поле'),

    password: Yup.string()
        .required('Обязательное поле')
        .min(8, 'Пароль должен содержать минимум 8 символов')
        .max(20, 'Пароль не должен превышать 20 символов'),
    passwordCheck: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Пароли должны совпадать')
        .required('Обязательное поле'),
})

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordCheck: '',
}

const onSubmit = (values: logInFormInterface) => {
    // Здесь можно выполнить дополнительные действия при отправке формы
    console.log(values)
}

const SignInForm = () => (
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
    >
        <Form className="modal_form">
            <div className="modal_form_input-wrapper">
                <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Введите ваше имя:"
                />
                <ErrorMessage
                    name="firstName"
                    component="div"
                    className="modal_form_error"
                />
            </div>{' '}
            <div className="modal_form_input-wrapper">
                <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Введите вашу фамилию:"
                />
                <ErrorMessage
                    name="lastName"
                    component="div"
                    className="modal_form_error"
                />
            </div>{' '}
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
                <Field name="phoneNumber">
                    {(props: FieldProps<any, any>) => (
                        <MaskedInput
                            {...props.field}
                            mask={phoneMask}
                            guide={false}
                            placeholderChar={'\u2000'}
                            placeholder="Телефон: +38 (___) ___ __ __"
                        />
                    )}
                </Field>
                <ErrorMessage
                    name="phoneNumber"
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
            <div className="modal_form_input-wrapper">
                <Field
                    type="password"
                    id="passwordCheck"
                    name="passwordCheck"
                    placeholder="Подтвердите ваш пароль:"
                />
                <ErrorMessage
                    name="passwordCheck"
                    component="div"
                    className="modal_form_error"
                />
            </div>
            <button type="submit" className="button button_modal">
                Зарегестрироваться
            </button>
        </Form>
    </Formik>
)

export default SignInForm
