import { applyMiddleware, combineReducers, createStore } from 'redux'
import scheduleReducer from './schedule.reducer'
import personalReducer from './personal.reducer'
import ReduxThunk from 'redux-thunk'
import addNewUserReducer from './addUser.reducer'
import popupReducer from './popup.reducer'
import usersReducer from './users.reducer'
import settingsReducer from './settings.reducer'
import variablesReducer from './variables.reducer'
import attendancePageReducer from './AttendancePage.reducers'

const reducer = combineReducers({
  variables: variablesReducer,
  popup: popupReducer,
  schedule: scheduleReducer,
  personal: personalReducer,
  addNewUser: addNewUserReducer,
  users: usersReducer,
  settings: settingsReducer,
  attendance: attendancePageReducer,
})

const store = createStore(reducer, applyMiddleware(ReduxThunk))

export default store
