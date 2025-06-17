import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './Redux/Store/store.ts'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <MantineProvider>
            <App />
        </MantineProvider>
    </Provider>

)
