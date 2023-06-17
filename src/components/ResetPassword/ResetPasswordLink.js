import { Link } from 'react-router-dom'

const ResetPasswordLink = () => {
    return (
        <Link className='link-primary mt-3' to='/reset-password'>
            Ai uitat parola?
        </Link>
    )
}

export default ResetPasswordLink
