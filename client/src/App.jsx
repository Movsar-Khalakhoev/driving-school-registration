import React from 'react'
import './App.sass'
import useRoutes from './routes'
import bg from './assets/img/background.jpg'
import './assets/libs/icofont/icofont.min.css'

function App() {
  const isAuthenticated = false
  const routes = useRoutes(isAuthenticated)

  return (
    <div className="app" style={{backgroundImage: `url("${bg}")`, backgroundSize: 'cover'}}>
      {routes}
    </div>
  )
}

export default App
