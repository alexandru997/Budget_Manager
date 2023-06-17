import InfoCard from './InfoCard'
import {
    isCurrentMonth,
    getTransactionValue,
    calcFoatsSum,
    financial,
    isSpent,
    isRevenue,
    isCurrentYear,
    isCurrentWeek,
    getDaysInfo,
    isSpentOrSavings,
} from '../utils'

const INFO_CARDS = [
    {
        key: 'REVENIU',
        name: 'Venit',
        color: 'bg-c-green',
        /**
         * Reveniu = all received money during this month
         */
        func: data =>
            financial(
                data
                    .filter(
                        transaction =>
                            isRevenue(transaction) &&
                            isCurrentMonth(new Date(transaction.date))
                    )
                    .map(getTransactionValue)
                    .reduce(calcFoatsSum, 0)
            ),
        component: InfoCard,
    },
    {
        key: 'BALANCE',
        name: 'Balanţă',
        color: 'bg-c-yellow',
        func: data => {
            /**
             * Balance = all recived money - all spent money
             *  */
            return financial(
                data
                    .filter(transaction => isRevenue(transaction))
                    .map(getTransactionValue)
                    .reduce(calcFoatsSum, 0) -
                    data
                        .filter(transaction => isSpentOrSavings(transaction))
                        .map(getTransactionValue)
                        .reduce(calcFoatsSum, 0)
            )
        },
        component: InfoCard,
    },
    {
        key: 'SPENT',
        name: 'Cheltuit',
        color: 'bg-c-red',
        /**
         * Spent = all spent money furing this month
         */
        func: data =>
            financial(
                data
                    .filter(
                        transaction =>
                            isSpent(transaction) &&
                            isCurrentMonth(new Date(transaction.date))
                    )
                    .map(getTransactionValue)
                    .reduce(calcFoatsSum, 0)
            ),
        component: InfoCard,
    },
    {
        key: 'OVERALL_SPENT',
        name: 'Pană acum',
        color: 'bg-c-blue',
        func: data =>
            financial(
                data
                    .filter(transaction => isSpent(transaction))
                    .map(getTransactionValue)
                    .reduce(calcFoatsSum, 0)
            ),
        component: InfoCard,
    },
    {
        key: 'THIS_YEAR_SPENT',
        name: 'Acest an',
        color: 'bg-c-red',
        func: data =>
            financial(
                data
                    .filter(
                        transaction =>
                            isSpent(transaction) &&
                            isCurrentYear(new Date(transaction.date))
                    )
                    .map(getTransactionValue)
                    .reduce(calcFoatsSum, 0)
            ),
        component: InfoCard,
    },
    {
        key: 'THIS_MONTH_SPENT',
        name: 'Această lună',
        color: 'bg-c-yellow',
        func: data =>
            financial(
                data
                    .filter(
                        transaction =>
                            isSpent(transaction) &&
                            isCurrentMonth(new Date(transaction.date))
                    )
                    .map(getTransactionValue)
                    .reduce(calcFoatsSum, 0)
            ),
        component: InfoCard,
    },
    {
        key: 'THIS_WEEK_SPENT',
        name: 'Această săptpmână',
        color: 'bg-c-indigo',
        func: data =>
            financial(
                data
                    .filter(
                        transaction =>
                            isSpent(transaction) &&
                            isCurrentWeek(new Date(transaction.date))
                    )
                    .map(getTransactionValue)
                    .reduce(calcFoatsSum, 0)
            ),
        component: InfoCard,
    },

    {
        key: 'OVERALL_REVENUE',
        name: 'Pană acum',
        color: 'bg-c-green',
        func: data =>
            financial(
                data
                    .filter(transaction => isRevenue(transaction))
                    .map(getTransactionValue)
                    .reduce(calcFoatsSum, 0)
            ),
        component: InfoCard,
    },
    {
        key: 'THIS_YEAR_REVENUE',
        name: 'Acest an',
        color: 'bg-c-orange',
        func: data =>
            financial(
                data
                    .filter(
                        transaction =>
                            isRevenue(transaction) &&
                            isCurrentYear(new Date(transaction.date))
                    )
                    .map(getTransactionValue)
                    .reduce(calcFoatsSum, 0)
            ),
        component: InfoCard,
    },
    {
        key: 'THIS_MONTH_REVENUE',
        name: 'Această lună',
        color: 'bg-c-pink',
        func: data =>
            financial(
                data
                    .filter(
                        transaction =>
                            isRevenue(transaction) &&
                            isCurrentMonth(new Date(transaction.date))
                    )
                    .map(getTransactionValue)
                    .reduce(calcFoatsSum, 0)
            ),
        component: InfoCard,
    },
    {
        key: 'THIS_WEEK_REVENUE',
        name: 'Această săptpmână',
        color: 'bg-c-cyan',
        func: data =>
            financial(
                data
                    .filter(
                        transaction =>
                            isRevenue(transaction) &&
                            isCurrentWeek(new Date(transaction.date))
                    )
                    .map(getTransactionValue)
                    .reduce(calcFoatsSum, 0)
            ),
        component: InfoCard,
    },
    {
        key: 'PLANNED_TO_BE_SPENT',
        name: 'Planificate',
        color: 'bg-c-cyan',
        func: (_, plannedToBeSpent) => financial(plannedToBeSpent),
        component: InfoCard,
    },
    {
        key: 'DIFFERENCE_BETWEEN_PLANNED_TO_BE_SPENT_AND_SPENT',
        name: 'Diferenţa',
        color: 'bg-c-red',
        func: (data, plannedToBeSpent) =>
            financial(
                plannedToBeSpent -
                    data
                        .filter(
                            transaction =>
                                isSpent(transaction) &&
                                isCurrentMonth(new Date(transaction.date))
                        )
                        .map(getTransactionValue)
                        .reduce(calcFoatsSum, 0)
            ),
        component: InfoCard,
    },
    {
        key: 'TO_BE_SPENT_DAILY',
        name: 'Cheltuit zilinic',
        color: 'bg-c-green',
        dateInfo: true,
        func: (data, plannedToBeSpent) => {
            const { daysTillEndOfMonth } = getDaysInfo(new Date())
            const dailyToBeSpent =
                plannedToBeSpent -
                data
                    .filter(
                        transaction =>
                            isSpent(transaction) &&
                            isCurrentMonth(new Date(transaction.date))
                    )
                    .map(getTransactionValue)
                    .reduce(calcFoatsSum, 0)

            return financial(dailyToBeSpent) <= 0
                ? 0
                : financial(dailyToBeSpent / daysTillEndOfMonth)
        },
        component: InfoCard,
    },
]

const getInfoCard = keys => INFO_CARDS.filter(card => keys.includes(card.key))

const InfoCards = ({ keys = [] }) => {
    return getInfoCard(keys).map(card => (
        <div key={card.key} className='col-sm'>
            <card.component
                title={card.name}
                calcFunc={card.func}
                color={card.color}
                dateInfo={card.dateInfo}
            />
        </div>
    ))
}

export default InfoCards
