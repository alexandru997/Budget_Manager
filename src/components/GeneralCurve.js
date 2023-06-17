import { useMemo } from 'react'
import { AreaChartComponent } from './Charts'
import {
    isCurrentMonth,
    isRevenue,
    isSpent,
    getDateFormatted,
    getTransactionValue,
    calcFoatsSum,
    financial,
} from '../utils'
import { Title } from './Heading'
import { useTransactionData } from '../context'

const keysAndColors = [
    {
        dataKey: 'venit',
        color: '#198754',
    },
    {
        dataKey: 'cheltuieli',
        color: '#dc3545',
    },
]

const calcStatsForLast12Months = data => {
    const _result = []
    for (let i = 11; i >= 0; i--) {
        const _start = new Date(
            new Date().getFullYear(),
            new Date().getMonth() - i
        )
        _result.push({
            name: getDateFormatted(_start).slice(3),
            venit: financial(
                data
                    .filter(
                        transaction =>
                            isRevenue(transaction) &&
                            isCurrentMonth(new Date(transaction.date), _start)
                    )
                    .map(getTransactionValue)
                    .reduce(calcFoatsSum, 0)
            ),
            cheltuieli: financial(
                data
                    .filter(
                        transaction =>
                            isSpent(transaction) &&
                            isCurrentMonth(new Date(transaction.date), _start)
                    )
                    .map(getTransactionValue)
                    .reduce(calcFoatsSum, 0)
            ),
        })
    }
    return _result.filter(
        chartValue => chartValue.venit !== 0 || chartValue.cheltuieli !== 0
    )
}

const GeneralCurve = () => {
    const { data } = useTransactionData()
    const dataSource = useMemo(() => calcStatsForLast12Months(data), [data])

    return (
        <>
            <Title text='Prezentare generală' />
            <AreaChartComponent
                data={dataSource}
                keysAndColors={keysAndColors}
            />
        </>
    )
}

export default GeneralCurve
