import React, { useEffect } from 'react'
import './App.sass'
import useRoutes from './routes'
import bg from './assets/img/background.jpg'
import './assets/libs/icofont/icofont.min.css'
import 'react-toastify/dist/ReactToastify.css'
import useAuth from './hooks/auth.hook'
import AuthContext from './context/AuthContext'
import Loader from './components/Loader/Loader'
import { ToastContainer } from 'react-toastify'
import Popup from './components/Popup/Popup'
import { getVariables } from './redux/actions/variables.actions'
import useDispatchWithHttp from './hooks/dispatchWithHttp.hook'

function App() {
  const [dispatchVariables] = useDispatchWithHttp()
  const { token, userId, login, logout, isReady } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  useEffect(() => console.log('auth changed', isAuthenticated), [
    isAuthenticated,
  ])

  useEffect(() => {
    if (isAuthenticated) {
      dispatchVariables(getVariables)
    }
  }, [isAuthenticated])

  if (!isReady) {
    return <Loader />
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login,
        logout,
        isAuthenticated,
      }}
    >
      <div
        className='app'
        style={{ backgroundImage: `url("${bg}")`, backgroundSize: 'cover' }}
      >
        {routes}
        <ToastContainer
          position='top-right'
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Popup />
      </div>
    </AuthContext.Provider>
  )
}

export default App
