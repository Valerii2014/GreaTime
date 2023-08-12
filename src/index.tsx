import './styles/styles.scss'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App/App'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <App />
    </Provider>
)
