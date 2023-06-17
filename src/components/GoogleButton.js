import { signInWithGoogle } from '../firebase'

const GoogleButton = ({ text }) => {
    return (
        <div className='col-sm-12'>
            <button
                type='button'
                className='btn btn-outline-light btn-block w-100 d-flex align-items-center justify-content-center'
                onClick={signInWithGoogle}
            >
                <img
                    src='https://img.icons8.com/color/16/000000/google-logo.png'
                    alt='Google logo'
                />
                &nbsp;&nbsp;
                {text}
            </button>
        </div>
    )
}

export default GoogleButton
