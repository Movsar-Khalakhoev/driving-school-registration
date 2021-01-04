import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import SchedulePage from './pages/SchedulePage/SchedulePage'
import AuthPage from './pages/AuthPage/AuthPage'
import Navbar from './components/Navbar/Navbar'
import PersonalPage from './pages/PersonalPage/PersonalPage'
import StudentsPage from './pages/StudentsPage/StudentsPage'

const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <>
        <Route path='/' component={Navbar} />
        <Switch>
          <Route exact path='/' component={SchedulePage} />
          <Route path='/personal' component={PersonalPage} />
          <Route path='/students' component={StudentsPage} />
          <Redirect to='/' />
        </Switch>
      </>
    )
  }

  return (
    <Switch>
      <Route exact path='/' component={AuthPage} />
      <Redirect to='/' />
    </Switch>
  )
}

export default useRoutes
