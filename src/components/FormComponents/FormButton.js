const FormButton = ({ text, type = 'submit', color = 'btn-primary' }) => {
    return (
        <div className='row mb-3'>
            <div className='col'>
                <button type={type} className={`btn btn-block w-100 ${color}`}>
                    {text}
                </button>
            </div>
        </div>
    )
}

export default FormButton
