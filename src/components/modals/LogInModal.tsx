import { MouseEvent } from 'react'
import LogInForm from './logInForm'

const LogInModal = (
    closeModal: (event: MouseEvent<HTMLDivElement>) => void,
    getSignInModal: () => void
) => {
    return (
        <div className="modal modal_login">
            <h4 className="modal_name">Авторизация</h4>
            <div className="modal_wrapper">
                <div className="modal_descr">
                    <span className="modal_descr_active">Войти</span>
                    &ensp;или&ensp;
                    <span
                        className="modal_descr_inactive"
                        onClick={getSignInModal}
                    >
                        Зарегестрироваться
                    </span>
                </div>
                <LogInForm />
            </div>
            <div className="modal_close" onClick={closeModal}>
                <div />
                <div />
            </div>
        </div>
    )
}

export default LogInModal
