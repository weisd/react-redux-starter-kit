import {browserHistory} from 'react-router'
import localstore from 'store'
import config from '../config'

// 验证登陆
export const CheckAuth = (store) => {
    return (nextState, replace, callback) => {

        console.log('CheckAuth ==== ', store.getState())

        if (!Object.hasOwnProperty.call(store.getState(), 'token')) {
            // 把上次访问的地址记下
            localstore.set('Referer', store.getState().location.pathname)

            if (__DEV__){
                browserHistory.push('/auth/test_token')
                return
            }

            // browserHistory.push(config.authorizeUrl)
             window.location.href=config.authorizeUrl
             return
        }

        callback()
    }
}

export default CheckAuth