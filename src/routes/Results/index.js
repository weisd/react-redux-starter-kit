import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'results',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Results = require('./containers/ResultsContainer').default
      const reducer = require('./modules/results').default

      console.log("results router", store)
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'results', reducer })

      /*  Return getComponent   */
      cb(null, Results)

    /* Webpack named bundle   */
    }, 'results')
  }
})
