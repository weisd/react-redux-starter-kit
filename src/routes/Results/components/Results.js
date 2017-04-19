import React , { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Card,
  View,
} from 'amazeui-touch';


class Results extends Component {
  constructor(props) {
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
          results Card {list[i]}
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

Results.propTypes = {
  list : PropTypes.array.isRequired,
}

export default Results
