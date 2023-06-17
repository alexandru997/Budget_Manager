import 'firebase/firestore'
import 'firebase/auth'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './context'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import './custom.scss'

//print app verion in console
console.log({
    version: process.env.REACT_APP_VERSION,
    name: process.env.REACT_APP_NAME,
})

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
    onUpdate: registration => {
        const waitingServiceWorker = registration.waiting

        if (waitingServiceWorker) {
            waitingServiceWorker.addEventListener('statechange', event => {
                if (event.target.state === 'activated') {
                    window.location.reload()
                }
            })
            waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' })
        }
    },
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
