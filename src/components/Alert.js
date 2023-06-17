const Alert = ({ message, type = 'alert-danger' }) => {
    return message ? (
        <div className={`alert ${type}`} role='alert'>
            {message}
        </div>
    ) : (
        ''
    )
}

export default Alert
