import React , { Component }from 'react'
import PropTypes from 'prop-types'
import {  Router,Link,browserHistory } from 'react-router'
import {
  Container,
//   Group,
  TabBar,
  Icon,
//   Badge,
//   amStyles,
} from 'amazeui-touch'; // yarn install amazeui-touch


export class StrategyLayout extends Component {

  componentWillMount(){
    console.log('componentWillMount',this.props)

  }


  render(){
    const { children } = this.props
    const { route } = children.props

    return (
     <Container direction="column" >

        <Container  transition='sfr'> 
            {children}
        </Container >

        <TabBar amStyle='primary' >
            <TabBar.Item selected={route.path == 'myresult'} component={Link}  to="/strategy/myresult" eventKey='myresult' icon="home" title="我的选股" />
           
            <TabBar.Item selected={route.path == 'results'} component={Link}  to="/strategy/results"  icon="info"  title="信息" />

            <TabBar.Item selected={route.path == 'wins'} component={Link}  to="/strategy/wins" icon="gear" title="止盈" />
        </TabBar>
     </Container >
    )
  }

}

/*export const StrategyLayout = ({ children }) =>{
    const { route } = children.props

    return (
     <Container direction="column" >

        <Container  transition='sfr'> 
            {children}
        </Container >

        <TabBar amStyle='primary' >
            <TabBar.Item selected={route.path == 'myresult'} component={Link}  to="/strategy/myresult" eventKey='myresult' icon="home" title="我的选股" />
           
            <TabBar.Item selected={route.path == 'results'} component={Link}  to="/strategy/results"  icon="info"  title="信息" />

            <TabBar.Item selected={route.path == 'wins'} component={Link}  to="/strategy/wins" icon="gear" title="止盈" />
        </TabBar>
     </Container >
    )
} */

StrategyLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default StrategyLayout
