import React from 'react'
import {Router} from 'dva/router'
import App from './app'

export default function ({history, app}) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          cb(null, {component: require('./routes/dashboard')})
        })
      }
    }
  ]

  return <Router history={history} routes={routes} />
}