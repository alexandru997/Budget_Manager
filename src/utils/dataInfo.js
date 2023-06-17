const endOfMonth = date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

const startOfNextMonth = date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1)
}

const nextDay = date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
}

const truncDate = date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

const daysBetweenDates = (date1, date2) => {
    const _date1 = truncDate(date1),
        _date2 = truncDate(date2)

    return (_date2 - _date1) / (1000 * 3600 * 24)
}

const getDaysInfo = date => {
    return {
        daysTillEndOfMonth: daysBetweenDates(date, endOfMonth(date)) + 1,
        currentDate: date,
        endOfMonthDate: endOfMonth(date),
    }
}

const isCurrentWeek = (date, refDate = new Date()) => {
    const first = refDate.getDate() - refDate.getDay()
    const last = first + 6

    const firstDay = new Date(new Date().setDate(first))
    const lastDay = new Date(new Date().setDate(last))

    const shifftedFirstDay = new Date(
        firstDay.getFullYear(),
        firstDay.getMonth(),
        firstDay.getDate() + 1
    )
    const shifftedLastDay = new Date(
        lastDay.getFullYear(),
        lastDay.getMonth(),
        lastDay.getDate() + 1
    )

    return (
        date.getTime() >= shifftedFirstDay.getTime() &&
        date.getTime() <= shifftedLastDay.getTime()
    )
}

const isCurrentYear = (date, refDate = new Date()) =>
    date.getFullYear() === refDate.getFullYear()

const isCurrentMonth = (date, refDate = new Date()) => {
    return (
        isCurrentYear(date, refDate) && date.getMonth() === refDate.getMonth()
    )
}

const isCurrentDay = (date, refDate = new Date()) =>
    isCurrentMonth(date, refDate) && date.getDate() === refDate.getDate()

const getDateFormatted = date => {
    const YYYY = date.getFullYear(),
        MM = `0${date.getMonth() + 1}`.slice(-2),
        DD = `0${date.getDate()}`.slice(-2)
    return `${DD}/${MM}/${YYYY}`
}

export {
    daysBetweenDates,
    nextDay,
    isCurrentDay,
    isCurrentWeek,
    isCurrentMonth,
    isCurrentYear,
    getDaysInfo,
    getDateFormatted,
    endOfMonth,
    startOfNextMonth,
}
