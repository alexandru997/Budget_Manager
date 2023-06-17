import { Field, useField } from 'formik'
import InvalidFeedback from './InvalidFeedback'

const InputValueField = ({ type, placeholder, ...props }) => {
    const [field, meta] = useField(props)
    const _type = type ? type : 'number'
    const _placeholder = placeholder ? placeholder : 'Valoare'
    return (
        <>
            <Field
                type={_type}
                placeholder={_placeholder}
                {...field}
                className={
                    'form-control' +
                    (meta.error && meta.touched ? ' is-invalid' : '')
                }
            />
            <InvalidFeedback error={meta.error} touched={meta.touched} />
        </>
    )
}

export default InputValueField
