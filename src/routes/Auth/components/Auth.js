import React , { Component } from 'react'
import { browserHistory } from 'react-router'
import localstore from 'store'
import  'whatwg-fetch'
import config from '../../../config'

class Auth extends Component {
  
  componentWillMount() {
    //   console.log(this.props)
      const {params, login} = this.props

    

      if (__DEV__) {
          
        login(params.token)

        let referer = localstore.get('Referer')
        if (referer) {
            browserHistory.push(referer)
            localstore.remove('Referer')
            return
        }

        browserHistory.push('/')
        return 
      }

      console.log("config", config)

        // 拿token去服务器端登陆

        var data = new FormData()
        data.append('ticket', params.token)
        data.append('origin', config.Origin)

       
        fetch(config.AuthUrl,{
            method: 'POST',
            body: data
        }).then((response)=>{
            switch (response.status) {
                case 200:
                    return response
                    break;
                 case 911:
                     
                    var error = new Error(response.json().message)
                    error.response = response
                    throw error
                    break
            
                default:
                    var error = new Error(response.statusText)
                    error.response = response
                    throw error
                    break;
            }
        }).then((response)=>{
           return response.json()
        }).then((data)=>{
            console.log('fetch data', data)
            login(data.token)
        }).catch((err)=>{
            console.log('fetch err', err)
        })


      


return
      browserHistory.push("/")
  }

  render() {
    return null
  }
}


export default Auth
