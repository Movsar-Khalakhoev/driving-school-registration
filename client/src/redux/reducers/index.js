import { applyMiddleware, combineReducers, createStore } from 'redux'
import schedulePageReducers from './SchedulePage.reducers'
import userPageReducers from './UserPage.reducers'
import ReduxThunk from 'redux-thunk'
import addNewUserReducer from './AddUserPage.reducers'
import popupReducers from './Popup.reducers'
import usersPageReducers from './UsersPage.reducers'
import settingsPageReducers from './SettingsPage.reducers'
import variablesReducers from './Variables.reducers'
import attendancePageReducer from './AttendancePage.reducers'
import generalReducer from './GENERAL.reducers'

const reducer = combineReducers({
  variables: variablesReducers,
  popup: popupReducers,
  schedule: schedulePageReducers,
  user: userPageReducers,
  addNewUser: addNewUserReducer,
  users: usersPageReducers,
  settings: settingsPageReducers,
  attendance: attendancePageReducer,
  general: generalReducer,
})

const store = createStore(reducer, applyMiddleware(ReduxThunk))

export default store
