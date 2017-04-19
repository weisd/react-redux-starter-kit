import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'myresult',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Myresult = require('./containers/MyresultContainer').default
      const reducer = require('./modules/myresult').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'myresult', reducer })

      /*  Return getComponent   */
      cb(null, Myresult)

    /* Webpack named bundle   */
    }, 'myresult')
  }
})
