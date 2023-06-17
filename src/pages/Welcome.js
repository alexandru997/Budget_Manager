import { NavLink } from 'react-router-dom'
import { useMediaQuery } from '../hooks'
import { welcomeSvg } from '../icons'
const Welcome = () => {
    const isPageWide = useMediaQuery('(max-width: 1200px)')
    return (
        <div className='row'>
            <div className='col d-flex flex-column align-items-center'>
                <h1 className='display-1'>Gestionarea Cheltuielilor</h1>
                <br />
                <p>
                    Controlați-vă cheltuielile cu noi. Suntem atenti la toate
                    plățile dumnevoastră și găsim modalități de economisire a
                    banilor.
                </p>
                <NavLink className='btn btn-singin text-white' to='/sign-in'>
                    Să începem
                </NavLink>
            </div>
            {!isPageWide && (
                <div className='col d-flex align-items-center justify-content-center'>
                    <img
                        height='300'
                        width='300'
                        src={welcomeSvg}
                        alt='Welcome Logo'
                    />
                </div>
            )}
        </div>
    )
}

export default Welcome
