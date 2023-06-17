import { get, checkResponseStatus } from './index'

const currencyApi = {
    get(baseCurrency) {
        return get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
            .then(checkResponseStatus)
            .then(res => res.json())
    },
}

export default currencyApi
