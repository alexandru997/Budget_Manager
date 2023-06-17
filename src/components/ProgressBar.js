import { memo, useMemo } from 'react'

const ProgressBar = ({ currentValue, targetValue }) => {
    const percentage = useMemo(() => {
        return (currentValue / targetValue) * 100
    }, [currentValue, targetValue])
    const classes =
        percentage === 100 ? 'bg-success' : percentage > 100 ? 'bg-danger' : ''
    return (
        <div className='progress progress-prosition'>
            <div
                className={`progress-bar ${classes}`}
                role='progressbar'
                style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
            <div className='progress-desc'>
                {currentValue}/{targetValue} ({percentage.toFixed(2)}%)
            </div>
        </div>
    )
}

export default memo(ProgressBar)
