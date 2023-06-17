import { NavLink } from 'react-router-dom'

const NavigationLinks = ({ routes }) => {
    return (
        <div className='row mt-3 mb-3 '>
            <div className='d-flex justify-content-center'>
                <ul className={`nav nav-pills`}>
                    {routes.map(route => (
                        <li key={route.key} className='nav-item'>
                            <NavLink
                                exact={route.exact}
                                activeClassName='active'
                                className='nav-link'
                                to={route.path}
                            >
                                {route.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default NavigationLinks
