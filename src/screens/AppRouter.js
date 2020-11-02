import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomeComponent from './home/HomeComponent'
import SidebarComponent from './sidebar/SidebarComponent'
import { Provider } from 'react-redux'
import Store from '../redux/store/Store'
function AppRouter() {
  return (
    <Provider store={Store}>
      <Router>
        <div className='wrapper'>
          <SidebarComponent />
          <div className='content'>
            <Switch>
              <Route exact path='/' component={HomeComponent} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default AppRouter
