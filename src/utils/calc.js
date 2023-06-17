import { REVENUE_OPTIONS, SAVINGS_OPTIONS } from '../constants'
const financial = x => Math.floor((x + Number.EPSILON) * 100) / 100
const calcFoatsSum = (accumulatorm, currentValue) => accumulatorm + currentValue
const getTransactionValue = ({ value }) => value
const isRevenue = transaction => REVENUE_OPTIONS.includes(transaction.to)
const isSpent = transaction =>
    !REVENUE_OPTIONS.includes(transaction.to) &&
    !SAVINGS_OPTIONS.includes(transaction.to)
const isSpentOrSavings = transaction =>
    !REVENUE_OPTIONS.includes(transaction.to)
const isRevenueOrSpent = transaction =>
    isRevenue(transaction) || isSpent(transaction)

export {
    financial,
    calcFoatsSum,
    getTransactionValue,
    isRevenue,
    isSpent,
    isSpentOrSavings,
    isRevenueOrSpent,
}
