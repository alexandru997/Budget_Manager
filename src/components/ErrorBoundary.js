import { Component } from 'react'
import { Title } from './Heading'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo,
        })
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className='jumbotron jumbotron-fluid'>
                    <div className='container'>
                        <Title text='Something went wrong' />
                        {process.env.NODE_ENV === 'development' && (
                            <>
                                <p className='text-warning'>
                                    {this.state.error
                                        ? this.state.error.toString()
                                        : 'Error details'}
                                </p>
                                <p className='text-muted'>
                                    {this.state.errorInfo &&
                                        this.state.errorInfo.componentStack}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
