import { memo } from 'react'
import { COSTS } from '../constants'
import {
    financial,
    getNotSoRandomColor,
    isCurrentMonth,
    isCurrentYear,
    isSpent,
} from '../utils'
import TransactionPipeChart from './TransactionPipeChart'

const TRANSACTION_PIPE_CHARTS = [
    {
        key: 'MONTHLY_PIPE_CHART',
        name: 'Cheltuieli lunare',
        getColorFunc: getNotSoRandomColor,
        func: data => {
            const result = {}
            data.filter(isSpent)
                .filter(transaction =>
                    isCurrentMonth(new Date(transaction.date))
                )
                .forEach(transaction => {
                    const category = COSTS[transaction.to]
                    if (!result[category]) {
                        result[category] = 0
                    }

                    result[category] += transaction.value
                })
            return Object.keys(result).map(key => ({
                name: key,
                value: financial(result[key]),
            }))
        },
        component: TransactionPipeChart,
    },
    {
        key: 'YEARLY_PIPE_CHART',
        name: 'Cheltuieli anuale',
        getColorFunc: getNotSoRandomColor,
        func: data => {
            const result = {}
            data.filter(isSpent)
                .filter(transaction =>
                    isCurrentYear(new Date(transaction.date))
                )
                .forEach(transaction => {
                    const category = COSTS[transaction.to]
                    if (!result[category]) {
                        result[category] = 0
                    }

                    result[category] += transaction.value
                })
            return Object.keys(result).map(key => ({
                name: key,
                value: financial(result[key]),
            }))
        },
        component: TransactionPipeChart,
    },
]

const getTransactionPipeByKey = keys =>
    TRANSACTION_PIPE_CHARTS.filter(chart => keys.includes(chart.key))

const TransactionPipeCharts = ({ keys = [] }) => {
    return getTransactionPipeByKey(keys).map(chart => (
        <chart.component
            key={chart.key}
            title={chart.name}
            calcFunct={chart.func}
            getColorFunc={chart.getColorFunc}
        />
    ))
}

export default memo(TransactionPipeCharts)
