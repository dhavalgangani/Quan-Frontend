import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Question from '../Components/Question/Question'

function AppRoute() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/questiondetail' element={<Question />} />
            <Route path='/question/:id' element={<Question />} />

        </Routes>
    </div>
  )
}

export default AppRoute