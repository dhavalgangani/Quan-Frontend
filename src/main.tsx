import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
// import '@mantine/dates/styles.css'
import './index.css'
import '@mantine/core/styles.css';
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './Redux/Store/store.ts'

const theme = createTheme({
  // You can customize your theme here
});

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <MantineProvider theme={theme}>
            <App />
        </MantineProvider>
    </Provider>
)
