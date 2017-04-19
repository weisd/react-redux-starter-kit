import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'info/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
      console.log('info state', nextState)
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Info = require('./containers/InfoContainer').default
    //   const reducer = require('./modules/results').default

      /*  Add the reducer to the store on key 'counter'  */
    //   injectReducer(store, { key: 'results', reducer })

      /*  Return getComponent   */
      cb(null, Info)

    /* Webpack named bundle   */
    }, 'result_info')
  }
})
