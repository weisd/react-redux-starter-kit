import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'wins',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const container = require('./containers/WinsContainer').default
      const reducer = require('./modules/wins').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'wins', reducer })

      /*  Return getComponent   */
      cb(null, container)

    /* Webpack named bundle   */
    }, 'wins')
  }
})
