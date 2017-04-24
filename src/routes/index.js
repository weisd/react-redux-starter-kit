// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import StrategyLayout from '../layouts/StrategyLayout'

import ResultsRoute from './Results'
import MyresultRoute from './Myresult'
import WinsRoute from './Wins'
import InfoRoute from './Info'
import Auth from './Auth'
// import Authorize from '../components/Oauth'
import CheckAuth from '../containers/CheckAuth'
import NotFound from '../containers/NotFound'
import ErrorHandle from '../containers/ErrorHandle'
import Chart from './Chart'


/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ([
  {
    path        : '/',
    // component   : CoreLayout,
    // indexRoute  : Home,
    childRoutes : [
      Auth(store),
      Chart(store)
    ]
  },
  {
    path        : '/strategy',
    component   : StrategyLayout,
    childRoutes : [
      ResultsRoute(store),
      MyresultRoute(store),
      WinsRoute(store),
      InfoRoute(store)
    ],
    onEnter: CheckAuth(store)
  },
  {
    path : '/error',
    component: ErrorHandle
  },
  {
    path : "*",
    component : NotFound
  }

])

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
