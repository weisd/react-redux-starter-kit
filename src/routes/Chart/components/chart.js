import React , { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Card,
  View,
} from 'amazeui-touch';
import CandleStickChart from './CandleStickChart'
import { timeParse } from "d3-time-format";
import { tsv } from "d3-request";
import { csvParse, tsvParse } from  "d3-dsv";

// import './tsv/MSFT_full.tsv'

 var parseDate = timeParse("%Y-%m-%d");

 function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}


class Chart extends Component {
  constructor(props) {
    super(props);
  }

// componentWillMount(){
//  let type = 'svg';
//      let width = 480;
//      let ratio = 30;
//      let discontinuousTimeScaleProvider = {}

//     let parseDate = timeParse("%Y-%m-%d");

     
// let showData = [];

//      tsv("path/to/data.tsv", function(err, data) {
//          console.log(err)
//         data.forEach((d, i) => {
//             d.date = new Date(parseDate(d.date).getTime());
//             d.open = +d.open;
//             d.high = +d.high;
//             d.low = +d.low;
//             d.close = +d.close;
// console.log(d)
//         });

         
      
     
//     })
// }


  render() {
           let type = 'svg';
     let width = 480;
     let ratio = 30;
    

      var promiseMSFTfull = fetch("/routes/Chart/tsv/MSFT_full.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)));
   

    promiseMSFTfull.then((data)=>{
        console.log(data)
    })
      return (
          <div>sdf</div>
            // <CandleStickChart data={promiseMSFTfull} width={width} type={type} ratio={ratio} />
        )
  }
}

// Chart.propTypes = {
//   list : PropTypes.array.isRequired,
// }

export default Chart
