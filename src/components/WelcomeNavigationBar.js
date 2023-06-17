import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useMediaQuery } from '../hooks'
import { usvSvg } from '../icons/'

const WellcoemNavigationBar = () => {
    const isPageWide = useMediaQuery('(min-width: 992px)')
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (isPageWide) {
            setShow(false)
        }
    }, [isPageWide])

    const toggleShow = () => {
        setShow(show => !show)
    }

    const closeBurgerMenu = () => {
        setShow(false)
    }
    return (
        <nav className='navbar navbar-expand-lg navbar-dark justify-content-between'>
            <NavLink
                className='navbar-brand logo--animated'
                to='/'
                onClick={closeBurgerMenu}
            >
                <img
                    src={usvSvg}
                    width='64'
                    height='72'
                    className='d-inline-block align-top'
                    alt='UVS Logo'
                />
            </NavLink>
            {isPageWide && (
                <NavLink
                    className='navbar-brand text-white logo--animated'
                    to='/'
                    onClick={closeBurgerMenu}
                >
                    Facultatea de Inginerie Electrică și Știința Calculatoarelor
                </NavLink>
            )}
            <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarSupportedContent'
                onClick={toggleShow}
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div
                className={`collapse navbar-collapse flex-grow-0 ${
                    show ? 'show' : ''
                }`}
                id='navbarSupportedContent'
            >
                {!isPageWide && (
                    <NavLink
                        className='btn display-2 mt-5 d-flex justify-content-center text-white logo--animated'
                        to='/'
                        onClick={closeBurgerMenu}
                    >
                        Facultatea de Inginerie Electrică și Știința
                        Calculatoarelor
                    </NavLink>
                )}
                <NavLink
                    className='btn btn-singin text-white'
                    to='/sign-up'
                    onClick={closeBurgerMenu}
                >
                    Creează un cont
                </NavLink>
            </div>
        </nav>
    )
}

export default WellcoemNavigationBar
