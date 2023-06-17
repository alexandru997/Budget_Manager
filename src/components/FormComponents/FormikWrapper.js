import { Formik, Form } from 'formik'
import { noop } from '../../utils'

const FormikWrapper = ({
    initialValues,
    validationSchema,
    Component,
    onSubmit = noop,
    onReset = noop,
    formType = 'CREATE',
}) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            onReset={onReset}
        >
            {() => (
                <Form>
                    <Component formType={formType} />
                </Form>
            )}
        </Formik>
    )
}

export default FormikWrapper
