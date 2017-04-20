import React , { Component } from 'react'
import { browserHistory } from 'react-router'
import localstore from 'store'
import  'whatwg-fetch'
// import config from '../../../config'

class Auth extends Component {
  
  componentWillMount() {
    //   console.log(this.props)
      const {params, login} = this.props

      login(params.token)

      let referer = localstore.get('Referer')
      if (referer) {
          browserHistory.push(referer)
          localstore.remove('Referer')
          return
      }

      var data = new FormData()
    data.append('proto', 'tcp')

       // 拿token去服务器端登陆
        fetch('http://message.ktkt.com/im/server',{
            method: 'POST',
            body: data
        }).then((response)=>{
            response.json()
        }).then((data)=>{
            console.log('fetch data', data)
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
