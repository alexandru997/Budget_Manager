import { useAuth, useSettings } from '../context'
import { userPng } from '../icons'

const User = () => {
    const { user } = useAuth()
    const { displayName } = useSettings()
    const { photoURL } = user
    return (
        <>
            <div className='user-avatar d-flex flex-column'>
                <img
                    src={photoURL || userPng}
                    alt='Avatar'
                    className={photoURL ? 'rounded-circle' : ''}
                    style={{
                        height: '64px',
                        width: '64px',
                        margin: '0 auto',
                    }}
                />
                <div className='user-name text-center h5 mt-2'>
                    {displayName}
                </div>
            </div>
        </>
    )
}

export default User
