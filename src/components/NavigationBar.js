import { lazy, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context'
import { useMediaQuery, useTheme } from '../hooks'
import { exitSvg } from '../icons'
import SuspenseComponent from './SuspenseComponent'

const User = lazy(() => import('./User'))
const NavigationBar = ({ routes }) => {
    const isPageWide = useMediaQuery('(min-width: 1200px)')
    const [show, setShow] = useState(false)
    const { clearSession } = useAuth()
    const { bgColor, navbar, color, bgColorNotWide } = useTheme()

    const toggleShow = () => {
        setShow(show => !show)
    }
    const closeBurgerMenu = () => {
        setShow(false)
    }

    useEffect(() => {
        if (isPageWide) {
            setShow(false)
        }
    }, [isPageWide])

    return (
        <nav
            className={`navbar ${navbar}`}
            style={{ backgroundColor: isPageWide ? bgColor : bgColorNotWide }}
        >
            {!isPageWide && (
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarTogglerDemo03'
                    aria-controls='navbarTogglerDemo03'
                    aria-expanded={show ? 'true' : 'false'}
                    aria-label='Toggle navigation'
                    onClick={toggleShow}
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
            )}
            <div
                className={`${
                    !isPageWide
                        ? 'collapse navbar-collapse'
                        : 'd-flex flex-column'
                }
                 ${show ? 'show' : ''} w-100`}
            >
                <NavLink
                    className='navbar-brand'
                    to='/home'
                    onClick={closeBurgerMenu}
                >
                    <SuspenseComponent>
                        <User />
                    </SuspenseComponent>
                </NavLink>
                <ul className='navbar-nav'>
                    {routes.map(link => (
                        <li className='nav-item' key={link.key}>
                            <NavLink
                                className='nav-link d-flex align-items-center'
                                activeClassName='active nav-link_active'
                                to={link.path}
                                exact={link.exact}
                                onClick={closeBurgerMenu}
                            >
                                <div className='nav-link_active-bar'></div>
                                <img src={link.logo} alt={link.name} />
                                &nbsp;&nbsp;
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div
                    className='navbar-footer d-flex align-items-end'
                    style={{ width: '100%', height: '100px' }}
                >
                    <button
                        type='button'
                        className='btn btn-link-outline'
                        onClick={clearSession}
                        style={{ color: color }}
                    >
                        <img src={exitSvg} alt='Deloghează-te' /> Deloghează-te
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavigationBar
