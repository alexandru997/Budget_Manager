import { useMediaQuery, useTheme } from '../hooks'

const ActionConfirm = ({
    message = 'Confirmati?',
    onOk,
    onCancel,
    onOkText = 'Şterge',
    onCancelText = 'Anulează',
}) => {
    const isPageWide = useMediaQuery('(min-width: 576px)')
    const { btnSecondary } = useTheme()
    return (
        <>
            <div className='row'>
                <div className='col-sm-12 col-md-6 mt-3 mb-3 d-flex justify-content-center align-items-center'>
                    {message}
                </div>
                <div
                    className={`col-12 col-sm-6 col-md-3 d-flex justify-content-center align-items-center ${
                        !isPageWide ? 'mb-3' : ''
                    }`}
                >
                    <button
                        type='button'
                        className='btn btn-outline-danger w-100 '
                        onClick={onOk}
                    >
                        {onOkText}
                    </button>
                </div>
                <div className='col-12 col-sm-6 col-md-3 d-flex justify-content-center align-items-center'>
                    <button
                        type='button'
                        className={`btn ${btnSecondary} w-100`}
                        onClick={onCancel}
                    >
                        {onCancelText}
                    </button>
                </div>
            </div>
        </>
    )
}

export default ActionConfirm
