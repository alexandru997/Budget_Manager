import FormikWrapper from '../FormComponents'
import { useState } from 'react'
import { useSettings } from '../../context'
import * as CurrencyCheckForm from './CurrencyCheckForm'
import { financial } from '../../utils'
import { currencyApi } from '../../api'
import Heading from '../Heading'
import InfoCard from '../InfoCard'

const CurrencyCheck = () => {
    const { currency } = useSettings()
    const [amount, setAmount] = useState(0)
    const [cardCurrency, setCardCurrency] = useState('')
    const [loading, setLoading] = useState(false)
    const onSubmit = async ({ base, to, value }) => {
        try {
            setLoading(true)
            const res = await currencyApi.get(base),
                rate = res.rates[to],
                amount = financial(value * rate)

            setAmount(amount)
            setCardCurrency(to)
            return amount
        } catch (e) {
            setAmount('Some issue occurred.')
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Heading text='Schimb valutar' />
            <div className='col-sm'>
                <InfoCard
                    title='Valoarea calculata'
                    calcFunc={() => amount}
                    color='bg-c-blue'
                    cardCurrency={cardCurrency}
                    loading={loading}
                />
            </div>
            <FormikWrapper
                initialValues={{
                    base: currency,
                    to: 'EUR',
                    value: '',
                }}
                onSubmit={onSubmit}
                Component={CurrencyCheckForm.CurrencyCheckForm}
                validationSchema={CurrencyCheckForm.validationSchema}
            />
        </>
    )
}

export default CurrencyCheck
