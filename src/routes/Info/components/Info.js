import React , { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Card,
  View,
} from 'amazeui-touch';


class Info extends Component {
  constructor(props) {
      console.log('info Component props' , props)
    super(props);
  }

   onClick(e){
console.log('click', e)
  }

  renderList(list){
    const result = [];
    for (let i = 0; i < list.length; i++) {
      result.push(
        <Card id={list[i]} key={list[i]} onClick={this.onClick}>
          Info大 info Card {list[i]}
        </Card>
      );
    }

    return result
  }

  render() {
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

Info.propTypes = {
  list : PropTypes.array.isRequired,
}

export default Info
