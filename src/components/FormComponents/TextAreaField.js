import { Field, useField } from "formik";
import InvalidFeedback from "./InvalidFeedback";

const TextAreaField = ({ ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <Field
                {...field}
                placeholder="Descriere"
                component="textarea"
                className={
                    "form-control" +
                    (meta.error && meta.touched ? " is-invalid" : "")
                }
            />
            <InvalidFeedback error={meta.error} touched={meta.touched} />
        </>
    )
}

export default TextAreaField
