import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SchedulePage from './pages/Schedule.page/Schedule.page'
import AuthPage from './pages/Auth.page/Auth.page'
import Navbar from './components/Navbar/Navbar'
import UserPage from './pages/User.page/User.page'
import UsersPage from './pages/Users.page/Users.page'
import AddUserPage from './pages/AddUser.page/AddUser.page'
import SettingsPage from './pages/Settings.page/Settings.page'
import { useSelector } from 'react-redux'
import AttendancePage from './pages/Attendance.page/Attendance.page'

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
          {components.attendancePage && (
            <Route path='/attendance' component={AttendancePage} />
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
