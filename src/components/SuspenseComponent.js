import { Suspense } from 'react'
import ErrorBoundary from './ErrorBoundary'
import Spinner from './Spinner'

const SuspenseComponent = ({ children }) => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
                {children}
            </Suspense>
        </ErrorBoundary>
    )
}

export default SuspenseComponent
