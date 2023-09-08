import './modals.scss'

import { useDispatch } from 'react-redux'
import { useEffect, MouseEvent } from 'react'

import { useAppSelector } from '../../store'
import { setModalType } from '../../store/appSlice/sliderAndModalSlice'

import LogInModal from './LogInModal'
import SignInModal from './SignInModal'

const Modal = () => {
    const dispatch = useDispatch()
    const modalType = useAppSelector((state) => state.sliderAndModal.modalType)

    useEffect(() => {
        if (modalType) {
            window.scrollTo(0, 0)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [modalType])

    if (!modalType) return

    const closeModalForOverflow = (event: MouseEvent<HTMLDivElement>) => {
        if (
            event.target instanceof HTMLDivElement &&
            (event.target.classList.contains('overflow') ||
                event.target.classList.contains('modal_close'))
        ) {
            dispatch(setModalType(null))
        }
    }

    const closeModal = () => dispatch(setModalType(null))

    const getSignInModal = () => dispatch(setModalType('signIn'))
    const getLogInModal = () => dispatch(setModalType('logIn'))

    const ModalLogIn =
        modalType === 'logIn' ? LogInModal(closeModal, getSignInModal) : null
    const ModalSignIn =
        modalType === 'signIn' ? SignInModal(closeModal, getLogInModal) : null
    return (
        <div className="overflow" onClick={closeModalForOverflow}>
            {ModalLogIn}
            {ModalSignIn}
        </div>
    )
}

export default Modal
