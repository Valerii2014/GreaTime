import { MouseEvent } from 'react'
import SignInForm from './signInForm'

const SignInModal = (
    closeModal: (event: MouseEvent<HTMLDivElement>) => void,
    getLogInModal: () => void
) => {
    return (
        <div className="modal">
            <h4 className="modal_name">Авторизация</h4>
            <div className="modal_wrapper">
                <div className="modal_descr">
                    <span
                        className="modal_descr_inactive"
                        onClick={getLogInModal}
                    >
                        Войти
                    </span>
                    &ensp;или&ensp;
                    <span className="modal_descr_active">
                        Зарегестрироваться
                    </span>
                </div>
                <SignInForm />
            </div>
            <div className="modal_close" onClick={closeModal}>
                <div />
                <div />
            </div>
        </div>
    )
}

export default SignInModal
