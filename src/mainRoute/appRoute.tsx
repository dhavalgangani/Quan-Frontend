import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'

function AppRoute() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/:id' element={<Dashboard />} />
        </Routes>
    </div>
  )
}

export default AppRoute;