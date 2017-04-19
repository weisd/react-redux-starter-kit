import React , { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Card,
} from 'amazeui-touch';


/*const renderList = (list) => {
  for (var i = 0; i < list.length; i++) {
    return (
      <div>{list[i]}<div>
    )
  }
}*/



class Results extends Component {
  constructor(props) {
    super(props);
  }

  renderList(list){
    const result = [];
    for (let i = 0; i < list.length; i++) {
      result.push(
        <Card key={list[i]}>
         my Card {list[i]}
        </Card>
      );
    }

    return result
  }

  render() {
    const {list} = this.props
    return (
      <Container scrollable>
      
        {this.renderList(list)}
      </Container>
    )
  }
}

Results.propTypes = {
  list : PropTypes.array.isRequired,
}

export default Results
