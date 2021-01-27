import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SchedulePage from './pages/SchedulePage/SchedulePage'
import AuthPage from './pages/AuthPage/AuthPage'
import Navbar from './components/Navbar/Navbar'
import UserPage from './pages/UserPage/UserPage'
import UsersPage from './pages/UsersPage/UsersPage'
import AddUserPage from './pages/AddUserPage/AddUserPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import { useSelector } from 'react-redux'

const useRoutes = isAuthenticated => {
  const { components } = useSelector(state => state.variables)

  if (isAuthenticated) {
    return (
      <>
        <Route path='/' component={Navbar} />
        <Switch>
          {components.schedulePage && (
            <Route exact path='/' component={SchedulePage} />
          )}
          {components.usersPage && (
            <Route exact path='/users' component={UsersPage} />
          )}
          {components.userPage && (
            <Route path='/users/:userId' component={UserPage} />
          )}
          {components.addUserPage && (
            <Route path='/add-user' component={AddUserPage} />
          )}
          {components.settingsPage && (
            <Route path='/settings' component={SettingsPage} />
          )}
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
