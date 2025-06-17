// import { Routes, Route } from 'react-router-dom'
// import Dashboard from '../pages/Dashboard'

// function AppRoute() {
//   return (
//     <div>
//         <Routes>
//             <Route path='/' element={<Dashboard />} />
//             <Route path='/:id' element={<Dashboard />} />
//         </Routes>
//     </div>
//   )
// }

// export default AppRoute;



import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Question from '../Components/Question/Question'

function AppRoute() {
  return (
    <div>
        <Routes>

            <Route path='/' element={<Dashboard />} />
            <Route path='/questiondeatil' element={<Question />} />
            <Route path='/question/:id' element={<Question />} />
        </Routes>
    </div>
  )
}

export default AppRoute