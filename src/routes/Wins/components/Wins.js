import React , { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Card,
  View,
} from 'amazeui-touch';


class Wins extends Component {
  constructor(props) {
    super(props);
  }

  renderList(list){
    const result = [];
    for (let i = 0; i < list.length; i++) {
      result.push(
        <Card>
          Wins Card {list[i]}
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

Wins.propTypes = {
  list : PropTypes.array.isRequired,
}

export default Wins
