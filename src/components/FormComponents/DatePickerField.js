import { useFormikContext, useField } from "formik"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import '../../styles/customDatePickerWidth.scss'
import InvalidFeedback from "./InvalidFeedback"

const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext()
    const [field, meta] = useField(props)
    return (
        <>
            <div className="customDatePickerWidth">
                <DatePicker
                    {...field}
                    dateFormat="dd/MM/yyyy"
                    className={
                        "form-control" +
                        (meta.error && meta.touched ? " is-invalid" : "")
                    }
                    placeholderText="DD/MM/YYYY"
                    selected={(field.value && new Date(field.value)) || null}
                    onChange={val => {
                        setFieldValue(field.name, val)
                    }}
                />
            </div>
            <InvalidFeedback error={meta.error} touched={meta.touched} />
        </>
    )
}

export default DatePickerField
