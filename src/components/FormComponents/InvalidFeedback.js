const InvalidFeedback = ({
    error,
    touched
}) => {
    return (
        error && touched ?
            <div className="invalid-feedback" style={{ display: 'inherit' }}>{error}</div> : ""
    )
}

export default InvalidFeedback
