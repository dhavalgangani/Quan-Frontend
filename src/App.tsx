import AppRoute from "./route/appRoute"
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App