import { Field, useField } from 'formik'
import InvalidFeedback from './InvalidFeedback'

const SelectorField = ({ options, ...props }) => {
    const [field, meta] = useField(props)
    const isArray = Array.isArray(options)
    return (
        <>
            <Field
                {...field}
                as='select'
                className={
                    'form-select' +
                    (meta.error && meta.touched ? ' is-invalid' : '')
                }
            >
                {isArray
                    ? options.map((option, i) => (
                          <option key={`${i}`} value={`${i}`}>
                              {option}
                          </option>
                      ))
                    : Object.keys(options).map(option => (
                          <option key={option} value={`${option}`}>
                              {options[option]}
                          </option>
                      ))}
            </Field>
            <InvalidFeedback error={meta.error} touched={meta.touched} />
        </>
    )
}

export default SelectorField
