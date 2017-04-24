import React , { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

import {
  Container,
  Card,
  View,
} from 'amazeui-touch';


class Results extends Component {
  // constructor(props) {
  //   super(props);
  // }

   onClick(param,e){
    console.log('click', e, param)
    browserHistory.push(`/strategy/results/${param}`)
  }

  renderList(list){
    const result = [];
    for (let i = 0; i < list.length; i++) {
      result.push(
        <Card id={list[i]} key={list[i]} onClick={this.onClick.bind(this, list[i])}>
          results Card {list[i]}
        </Card>
      );
    }

    return result
  }

  render() {
    console.log('Results ',this.props)
    const {list} = this.props
    return (
      <View>
      <Container scrollable>
      
        {this.renderList(list)}
      </Container>
      </View>
    )
  }
}

Results.propTypes = {
  list : PropTypes.array.isRequired,
}

export default Results
