import { useMemo } from 'react'
import Spinner from './Spinner'
import { useSettings, useTransactionData } from '../context'
import { getDateFormatted, getDaysInfo } from '../utils'

const InfoCard = ({
    title,
    calcFunc,
    color,
    dateInfo = null,
    cardCurrency,
    loading = false,
}) => {
    const dateDetails = getDaysInfo(new Date())
    const { data } = useTransactionData()
    const { currency, plannedToBeSpent } = useSettings()
    const calcValue = useMemo(
        () => calcFunc(data, plannedToBeSpent),
        [data, plannedToBeSpent, calcFunc]
    )

    return (
        <div className={'shadow-3  rounded-4 text-white mb-3 ' + color}>
            <div className='card-body'>
                <span className='card-title'>{title}</span>
                {loading ? (
                    <Spinner />
                ) : (
                    <p className='card-text h1 text-center'>{calcValue}</p>
                )}
            </div>
            <div className='card-footer bg-transparent row border-0 d-flex justify-content-between'>
                <small className='col-12 col-lg-6 text-muted'>
                    {cardCurrency ? cardCurrency : currency}
                </small>
                {dateInfo ? (
                    <>
                        <small className='col-12 col-lg-6 text-end'>
                            {getDateFormatted(dateDetails.currentDate)} -{' '}
                            {getDateFormatted(dateDetails.endOfMonthDate)}{' '}
                            {`(${dateDetails.daysTillEndOfMonth} zile ramase)`}
                        </small>
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}

export default InfoCard
