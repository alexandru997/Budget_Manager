import currencyApi from './currencyApi'

const checkResponseStatus = res => {
    if (res.ok) {
        return res
    } else {
        throw new Error(
            `The HTTP status of the reponse: ${res.status} (${res.statusText}) url: ${res.url}`
        )
    }
}

const get = url => fetch(url)

export { checkResponseStatus, get, currencyApi }
