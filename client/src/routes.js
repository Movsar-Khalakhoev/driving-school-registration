import React, { useEffect, useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SchedulePage from './pages/SchedulePage/SchedulePage'
import AuthPage from './pages/AuthPage/AuthPage'
import Navbar from './components/Navbar/Navbar'
import UserPage from './pages/UserPage/UserPage'
import UsersPage from './pages/UsersPage/UsersPage'
import AddUserPage from './pages/AddUserPage/AddUserPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'

const useRoutes = (isAuthenticated, token) => {
  if (isAuthenticated) {
    return (
      <>
        <Route path='/' component={Navbar} />
        <Switch>
          <Route exact path='/' component={SchedulePage} />
          <Route exact path='/users' component={UsersPage} />
          <Route path='/users/:userId' component={UserPage} />
          <Route path='/add-user' component={AddUserPage} />
          <Route path='/settings' component={SettingsPage} />
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
